import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Router from '../../../common/Router';

interface StateType {
  isCollapsed: boolean;
}

export default class CollapsableLink extends React.Component<{}, StateType> {
  state = {
    isCollapsed: false,
  }

  toggleCollapsed = () => {
    this.setState((prevState: StateType) => ({
      isCollapsed: !prevState.isCollapsed
    }));
  }

  render() {
    return (
      <div>
        <div className="menu-item" onClick={this.toggleCollapsed}>
          {this.props.children}
          {!this.state.isCollapsed ? <FontAwesomeIcon icon={faAngleDown} className="arrow" /> : <FontAwesomeIcon icon={faAngleRight} className="arrow" />}
        </div>
        {!this.state.isCollapsed && 
          <Fragment >
            <NavLink className="submenu-item" exact to={Router.CERTIFICATES} >
              Example 1
            </NavLink>
            <NavLink className="submenu-item" exact to="example2" >
              Example 2
            </NavLink>
            <NavLink className="submenu-item" exact to="example3" >
              Example 3
            </NavLink>
          </Fragment>
        }
      </div>
    );
  }
}