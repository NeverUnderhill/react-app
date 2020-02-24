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

interface ManageCertificateComponentState {
  certificate: CertificateType;
}

export default class CertificateFormComponent<T> extends React.Component<
  RouteComponentProps<T>,
  ManageCertificateComponentState
> {
  state: ManageCertificateComponentState = {
    certificate: Object.assign({})
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
      this.state.certificate.supplierId &&
      this.state.certificate.certificateTypeId &&
      this.state.certificate.validFrom &&
      this.state.certificate.validTo
    ) {
      return true;
    }
    return false;
  };

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

  render() {
    const { certificate } = this.state;
    return (
      <div className="form">
        <Row>
          <Column>
            {renderSelect('Supplier', certificate, 'supplierId', 'suppliers', this.handleChange)}
            {renderSelect('Certificate Type', certificate, 'certificateTypeId', 'certificateTypes', this.handleChange)} 
            {renderInput('Valid from', certificate, 'validFrom', 'date', this.handleChange)}
            {renderInput('Valid to', certificate, 'validTo', 'date', this.handleChange)}
          </Column>
          <Column>
            {renderFilePicker()}
          </Column>
          <div className="button-container">
            {renderButton('Save', 'button save-button', this.saveCertificateItemAction)}
            {renderButton('Reset', 'button reset-button', this.resetCertificateForm)}
          </div>
        </Row>
      </div>
    );
  }
}