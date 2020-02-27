import React, { ReactNode, Fragment } from "react";
import "./Table.scss";

function renderHead(columns: string[]) {
  return (
    <Fragment>
      {columns.map((name) => <th>{name}</th>)}
    </Fragment>
  );
}

function renderBody<T>(data: T[], renderRow: (item: T) => JSX.Element) {
  const nodes: ReactNode[] = [];
  data.forEach(item => {
    nodes.push(renderRow(item));
  });
  return nodes;
}

export default function renderTable<T>(data: T[], columns: string[], renderRow: (item: T) => JSX.Element) {
    return (
      <div className="table-container">
        
        <table className="table">
          <thead>
            <tr className="table-header">
              {renderHead(columns)}
            </tr>
          </thead>
          <tbody className="table-body">{renderBody(data, renderRow)}</tbody>
        </table>
      </div>
    );
}