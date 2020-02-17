import React from "react";
import Certificates from "../certificates/Certificates";

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

const routes = [
  {
    path: "/machine-learning/example1",
    main: () => <Certificates
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

 export default routes;