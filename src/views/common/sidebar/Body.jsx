import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TablePage from '../tablePage/TablePage';
import CollapsableLink from './CollapsableLink';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import './Body.css';

const columns = ["Supplier", "Certificate type", "Valid from", "Valid to"];

const rows = [
  [
    "DAIMLER AG, 1, Berlin",
    "Permission of printing",
    "21.08.2017",
    "26.08.2017"
  ],
  [
    "ANDEMIS GmbH, 1, Stuttgart",
    "OHSAS 18001",
    "18.08.2017",
    "24.08.2017"
  ],
  [
    "ANDEMIS GmbH, 1, Stuttgart",
    "Permission of printing",
    "04.10.2017",
    "10.10.2017"
  ]
];

const subitems = [
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

// FIXME: Do we need such configuration at all ? Should we use JSX instead of JS...
const routes = [
  {
    path: "/machine-learning/example1",
    main: () => <TablePage
      title="Example 1"
      columns={columns}
      initRows={rows}
    />
  },
  {
    path: "/start",
    main: () => <div className="content">Start</div>
  },
  {
    path: "/machine-learning",
    main: () => <div className="content">Machine learning</div>
  },
  {
    path: "/",
    exact: true,
    main: () => <div className="content">Home</div>
  },
];

export default function SidebarComponent() {
  return (
    //  FIXME: I would expect to have router producer in the App.jsx....just to see that whole application is able to use Router as such....not only some chunks...
    //  FIXME: Which router we're using (Memory, Hash, ...) ? Which should we use and why ?
    <Router>
      {/* FIXME: don't use inline styles... write css classes instead. */}
      <div style={{}}>
        {/* FIXME: Should we make MenuComponent like in Prototype ? */}
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
        <div>
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
      </div>
    </Router>
  );
}