import React from "react";
import Router from "../../../common/Router";
import { Link } from "react-router-dom";
import DropdownButton from "../../common/dropdown/DropdownMenu";
import certificateService from "../../common/service/CertificateService"
import "./Table.css"
import CertificateType from "../../common/types/CertificateType";

interface PropsType {
  editAction: (id: string) => void;
  data: CertificateType[];
}

interface StateType {
  fullData: CertificateType[];
}

export default class CertificatesTable extends React.Component<PropsType> {
  state = {
    certificates: [],
    fullData: [],
  };

  static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (nextProps.data !== prevState.fullData) {
      return { certificates: nextProps.data, fullData: nextProps.data };
    }
    return nextProps;
  }

  buildTableRow(item: CertificateType) {
    return (
      <tr key={item.id} className="body">
        <td>
        <DropdownButton
          handleEditClick={this.props.editAction}
          certId={item.id}
          handleDeleteClick={(certId: string) => certificateService.deleteCertificateItem(certId).then(() => window.location.reload())}
          />
        </td>
        <td>{item.supplier !== undefined ? item.supplier.value : ""}</td>
        <td>{item.certificateType !== undefined ? item.certificateType.value : ""}</td>
        <td>{item.validFrom}</td>
        <td>{item.validTo}</td>
      </tr>
    );
  }

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
            {this.state.certificates.map(item => this.buildTableRow(item))}
          </tbody>
        </table>
      </div>
    );
  }
}