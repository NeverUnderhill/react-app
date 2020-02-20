import React from "react";
import certificateService from "../../common/service/CertificateService";
import CertificatesTable from "./CertificatesTable";
import { History, LocationState } from "history";
import Router from "../../../common/Router";
import CertificateType from "../../common/types/CertificateType";

interface PropsType {
  history: History<LocationState>;
}

/**
 * Overview of certificate data.
 */
export default class CertificateOverviewComponent extends React.Component<PropsType> {
  state = {
    certificates: []
  };

  constructor(props: PropsType) {
    super(props);
    certificateService
      .fetchCertificates()
      .then(result => this.updateStateAction(result));
  }

  updateStateAction = (data: CertificateType[]) => {
    this.setState({ certificates: data });
  };

  // FIXME: There is no need to make this action here...since #{@link EquipmentTable} is strict to the equipment itself...
  editCertificatesAction = (id: string) => {
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