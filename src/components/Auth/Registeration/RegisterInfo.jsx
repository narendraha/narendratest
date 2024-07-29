import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";
import { getRole, pageTitle } from "../../../_mock/helperIndex";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import { getFlowForm } from "../../../store/PatientRegisterFlow/slice";

export default function RegisterInfo() {
  pageTitle("Register")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormSubmitHandle = (e, setFieldValue) => {
    setFieldValue('accountType', e)
    dispatch(getFlowForm({ flowForm: e }));
    let navigationWidnow = `/${e === getRole.PATIENT ? 'patient' : 'doctor'}/registration`
    navigate(navigationWidnow)
  }

  return (
    <div className="al_login_container">
      <Formik
        enableReinitialize
        initialValues={{
          accountType: "",
        }}
        validationSchema={Yup.object().shape({
          accountType: Yup.string().required("Account type is required"),
        })}
        onSubmit={(values) => {
          console.log("values: ", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="wflexLayout">
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
                <div className="wflex-items-center wflexLayout">
                  <div className=" mx-auto wflexLayout wflex-items-center">
                    <h5 className="mb-2 w-80">What would you like to register as</h5>
                    <label className="mb-3">Select one option</label>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <div
                        className={`al_accounttype mb-3 ${values.accountType === getRole.PATIENT ? "selected" : ""}`}
                        onClick={() => initialFormSubmitHandle(getRole.PATIENT, setFieldValue)}
                      >
                        <h6 className="mb-0 fw-medium">I am a</h6>
                        <h5 className="mb-0 lh-normal pe-4" style={{ lineHeight: 1.25 }}>
                          Patient
                        </h5>
                        <small className="text-muted mb-0 me-4 pe-5 mt-1">Your health journey starts here.</small>
                      </div>
                      <div
                        className={`al_accounttype ${values.accountType === "Physician" ? "selected" : ""}`}
                        onClick={() => initialFormSubmitHandle(getRole.PHYSICIAN, setFieldValue)}
                      >
                        <h6 className="mb-0 fw-medium">I am a</h6>
                        <h5 className="mb-0 pe-4" style={{ lineHeight: 1.25 }}>
                          Healthcare Provider
                        </h5>
                        <small className="text-muted mb-0 me-4 pe-5 mt-1">Joining hands for well-being.</small>
                      </div>
                    </div>
                    <ErrorMessage
                      name="accountType"
                      component="div"
                      className="text-danger"
                    />
                    <div className="mt-3 text-medium">
                      Already have an account?{" "}
                      <Link to="/signin" className="al_text_link cs_medium">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}
