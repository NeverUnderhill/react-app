import React from "react";
import certificateService from "../../common/service/CertificateService";
import Router from "../../../common/RouterPaths";
import "./certificateForm.scss";
import CertificateType from "../../common/types/CertificateType";
import { RouteComponentProps } from "react-router";
import {
  renderButton,
  renderInput,
  renderSelect,
  Column,
  Row,
  renderFilePicker
} from "../../../common/componentUtils";
import SupplierOverviewComponent from "./supplierOverview/SupplierOverviewComponent";
import SupplierType from '../../common/types/SupplierType';

interface ManageCertificateComponentState {
  certificate: CertificateType;
  showSuppliersModal: boolean;
}

export default class CertificateFormComponent<T> extends React.Component<
  RouteComponentProps<T>,
  ManageCertificateComponentState
> {
  state: ManageCertificateComponentState = {
    certificate: Object.assign({}),
    showSuppliersModal: false
  };

  handleChange = (
    name: keyof CertificateType,
    value: CertificateType[keyof CertificateType]
  ) => {
    const { certificate: oldModel } = this.state;
    this.setState({ certificate: { ...oldModel, [name]: value } });
  };

  saveCertificateItemAction = () => {
    if (this.isFormValid()) {
      certificateService
        .saveCertificateItem(this.state.certificate)
        .then(() => {
          this.props.history.push(Router.CERTIFICATES);
          alert("Data saved");
        });
    } else {
      alert("There are some mandatory fields not filled");
    }
  };

  isFormValid = () => {
    if (
      this.state.certificate.supplierId >= 0 &&
      this.state.certificate.certificateTypeId >= 0 &&
      this.state.certificate.validFrom &&
      this.state.certificate.validTo
    ) {
      return true;
    }
    return false;
  };

  renderSearch(label: string, value: string) {
    return (
      <div className="form-element">
        <span>{label}</span>
        <div className="lookup-bar">
          <input value={value} readOnly />
          {renderButton("⌕", "lookup-button", () => {
            this.setState({showSuppliersModal: true});
          })}
          {renderButton("🞬", "lookup-button", () => {})}
        </div>
      </div>
    );
  }

  resetCertificateForm = () => {
    if (this.state.certificate.id) {
      certificateService
        .fetchCertificateById(this.state.certificate.id)
        .then(data =>
          this.setState({
            certificate: data
          })
        );
    } else {
      this.setState({
        certificate: {
          id: "",
          supplierId: -1,
          certificateTypeId: -1,
          validFrom: "",
          validTo: ""
        }
      });
    }
  };

  cancelAction = () => {
    this.setState({showSuppliersModal: false});
  }

  selectAction = (supp: SupplierType) => {
    // this.handleChange("supplierId", supplier.id);
    // this.handleChange("supplier", supplier);
    this.setState( {
      showSuppliersModal: false,
      certificate: {...this.state.certificate, supplierId: Number(supp.id), supplier: supp}});
  }

  stringifySupplier(supplier?: SupplierType) {
    if(supplier === undefined){
      return "";
    }
    else{
      return supplier.name + ", " + supplier.index + ", " + supplier.city;
    }
  } 

  render() {
    const { certificate } = this.state;
    return (
      <div className="form">
        <Row>
          <Column>
            {!this.state.showSuppliersModal || <SupplierOverviewComponent cancelAction={this.cancelAction} selectAction={this.selectAction} />}
            {this.renderSearch("Supplier", this.stringifySupplier(this.state.certificate.supplier))}
            {renderSelect(
              "Certificate Type",
              certificate,
              "certificateTypeId",
              "certificateTypes",
              this.handleChange
            )}
            {renderInput(
              "Valid from",
              certificate,
              "validFrom",
              "date",
              this.handleChange
            )}
            {renderInput(
              "Valid to",
              certificate,
              "validTo",
              "date",
              this.handleChange
            )}
          </Column>
          <Column>{renderFilePicker()}</Column>
          <div className="button-container">
            {renderButton(
              "Save",
              "button save-button",
              this.saveCertificateItemAction
            )}
            {renderButton(
              "Reset",
              "button reset-button",
              this.resetCertificateForm
            )}
          </div>
        </Row>
      </div>
    );
  }
}
