import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css'

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
        if (this.container.current && !this.container.current.contains(e.target)) {
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
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.handleDeleteClick(this.props.index);
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
                    <FontAwesomeIcon icon={faCog} />
                </button>
                {this.state.open &&
                    <div className="dropdown">
                        <ul>
                            <li onClick={this.handleEditClick}>Edit</li>
                            <li onClick={this.handleDeleteClick}>Delete</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}