import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CollapsableLink from './CollapsableLink';
import {
  NavLink,
} from "react-router-dom";

import './Menu.css';

export const subitems = [
  [
    "Example 1",
    "/example1"
  ],
  [
    "Example 2",
    "/example2"
  ],
  [
    "Example 3",
    "/example3"
  ],
];

export default function Menu() {
  return (
    //  FIXME: Which router we're using (Memory, Hash, ...) ? Which should we use and why ?
      <div>
        <div className="sidebar">
          <NavLink to="/start" key="/start" className="menu-item">
            <FontAwesomeIcon icon={faHome} className="sticker" />
            Start
          </NavLink>
          <CollapsableLink to="/machine-learning" key="/machine-learning" subItems={subitems}>
            <FontAwesomeIcon icon={faBars} className="sticker" />
            Machine learning
          </CollapsableLink>
        </div>
      </div>
  );
}