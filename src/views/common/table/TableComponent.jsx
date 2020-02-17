import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from '../dropdown/DropdownMenu'
import { NavLink } from 'react-router-dom';
import React from "react";
import "./Table.css";

export default class DataTable extends React.Component {
  render() {
    return (
      <div className="table-container">
        <div className="table-heading">
          <h2>{this.props.title}</h2>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <NavLink to="/machine-learning/example1/addRow" className="new-cert-button">New certificate</NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="header">
              <React.Fragment>
                <th></th>
                {this.props.columns.map(function (th, index) {
                  return <th key={index}>{th}</th>;
                })}
              </React.Fragment>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>
              {this.props.rows.map((row, index) => {
                return <tr className="body" key={index}>
                  <td>
                    <DropdownButton index={index} handleEditClick={this.props.handleEditClick} handleDeleteClick={this.props.handleDeleteClick}>
                      <FontAwesomeIcon icon={faCog} />
                    </DropdownButton>
                  </td>
                  {row.map((td, index) => <td key={index}>{td}</td>)}
                </tr>;
              })}
            </React.Fragment>
          </tbody>
        </table>
      </div>
    );
  }
}