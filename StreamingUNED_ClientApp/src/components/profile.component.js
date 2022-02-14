import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    render() {
        const { currentUser } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.emailId}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.token.substring(0, 20)} ...{" "}
                    {currentUser.token.substr(currentUser.token.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.userId}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.emailId}
                </p>
                <p>
                    <strong>Rol:</strong>{" "}
                    {currentUser.rolId}
                </p>
            </div>
        );
    }
}