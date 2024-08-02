import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import alferdlogo from "../../images/alfredlogowhite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterForwardToForm,
} from "../../store/PatientRegisterFlow/slice";
import successImg from "../../images/sucessimg.svg";

export default function RegisterInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeForm, flowForm } = useSelector(
    (state) => state.patientRegisterSlice
  );
  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);

  return (
    <div className="al_login_container">
      <form className="wflexLayout">
        <Row className="al_login_section">
          <Col lg="7" sm="6" className="al_left_login h-100">
            <div className="wflexLayout">
              <img src={alferdlogo} alt="logo" />
            </div>
          </Col>
          <Col lg="5" sm="6" className="al_login-right h-100">
            <div className="wflexLayout al_mx-auto">
              <div className="wflex-items-center wflexLayout">
                <div className="al_login-form al_registrationform wflexScroll">
                  <div className="text-center mb-4">
                    <img src={successImg} alt="success" height={85} />
                    <div className="mt-4">Password set</div>
                    <h4 className="text-success">successfully</h4>
                    <p className="mb-0 textLight">
                      Login to your account with new password
                    </p>
                  </div>
                  {/* <div className="text-center mb-4">
                  <img src={approvalsent} alt="approval" height={85} />
                  <div className="mt-4">You have registered</div>
                  <h4 className="text-success">successfully</h4>
                  <p className="mb-0 textLight">
                    Your account is currently under review. You will receive an email notification once it’s approved. Thank you
                  </p>
                </div> */}
                </div>
                <div className="al_login_footer mt-3">
                  <button
                    type="submit"
                    className="al_login_button"
                    onClick={() => {
                      dispatch(
                        getRegisterForwardToForm({
                          activeForm: "/subscription",
                        })
                      ); // Switch back to the first form after submitting the second form
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
