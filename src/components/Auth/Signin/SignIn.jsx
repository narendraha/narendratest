import React from "react";
import { Icon } from "@iconify/react";
import { signInWithPopup } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Label, UncontrolledTooltip } from "reactstrap";
import * as Yup from 'yup';
import { getAuthRoute, getRegForm, pageTitle } from "../../../_mock/helperIndex";
import apple from '../../../images/apple.svg';
import google from '../../../images/google.svg';
import handwave from '../../../images/handwave.png';
import { loginRequest, setActiveRegistrationForm, setAuthRoutes } from "../../../store/SessionStore/slice";
import { appleAuth, appleAuthProvider } from '../../Firebase/appleFirebase';
import { googleAuth, googleAuthprovider } from "../../Firebase/googleFirebase";

export const Signin = () => {
  pageTitle('Signin');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInToGooglehandle = async () => {
    await signInWithPopup(googleAuth, googleAuthprovider)
      .then((data) => {
        dispatch(loginRequest({ values: data?.user, navigate, isGoogleOrAppleLogin: true }))
      })
      .catch((error) => { });
  }

  const signUpAndForgotPassHandle = (activeForm, isRegister = false) => {
    navigate(activeForm)
    dispatch(setAuthRoutes(activeForm))
    if (isRegister)
      dispatch(setActiveRegistrationForm(getRegForm.REGTYPESELECTION))
  }

  const signInToApplehandle = async () => {
    await signInWithPopup(appleAuth, appleAuthProvider)
      .then((data) => {
        dispatch(loginRequest({ values: data?.user, navigate, isGoogleOrAppleLogin: true }))
      })
      .catch((error) => { });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordEyeClose: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .trim()
            .required("Mobile Number / Email-ID field is required")
            .matches(
              // Regular expression for email or phone number validation
              /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
              "Invalid email or phone number"
            ),
          password: Yup.string()
            .max(50, "Max 50 characters are allowed")
            .required("Password is required")
        })
        }
        onSubmit={(values) => {
          console.log("Submit=>", values)
          dispatch(loginRequest({ values, navigate }))
        }}
      >{({ values, setFieldValue }) => (
        <>
          <Form className="wflexLayout">
            <div className="al_homemenu" id="backtohome" onClick={() => navigate("/")}>
              <i className="icon_alfred_home"></i>
              <UncontrolledTooltip
                modifiers={[
                  { preventOverflow: { boundariesElement: "window" } },
                ]}
                placement="left"
                target="backtohome"
              >
                Back to Home
              </UncontrolledTooltip>
            </div>
            <div className="wflexLayout al_mx-auto align-items-center justify-content-center">
              <div className="wflexScroll w-100">
                <h5 className="mb-1">
                  <span className="fw-medium">Welcome to </span>
                  <br />
                  <span style={{ fontSize: "26px" }}>
                    Hello
                    <span className="text-info">
                      Alfred.ai{" "}
                      <img
                        src={handwave}
                        alt=""
                        width={25}
                        className="mb-2"
                      />
                    </span>
                  </span>
                </h5>
                <p
                  className="cs_light text-grey text-italic mb-4"
                  style={{ fontFamily: "STIX Two Text" }}
                >
                  "Let's take your wellness journey to new heights"
                </p>

                <div className="al_signinbg">
                  <div className="al_login-form">
                    <FormGroup>
                      <Label>Mobile Number / Email ID</Label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="e.g.abc@email.com"
                        className="form-control"
                        onChange={(e) => {
                          const trimmedValue = e.target.value.trim();
                          setFieldValue("username", trimmedValue);
                        }}
                      />
                      <ErrorMessage
                        name="username"
                        component={"div"}
                        className="text-danger"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <div className="d-flex align-items-end position-relative">
                        <Field
                          type={values?.passwordEyeClose ? "text" : "password"}
                          name="password"
                          placeholder="e.g.Pass@123"
                          className="form-control"
                        />
                        <div
                          onClick={() => setFieldValue('passwordEyeClose', !values?.passwordEyeClose)}
                          className="password_icon"
                        >
                          <Icon
                            icon={values?.passwordEyeClose ? "bi:eye" : "bi:eye-slash"}
                            width="1.2em"
                            height="1.2em"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component={"div"}
                        className="text-danger"
                      />
                    </FormGroup>
                  </div>
                  <div className="al_login_footer">
                    <Link
                      to="/forgot-password"
                      className="al_forgot_pw"
                      onClick={() => signUpAndForgotPassHandle(getAuthRoute.FORGOTPASSWORDFROM)}
                    >
                      Forgot password?
                    </Link>
                    <button
                      type="submit"
                      className="al_login_button mt-3"
                    >
                      Sign in
                    </button>
                    <div className="mt-3 text-medium">
                      Don’t have an account?{" "}
                      <Link
                        to="/registration"
                        className="al_text_link cs_medium"
                        onClick={() => signUpAndForgotPassHandle(getAuthRoute.REGISTER, true)}
                      >
                        Signup
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="alhr-or my-3 text-center fw-medium">
                  OR
                </div>
                <button
                  type="button"
                  onClick={signInToGooglehandle}
                  className="al_signinbuttons"
                >
                  <img
                    src={google}
                    alt="google"
                    className="me-2"
                    width={17}
                  />
                  Sign in / Sign up With Google
                </button>
                <button type="button"
                  className="al_signinbuttons"
                  onClick={signInToApplehandle}
                >
                  <img
                    src={apple}
                    alt="apple"
                    className="me-2"
                    width={17}
                  />
                  <span>Sign in / Sign up With Apple</span>
                </button>
              </div>
            </div>
          </Form>
        </>
      )}
      </Formik>
    </React.Fragment >
  )
}