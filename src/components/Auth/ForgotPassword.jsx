import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Label } from "reactstrap";
import * as Yup from "yup";
import { getAuthRoute, getRegForm, pageTitle } from "../../_mock/internalJsControl";
import { getRegistrationOtpRequest, setActiveRegistrationForm, setAuthRoutes, setResetSessionState } from "../../store/SessionStore/slice";
import OtpForm from "./Registeration/OtpForm";
import SetResetPasswordForm from "./Registeration/SetResetPassword";

export default function ForgotPassword() {
  pageTitle("ForgotPassword")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forgotPasswordFormData, regActiveForm } = useSelector((state) => (state?.sessionStoreSlice));

  useEffect(() => {
    return () => {
      dispatch(setResetSessionState())
    }
  }, []);
  const handleSubmit = (values) => {
    dispatch(getRegistrationOtpRequest({ values, activeForm: getRegForm.OTPFORM }));
  };

  let backToSignInHandle = (navigateBack = false) => {
    dispatch(setActiveRegistrationForm(""))
    dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    navigate("/signin")
  }

  return (
    <React.Fragment>
      {regActiveForm === getRegForm.OTPFORM ? <OtpForm /> :
        regActiveForm === getRegForm.SETPASSWORDFORM ? <SetResetPasswordForm props={{ isForgotPassword: true }} /> :
          <div className="al_login_container">
            <Formik
              enableReinitialize
              initialValues={{
                email: forgotPasswordFormData?.email || "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Mobile Number / Email-ID field is required")
                  .matches(
                    /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
                    "Invalid email or phone number"
                  ),
              })}
              onSubmit={(values) => handleSubmit({ ...values })}
            >
              {({ values, errors, setFieldValue }) => {
                return (
                  <Form className="wflexLayout">
                    <div className="wflexLayout al_mx-auto">
                      <div className="wflex-items-center wflexLayout">
                        <h5>Forgot Password</h5>

                        <div className="al_login-form wflexScroll">
                          <FormGroup>
                            <Label>Mobile Number / Email ID</Label>
                            <Field
                              type="text"
                              name="email"
                              placeholder="e.g. abc@email.com"
                              className="form-control"
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setFieldValue("email", trimmedValue);
                              }}
                            />
                            <ErrorMessage
                              name="email"
                              component={"div"}
                              className="text-danger"
                            />
                          </FormGroup>
                        </div>
                        <div className="al_login_footer mt-3">
                          <div className="d-flex">
                            <button
                              type="button"
                              style={{ width: "45px", minWidth: "45px" }}
                              className="al_login_button_back me-3 mb-0 d-flex align-items-center justify-content-center"
                              onClick={() => backToSignInHandle(true)}
                            >
                              <i className="icon_alfred_back-arrow"></i>
                            </button>
                            <button type="submit" className="al_login_button">
                              Verify
                            </button>
                          </div>
                          <button
                            type="button"
                            className="al_login_button_back mt-3"
                            onClick={backToSignInHandle}
                          >
                            <Link to="/signin">
                              Back to <strong>Sign in</strong>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>}
    </React.Fragment>
  );
}
