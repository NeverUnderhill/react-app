import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css'

interface StateType {
    open: boolean;
}

interface PropsType {
    certId: string;
    handleEditClick: (id: string) => void;
    handleDeleteClick: (certId: string) => void;
}

export default class DropdownButton extends React.Component<PropsType, StateType> {
    state = {
        open: false,
    };

    container = React.createRef<HTMLDivElement>();

    handleButtonClick = () => {
        this.setState((state: StateType) => {
            return {
                open: !state.open,
            };
        });
    }

    handleClickOutside = (e: Event) => {
        if (this.container.current && !this.container.current.contains(e.target as Node)) {
            this.setState({
                open: false,
            });
        }
    }

    handleEditClick = () => {
        this.props.handleEditClick(this.props.certId);
    }

    handleDeleteClick = () => {
        this.setState({
            open: false,
        });
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.props.handleDeleteClick(this.props.certId);
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