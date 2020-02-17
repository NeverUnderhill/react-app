import React, { Fragment } from 'react';
import TableComponent from '../common/table/TableComponent';
import CertForm from './certificateForm/CertificateForm';
import { Route, Switch } from 'react-router-dom';
import "./Certificates.css";

export default class Certificates extends React.Component {
    state = {
        currentRowIndex: 0,
        rows: this.props.initRows
    }

    // Converts date from yyyy-mm-dd to dd.mm.yyyy format
    localizeDate = (date) => {
        try {
            return date.split('-').reverse().join('.');
        } catch (error) {
            return "";
        }
    }

    // Inverse of the above function
    delocalizeDate = (date) => {
        try {
            return date.split('.').reverse().join('-');
        } catch (error) {
            return "";
        }
    }

    addRow = (supplier, certType, validFrom, validTo) => {
        this.setState({
            rows: [...this.state.rows, [supplier, certType, validFrom, validTo]],
        });
    }

    editRow = (supplier, certType, validFrom, validTo) => {
        this.setState({
            rows: [
                ...this.state.rows.slice(0, this.state.currentRowIndex),
                [supplier, certType, this.localizeDate(validFrom), this.localizeDate(validTo)],
                ...this.state.rows.slice(this.state.currentRowIndex + 1)
            ],
        })
    }

    handleEditClick = (index) => {
        this.setState({
            currentRowIndex: index,
        })
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/machine-learning/example1/addRow">
                        <CertForm handleClick={this.addRow} initRowState={[]} />
                    </Route>
                    <Route path="/machine-learning/example1/editRow">
                        <CertForm
                            handleClick={this.editRow}
                            initRowState={[
                                this.state.rows[this.state.currentRowIndex][0],
                                this.state.rows[this.state.currentRowIndex][1],
                                this.delocalizeDate(this.state.rows[this.state.currentRowIndex][2]),
                                this.delocalizeDate(this.state.rows[this.state.currentRowIndex][3]),
                            ]}
                        />
                    </Route>
                    <Route path="/machine-learning/example1">
                        <TableComponent
                            columns={this.props.columns}
                            rows={this.state.rows}
                            handleEditClick={this.handleEditClick}
                        />
                    </Route>
                </Switch>
            </Fragment>
        );
    }
};