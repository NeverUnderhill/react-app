import React from "react";
import Header from "../common/header/HeaderComponent";
import ManageCertificateComponent from "../certificates/manage/ManageCertificateComponent";
import CertificatesOverviewComponent from "../certificates/overview/CertificateOverviewComponent";
import CertificateFormComponent from "../certificates/manage/CertificateFormComponent";
import Menu from "../common/menu/Menu";
import StartPage from "../start/StartPage";
import Router from "../../common/RouterPaths"
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import "./App.scss";
import SupplierOverviewComponent from '../certificates/manage/supplierOverview/SupplierOverviewComponent';

/**
 * Application entry point.
 */
export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <Switch>
              <Route path={Router.START} exact component={StartPage} />
              <Route path={Router.CERTIFICATES_MANAGE_NEW} component={CertificateFormComponent} />
              <Route path={Router.SUPPLIERS} component={SupplierOverviewComponent} />
              <Route path={Router.CERTIFICATES_MANAGE_EDIT} component={ManageCertificateComponent} />
              <Route path={Router.CERTIFICATES} component={CertificatesOverviewComponent} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}