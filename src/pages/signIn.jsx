import React from 'react';
import { Button, Row, Col } from "react-bootstrap";
import LoginForms from "../components/loginForms";
import RegisterForms from "../components/registerForms";

const SignIn = () => {
    return (
        <div className="container-sm">
            <Row>
                <Col className="m-3">
                    <h1 className="mb-3">Sign In</h1>
                    <LoginForms/>
                </Col>
                <Col className="m-3">
                    <h1 className="mb-3">Register</h1>
                    <RegisterForms/>
                </Col>
            </Row>
        </div>
    );
};

export default SignIn;