import { Icon } from "@iconify/react";
import { signInWithPopup } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Col, FormGroup, Label, Row, UncontrolledTooltip } from "reactstrap";
import * as Yup from "yup";
import { pageTitle } from "../../_mock/internalJsControl";
import alferdlogomobile from "../../images/alfredlogo.svg";
import alferdlogo from "../../images/alfredlogowhite.svg";
import apple from '../../images/apple.svg';
import google from '../../images/google.svg';
import handwave from '../../images/handwave.png';
import { getFlowForm, googleLogin, loginForm } from "../../store/PatientRegisterFlow/slice";
import { auth, provider } from "../Firebase";
import Loading from "../InnerApp/LoadingComponent";

export default function Signin({ setIsAuthenticated }) {
  pageTitle('Signin')
  const navigate = useNavigate();
  const { isLoading, activeForm, isAuthenticated } = useSelector((state) => state.patientRegisterSlice);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values) => {
    dispatch(loginForm({ actionData: values }));
    if(isAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        dispatch(googleLogin({ actionData: data?.user }));
      })
      .catch((error) => {});
  };

  return (
    <div className="al_login_container">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          // Define validation rules for Password form fields
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
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => {
          return (
            <Form className="wflexLayout">
              {isLoading && <Loading />}
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
                  <Link to="/">
                    <div className="al_homemenu" id="backtohome">
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
                  </Link>
                  <div className="wflexLayout al_mx-auto align-items-center justify-content-center">
                    <div className="wflexScroll w-100">
                      <h5 className="mb-1">
                        <span className="fw-medium">Welcome to </span>
                        <br />
                        <span style={{ fontSize: "26px" }}>
                          Hello
                          <span className="text-info">
                            Alfred.AI{" "}
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="e.g.Pass@123"
                                className="form-control"
                              />
                              <div
                                onClick={togglePasswordVisibility}
                                className="password_icon"
                              >
                                {showPassword ? (
                                  <Icon
                                    icon="bi:eye"
                                    width="1.2em"
                                    height="1.2em"
                                  />
                                ) : (
                                  <Icon
                                    icon="bi:eye-slash"
                                    width="1.2em"
                                    height="1.2em"
                                  />
                                )}
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
                          <div
                            onClick={() =>
                              dispatch(
                                getFlowForm({
                                  activeForm: "",
                                  flowForm: "forgotPassword",
                                })
                              )
                            }
                          >
                            <Link
                              to="/forgot-password"
                              className="al_forgot_pw"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <button
                            type="submit"
                            // disabled={isSubmitting ? true : false}
                            className="al_login_button mt-3"
                          >
                            Sign in
                          </button>
                          <div className="mt-3 text-medium">
                            Don’t have an account?{" "}
                            <Link
                              to="/registration-info"
                              className="al_text_link cs_medium"
                            >
                              Signup
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="alhr-or my-3 text-center fw-medium">
                        OR
                      </div>
                      {/* <button type="button" className='al_signinbuttons'>
                                        <i className='icon_alfred_google'></i>
                                        <span>Sign in with Google</span>
                                    </button> */}
                      <button
                        type="button"
                        onClick={handleClick}
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
                      <button type="button" className="al_signinbuttons">
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
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
