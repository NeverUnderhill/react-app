import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CollapsableLink from './CollapsableLink';
import {
  NavLink,
} from "react-router-dom";
import Router from '../../../common/RouterPaths';
import './Menu.scss';

export default function Menu() {

  // TODO:
  /*
    const bla = (
        <div>
          <MenuItem title="Home"/>
          <MenuItem title="Machine learning">
            <MenuItem title="E1" to="" icon=""/>
            <MenuItem title="E2"/>
            <MenuItem title="E3"/>
          </MenuItemtitle>
        </div>
    );
    return bla;
  */

  return (
      <div>
        <div className="sidebar">
          <NavLink className="menu-item" exact to={Router.START} >
            <FontAwesomeIcon icon={faHome} className="sticker" />
            Start
          </NavLink>
          <CollapsableLink>
            <FontAwesomeIcon icon={faBars} className="sticker" />
            Machine learning
          </CollapsableLink>
        </div>
      </div>
  );
}