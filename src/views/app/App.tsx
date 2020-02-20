import React from "react";
import Header from "../common/header/HeaderComponent";
import ManageCertificateComponent from "../certificates/manage/ManageCertificateComponent";
import CertificatesOverviewComponent from "../certificates/overview/CertificateOverviewComponent"
import Menu from "../common/menu/Menu";
import StartPage from "../start/StartPage";
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";

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
              <Route
                path="/"
                exact
                component={StartPage} />
              <Route
                path={"/certificates/:id"}
                component={ManageCertificateComponent}
              />
              <Route
                path={"/certificates"}
                component={CertificatesOverviewComponent}
              />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}