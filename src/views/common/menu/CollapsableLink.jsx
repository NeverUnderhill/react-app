import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

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
                <Link to={this.props.to + this.props.subItems[0][1]} className="menu-item" onClick={this.toggleCollapsed}>
                    {this.props.children}
                    {!this.state.isCollapsed ? <FontAwesomeIcon icon={faAngleDown} className="arrow"/> : <FontAwesomeIcon icon={faAngleRight} className="arrow"/> }
                </Link>
                {!this.state.isCollapsed && this.props.subItems.map((subitem, index) => (
                    <NavLink to={this.props.to + subitem[1]} key={index} className="submenu-item">
                        {subitem[0]}
                    </NavLink>
                    ))
                }
            </div>
        );
    }
}