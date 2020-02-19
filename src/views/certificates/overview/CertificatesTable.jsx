import React from "react";
import Router from "../../app/Router";
import { Link } from "react-router-dom";
import DropdownButton from "../../common/dropdown/DropdownMenu";
import certificateService from "../../common/service/certificateService"
import { withRouter } from 'react-router-dom';
import "./Table.css"

class CertificatesTable extends React.Component {
  state = {
    certificates: [],
  };

  editCertificateAction = id => {
    this.props.history.push(Router.CERTIFICATES + id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.fullData) {
      return { certificates: nextProps.data, fullData: nextProps.data };
    }

    return nextProps;
  }

  buildTableRow(item) {
    return (
      <tr key={item.id} className="body">
        <td>
        <DropdownButton
          handleEditClick={() => this.editCertificateAction(item.id)} certId={item.id}
          handleDeleteClick={() => certificateService.deleteCertificateItem({id: item.id}).then(() => window.location.reload())}
          />
        </td>
        <td>{item.supplier}</td>
        <td>{item.certificateType}</td>
        <td>{item.validFrom}</td>
        <td>{item.validTo}</td>
      </tr>
    );
  }

  render() {
    return (
      <div className="table-container">
        <div style={{ marginBottom: "10px" }}>
          <Link to={Router.CERTIFICATES_MANAGE} className="new-cert-button">New certificate</Link>
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

export default withRouter(CertificatesTable);