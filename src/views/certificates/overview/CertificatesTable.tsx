import React, { Component, ReactNode } from "react";
import { RouteComponentProps, withRouter } from 'react-router';
import Router from "../../../common/RouterPaths";
import { Link } from "react-router-dom";
import CertificateType from "../../common/types/CertificateType";
import { renderDropdownButton } from '../../../common/componentUtils';
import "./Table.css"

interface CertificateTableProps extends RouteComponentProps {
  data: CertificateType[];
}

interface CertificatesTableState {
  fullData: CertificateType[];
}

class CertificatesTable extends Component<CertificateTableProps, CertificatesTableState> {
  render() {
    return (
      <div className="table-container">
        <div style={{ marginBottom: "10px" }}>
          <Link to={Router.CERTIFICATES_MANAGE_NEW} className="new-cert-button">New certificate</Link>
        </div>
        <table className="table">
          <thead>
            <tr className="header">
              <th></th>
              <th>Supplier</th>
              <th>Certificate Type</th>
              <th>Valid from</th>
              <th>Valid to</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    );
  }

  private renderBody() {
    const {data} = this.props;
    const nodes: ReactNode[] = [];
    data.forEach(certificate => {
      nodes.push(this.renderRow(certificate));
    });
    return nodes;
  }

  /*
   * Converts date string from yyyy-mm-dd to dd.mm.yyyy format
   */
  localizeDate = (date: string) => {
    try {
      return date
        .split("-")
        .reverse()
        .join(".");
    } catch (error) {
      return "";
    }
  };

  renderRow(item: CertificateType) {
    return (
      <tr key={item.id} className="body">
        <td>{renderDropdownButton(item.id)}</td>
        <td>{item.supplier ? item.supplier.value : ""}</td>
        <td>{item.certificateType ? item.certificateType.value : ""}</td>
        <td>{this.localizeDate(item.validFrom)}</td>
        <td>{this.localizeDate(item.validTo)}</td>
      </tr>
    );
  }
}

export default withRouter(CertificatesTable);