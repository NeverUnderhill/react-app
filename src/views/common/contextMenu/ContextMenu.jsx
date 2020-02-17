import React from 'react';
import {NavLink} from 'react-router-dom';
import './ContextMenu.css'

export default class DropdownButton extends React.Component {
    state = {
        open: false,
    };

    container = React.createRef();

    handleButtonClick = e => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    }

    handleClickOutside = e => {
        if(this.container.current && !this.container.current.contains(e.target)){
            this.setState({
                open: false,
            });
        }
    }

    handleEditClick = () => {
        this.props.handleEditClick(this.props.index);
    }

    handleDeleteClick = () => {
        this.setState({
            open: false,
        });
        if (window.confirm('Are you sure you wish to delete this item?')){
            alert("deleted");
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        return (
            <div ref={this.container}>
                <button className="cog-btn" onClick={this.handleButtonClick}>
                    {
                        this.props.children
                    }
                </button>
                {this.state.open &&
                    <div className="dropdown">
                        <ul>
                            <li><NavLink to="/machine-learning/example1/editRow" onClick={this.handleEditClick} className="li">Edit</NavLink></li> 
                            <li onClick={this.handleDeleteClick}>Delete</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}