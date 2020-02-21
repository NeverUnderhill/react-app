import React, { Component } from "react";
import certificateService from "../../common/service/CertificateService";
import CertificatesTable from "./CertificatesTable";
import { RouteComponentProps } from "react-router";
import CertificateType from "../../common/types/CertificateType";

interface CertificateOverviewComponentProps extends RouteComponentProps{
}

interface CertificateOverviewComponentState {
  certificates: CertificateType[];
}

/**
 * Overview of certificate data.
 */
export default class CertificateOverviewComponent extends Component<CertificateOverviewComponentProps, CertificateOverviewComponentState> {
  state = {
    certificates: []
  };

  constructor(props: CertificateOverviewComponentProps) {
    super(props);
    certificateService
      .fetchCertificates()
      .then(result => this.updateStateAction(result));
  }

  updateStateAction = (data: CertificateType[]) => {
    this.setState({ certificates: data });
  };

  render() {
    return (
      <CertificatesTable
        data={this.state.certificates}
      />
    );
  }
}