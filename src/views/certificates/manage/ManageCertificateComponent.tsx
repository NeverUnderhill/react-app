import React from "react";
import certificateService from "../../common/service/CertificateService"
import Select from "../../common/select/Select";
import Router from "../../../common/Router";
import { History, LocationState } from "history";
import "./certificateForm.css";
import CertificateType from "../../common/types/CertificateType";

interface PropsType {
  history: History<LocationState>;
}

interface StateType {
  certificate: CertificateType;
}

export default class Certificate extends React.Component<PropsType, StateType> {
  state: StateType = {
    certificate: {
      id: "",
      supplierId: 0,
      certificateTypeId: 0,
      validFrom: "",
      validTo: "",
    }
  };

  constructor(props: PropsType) {
    super(props);
    let eqId = window.location.hash.substring(15);
    if (eqId) {
      certificateService
        .fetchCertificateById(eqId)
        .then(data => this.setState({ certificate: data }));
    }
  }

  saveCertificateItemAction = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.isFormValid()) {
      event.preventDefault();
      certificateService.saveCertificateItem(this.state.certificate).then(() => {
        this.props.history.push(Router.CERTIFICATES);
        alert("Data saved");
      })
    } else {
      alert("There are some mandatory fields not filled");
    }
  }

  resetCertificateForm = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    if(this.state.certificate.id) {
      certificateService.fetchCertificateById(this.state.certificate.id).then((data) => this.setState({
        certificate: data,
      }))
    } else {
      this.setState({
        certificate: {
          id: "",
          supplierId: 0,
          certificateTypeId: 0,
          validFrom: "",
          validTo: "",
        }
      });
    }
  }

 /*
  * Converts date string from yyyy-mm-dd to dd.mm.yyyy format
  */
  localizeDate = (date: string) => {
    try {
      return date.split('-').reverse().join('.');
    } catch (error) {
      return "";
    }
  }

 /*
  * Converts date string from dd.mm.yyyy to yyyy-mm-dd format
  */
  delocalizeDate = (date: string) => {
    try {
      return date.split('.').reverse().join('-');
    } catch (error) {
      return "";
    }
  }

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

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    this.setState({
        certificate: {
          ...this.state.certificate,
          [event.target.name]: event.target.value
        }
    });
  };

  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({
        certificate: {
          ...this.state.certificate,
          [event.target.name]: this.localizeDate(event.target.value)
        }
    });
  };


  render() {
    return (
      <div className="form">
          <div className="row">
            <div className="column">
              <label>Supplier</label>
              <Select
                serviceName="suppliers"
                name="supplierId"
                value={this.state.certificate.supplierId}
                placeholder="Select the supplier"
                onChange={this.handleChange}
              />
              <br></br>
              <label>Certificate type</label>
              <Select
                serviceName="certificateTypes"
                name="certificateTypeId"
                value={this.state.certificate.certificateTypeId}
                placeholder="Select your option"
                onChange={this.handleChange}
              />
              <br></br>
              <label>Valid from</label>
              <input
                type="date"
                name="validFrom"
                value={this.delocalizeDate(this.state.certificate.validFrom)}
                onChange={this.handleDateChange}
                className="input"
              />
              <br></br>
              <label>Valid to</label>
              <input
                type="date"
                name="validTo"
                value={this.delocalizeDate(this.state.certificate.validTo)}
                onChange={this.handleDateChange}
                className="input"
              />
            </div>
            <div className="column">
              <input type="file" id="file" className="inputfile"></input>
              <label className="button upload-button">Upload</label>
              <div className="pdfframe"></div>
            </div>
            <div className="button-container">
              <input type="button" value="Save" onClick={this.saveCertificateItemAction} className="button save-button"/>
              <input type="button" value="Reset" onClick={this.resetCertificateForm} className="button reset-button"/>
            </div>
          </div>
      </div>
    );
  }
}
