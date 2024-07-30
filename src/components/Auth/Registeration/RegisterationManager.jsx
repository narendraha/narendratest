import React from "react";
import { Col, Form, Row } from "reactstrap";
import { pageTitle } from "../../../_mock/helperIndex";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";

export default function RegistrationManager() {
    pageTitle("Register")

    return (
        <div className="al_login_container">
            <div className="wflexLayout">
                <Row className="al_login_section">
                    <Col lg="7" sm="6" className="al_left_login h-100">
                        <img
                            src={alferdlogo}
                            className="login_logodesktop"
                            alt="logo"
                        />
                        <img
                            src={alferdlogomobile}
                            className="login_logomobile"
                            alt="logo_mobile"
                        />
                    </Col>

                    <Col lg="5" sm="6" className="al_login-right h-100">
                        {/* patient reg */}
                        {/* doc reg */}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
