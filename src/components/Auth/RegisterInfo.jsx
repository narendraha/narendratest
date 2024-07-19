import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../InnerApp/LoadingComponent";
import alferdlogomobile from "../../images/alfredlogo.svg";
import alferdlogo from "../../images/alfredlogowhite.svg";
import { getFlowForm } from "../../store/PatientRegisterFlow/slice";
import { useDispatch } from "react-redux";
export default function RegisterInfo() {
  const dispatch = useDispatch();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const navigate = useNavigate();

  const InitialForm = ({ onSubmit }) => (
    <Formik
      enableReinitialize
      initialValues={{
        accountType: "",
      }}
      validationSchema={Yup.object().shape({
        accountType: Yup.string().required("Account type is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("values: ", values);
        if (values?.accountType === "Patient") {
          dispatch(getFlowForm({ flowForm: "patient" }));
          navigate("/patient/registration");
        } else {
          dispatch(getFlowForm({ flowForm: "doctor" }));
          navigate("/doctor/registration")
        }
      }}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        dirty,
      }) => (
        <Form className="wflexLayout">
          {isFormLoading && <Loading />}
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
                <div className="w-80 mx-auto wflexLayout wflex-items-center">
                  <h5 className="mb-3">Type of Account</h5>
                  <div className="al_login-form al_registrationform wflexScroll">
                    <div
                      className={`al_accounttype mb-3 ${
                        values.accountType === "Patient" ? "selected" : ""
                      }`}
                      onClick={() => setFieldValue("accountType", "Patient")}
                    >
                      <h6 className="mb-0 fw-medium">I am a</h6>
                      <h5
                        className="mb-0 lh-normal pe-5"
                        style={{ lineHeight: 1.25 }}
                      >
                        Patient
                      </h5>
                    </div>
                    <div
                      className={`al_accounttype ${
                        values.accountType === "Physician" ? "selected" : ""
                      }`}
                      onClick={() => setFieldValue("accountType", "Physician")}
                    >
                      <h6 className="mb-0 fw-medium">I am a</h6>
                      <h5
                        className="mb-0 me-4 pe-5"
                        style={{ lineHeight: 1.25 }}
                      >
                        Healthcare Provider
                      </h5>
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
                  <Button
                    type="submit"
                    className="al_login_button mt-4"
                    // disabled={isSubmitting || !dirty}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
  return (
    <div className="al_login_container">
      <InitialForm />
    </div>
  );
}
