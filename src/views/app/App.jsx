import React from "react";
import Body from "../common/sidebar/Body";
import Header from "../common/header/HeaderComponent"

import "./App.css";



/**
 * Application entry point.
 *
 */
export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/*  FIXME: Adapt current structure to reflect sections from the UI. */}
        <Header />
        <Body />  
      </div>
    );
  }
}