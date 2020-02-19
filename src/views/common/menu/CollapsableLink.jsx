import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import Router from '../../app/Router';

export default class CollapsableLink extends React.Component {
  state = {
    isCollapsed: false,
    sublist: null,
  }

  toggleCollapsed = e => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }));
  }

  render() {
    return (
      <div>
        <Link className="menu-item" onClick={this.toggleCollapsed}>
          {this.props.children}
          {!this.state.isCollapsed ? <FontAwesomeIcon icon={faAngleDown} className="arrow" /> : <FontAwesomeIcon icon={faAngleRight} className="arrow" />}
        </Link>
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
            {/* <NavLink className="submenu-item" exact to={Router.CERTIFICATES_MANAGE} > */}
            {/* </NavLink> */}
          </Fragment>
        }
      </div>
    );
  }
}