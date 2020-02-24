import React from "react";
import logo from "./logo.png";

import "./Header.scss";

/**
 * Holder component of all header related elements.
 */
export default class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="pageHeader">
        <div>
          <img src={logo} className="logo" alt="" />
        </div>
        <br />
      </div>
    );
  }
}
