import React, { Component, Fragment } from "react";
import certificateService from "../../common/service/CertificateService";
import renderTable from "./Table";
import { RouteComponentProps } from "react-router";
import CertificateType from "../../common/types/CertificateType";
import { renderDropdownButton } from "../../../common/componentUtils";
import { Link } from "react-router-dom";
import Router from "../../../common/RouterPaths";

interface CertificateOverviewComponentProps extends RouteComponentProps {}

interface CertificateOverviewComponentState {
  certificates: CertificateType[];
}

/*
 * Converts date string from yyyy-mm-dd to dd.mm.yyyy format
 */
function localizeDate(date: string) {
  try {
    return date
      .split("-")
      .reverse()
      .join(".");
  } catch (error) {
    return "";
  }
}

/**
 * Overview of certificate data.
 */
export default class CertificateOverviewComponent extends Component<
  CertificateOverviewComponentProps,
  CertificateOverviewComponentState
> {
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

  renderRow(item: CertificateType) {
    return (
      <tr key={item.id} className="body">
        <td>{renderDropdownButton(item.id)}</td>
        <td>
          {item.supplier
            ? `${item.supplier.name}, ${item.supplier.index}, ${item.supplier.city}`
            : ""}
        </td>
        <td>{item.certificateType ? item.certificateType.value : ""}</td>
        <td>{localizeDate(item.validFrom)}</td>
        <td>{localizeDate(item.validTo)}</td>
      </tr>
    );
  }

  render() {
    return (
      <Fragment>
        <div style={{ margin: "20px" }}>
          <Link to={Router.CERTIFICATES_MANAGE_NEW} className="new-cert-button">
            New certificate
          </Link>
        {renderTable(
          this.state.certificates,
          ["", "Supplier", "Certificate Type", "Valid from", "Valid to"],
          this.renderRow
        )}
        </div>
      </Fragment>
    );
  }
}
