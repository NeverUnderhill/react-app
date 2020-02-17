import React from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import { createBrowserHistory } from 'history';

import "./certificateForm.css";

const history = createBrowserHistory();

export default class Certificate extends React.Component {
  state = {
    supplier: this.props.initRowState[0],
    certType: this.props.initRowState[1],
    validFrom: this.props.initRowState[2],
    validTo: this.props.initRowState[3],
    certTypes: ["Permission of printing", "OHSAS 18001"]
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.handleClick(
      this.state.supplier,
      this.state.certType,
      this.state.validFrom,
      this.state.validTo
    );
    history.goBack();
  }

  resetForm = () => {
    this.setState({
      supplier: this.props.initRowState[0],
      certType: this.props.initRowState[1],
      validFrom: this.props.initRowState[2],
      validTo: this.props.initRowState[3],
    })
  }

  // pretvara datum iz formata yyyy-mm-dd u dd.mm.yyyy
  localizeDate = (date) => {
    try {
      return date.split('-').reverse().join('.');
    } catch (error) {
      return "";
    }
  }

  delocalizeDate = (date) => {
    try {
      return date.split('.').reverse().join('-');
    } catch (error) {
      return "";
    }
  }

  handleSupplier = e => {
    let value = e.target.value;
    this.setState({ supplier: value });
  }

  handleCertType = e => {
    let value = e.target.value;
    this.setState({ certType: value });
  }

  handleValidFrom = e => {
    let value = this.localizeDate(e.target.value);
    this.setState({ validFrom: value });
  }

  handleValidTo = e => {
    let value = this.localizeDate(e.target.value);
    this.setState({ validTo: value });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleFormSubmit}>
          <div className="row">
            <div className="column">
              <Input
                type="text"
                placeholder=""
                name="supplier"
                title="Supplier"
                value={this.state.supplier}
                handleChange={this.handleSupplier}
                onChange={this.handleSupplier}
              />
              <br></br>
              <Select
                title="Certificate type"
                name="certType"
                options={this.state.certTypes}
                value={this.state.certType}
                placeholder="Select your option"
                handleChange={this.handleCertType}
              />
              <br></br>
              <Input
                type="date"
                name="validFrom"
                title="Valid From"
                value={this.delocalizeDate(this.state.validFrom)}
                handleChange={this.handleValidFrom}>
              </Input>
              <br></br>
              <Input
                type="date"
                name="validTo"
                title="Valid To"
                value={this.delocalizeDate(this.state.validTo)}
                handleChange={this.handleValidTo}>
              </Input>
            </div>
            <div className="column">
              <input type="file" id="file" className="inputfile"></input>
              <label className="button upload-button">Upload</label>
              <div className="pdfframe"></div>
            </div>
            <div className="button-container">
              <button className="button save-button">
                Save
              </button>
              <button type="reset" className="button reset-button" onClick={this.resetForm}>
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
