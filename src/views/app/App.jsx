import React from "react";
import Header from "../common/header/HeaderComponent";
import routes from "./Routes";
import Menu from "../common/menu/Menu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "./App.css";

/**
 * Application entry point.
 *
 */
export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Header />
                    <div className="app-body">
                        <Menu />
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}