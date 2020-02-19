import React from "react";
import certificateService from "../../common/service/certificateService"
import Select from "../../common/select/Select";
import Router from "../../app/Router";
import "./certificateForm.css";

export default class Certificate extends React.Component {
  state = {
    certificate: {
      id: "",
      supplier: "",
      certificateType: "",
      validFrom: "",
      validTo: "",
    }
  };

  constructor(props) {
    super(props);
    let eqId = window.location.hash.substring(15);
    if (eqId) {
      certificateService
        .fetchCertificateById(eqId)
        .then(data => this.setState({ certificate: data }));
    }
  }

  saveCertificateItemAction = (e) => {
    if (this.isFormValid()) {
      e.preventDefault();
      certificateService.saveCertificateItem(this.state.certificate).then(() => {
        this.props.history.push(Router.CERTIFICATES);
        alert("Data saved");
      })
    } else {
      alert("There are some mandatory fields not filled");
    }
  }

  resetCertificateForm = (e) => {
    e.preventDefault();
    if(this.state.certificate.id) {
      certificateService.fetchCertificateById(this.state.certificate.id).then((data) => this.setState({
        certificate: data,
      }))
    } else {
      this.setState({
        certificate: {
          id: "",
          supplier: "",
          certificateType: "",
          validFrom: "",
          validTo: "",
        }
      });
    }
  }

 /*
  * Converts date string from yyyy-mm-dd to dd.mm.yyyy format
  */
  localizeDate = (date) => {
    try {
      return date.split('-').reverse().join('.');
    } catch (error) {
      return "";
    }
  }

 /*
  * Converts date string from dd.mm.yyyy to yyyy-mm-dd format
  */
  delocalizeDate = (date) => {
    try {
      return date.split('.').reverse().join('-');
    } catch (error) {
      return "";
    }
  }


  isFormValid = () => {
    if (
      this.state.certificate.supplier &&
      this.state.certificate.certificateType &&
      this.state.certificate.validFrom &&
      this.state.certificate.validTo
    ) {
      return true;
    }
    return false;
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
        certificate: {
          ...this.state.certificate,
          [event.target.name]: event.target.value
        }
    });
  };

  handleDateChange = event => {
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
                title="Supplier"
                name="supplier"
                value={this.state.certificate.supplier}
                placeholder="Select the supplier"
                handleChange={this.handleChange}
              />
              <br></br>
              <label>Certificate type</label>
              <Select
                title="Certificate type"
                name="certificateType"
                value={this.state.certificate.certType}
                placeholder="Select your option"
                handleChange={this.handleChange}
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
