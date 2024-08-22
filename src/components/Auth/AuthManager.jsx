import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Col, Row } from "reactstrap";
import { getAuthRoute, getAuthRouteNames, pageTitle } from "../../_mock/helperIndex";
import alferdlogomobile from "../../images/alfredlogo.svg";
import alferdlogo from "../../images/alfredlogowhite.svg";
import ForgotPassword from "./ForgotPassword";
import RegistrationManager from "./Registeration/RegisterationManager";
import { Signin } from "./Signin/SignIn";

const AuthManager = () => {
  let currentLocationPathName = useLocation()?.pathname;

  const { authRedirectionRoute } = useSelector((state) => (state?.sessionStoreSlice))


  console.log("authRedirectionRouteauthRedirectionRoute", authRedirectionRoute)
  return (
    <React.Fragment>
      <div className="al_login_container">
        <div className="wflexLayout">
          <Row className="al_login_section">
            <Col lg="7" sm="6" className="al_left_login h-100">
              <div className="wflexLayout">
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
              </div>
            </Col>
            <Col lg="5" sm="6" className="al_login-right h-100">
              {/* doctor and patient registration flow */}
              {/* {authRedirectionRoute === getAuthRoute.REGISTER && <RegistrationManager />} */}
              {currentLocationPathName === getAuthRouteNames.REGISTER && <RegistrationManager />}
              {/* signin */}
              {/* {authRedirectionRoute === getAuthRoute.SIGNIN && <Signin />} */}
              {currentLocationPathName === getAuthRouteNames.SIGNIN && <Signin />}
              {/* forgot password */}
              {/* {authRedirectionRoute === getAuthRoute.FORGOTPASSWORDFROM && <ForgotPassword />} */}
              {currentLocationPathName === getAuthRouteNames.FORGOTPASSWORDFROM && <ForgotPassword />}
            </Col>
          </Row>
        </div >
      </div>
    </React.Fragment>
  );
}

export default AuthManager
