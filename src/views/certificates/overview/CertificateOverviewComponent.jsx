import React from "react";
import certificateService from "../../common/service/certificateService";
import CertificatesTable from "./CertificatesTable";

import Router from "../../app/Router";

/**
 * Overview of certificate data.
 */
export default class CertificateOverviewComponent extends React.Component {
  state = {
    certificates: []
  };

  constructor(props) {
    super(props);
    certificateService
      .fetchCertificates()
      .then(result => this.updateStateAction(result));
  }

  updateStateAction = data => {
    this.setState({ certificates: data });
  };

  // FIXME: There is no need to make this action here...since #{@link EquipmentTable} is strict to the equipment itself...
  editCertificatesAction = id => {
    this.props.history.push(Router.CERTIFICATES + id);
  };

  render() {
    return (
      <CertificatesTable
        editAction={this.editCertificatesAction}
        data={this.state.certificates}
      />
    );
  }
}