import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import certificateService from "../../common/service/CertificateService"
import Router from "../../../common/RouterPaths";
import { RouteComponentProps, withRouter } from 'react-router';
import './DropdownMenu.scss'

interface DropdownButtonState {
    open: boolean;
}

interface DropdownButtonProps extends RouteComponentProps{
    id: string;
}

class DropdownButton extends React.Component<DropdownButtonProps, DropdownButtonState> {
    state = {
        open: false,
    };

    container = React.createRef<HTMLDivElement>();

    handleButtonClick = () => {
        this.setState((state: DropdownButtonState) => {
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

    deleteCertificateAction = () => {
        this.setState({
            open: false,
        });
        if (window.confirm('Are you sure you wish to delete this item?')) {
            certificateService.deleteCertificateItem(this.props.id).then(() => window.location.reload())
        }
    }

    editCertificateAction = () => {
        this.props.history.push(Router.CERTIFICATES + this.props.id);
    };

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
                            <li onClick={this.editCertificateAction}>Edit</li>
                            <li onClick={this.deleteCertificateAction}>Delete</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(DropdownButton);