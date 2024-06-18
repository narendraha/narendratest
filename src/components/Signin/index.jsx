import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Label, FormGroup, UncontrolledTooltip } from "reactstrap";
import alferdlogo from "../../images/alfredlogowhite.svg";
import alferdlogomobile from "../../images/alfredlogo.svg";
import { useState } from "react";
import { AxiosInstance } from "../../_mock/utilities";
import { toast } from "react-toastify";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import Loading from "../InnerApp/LoadingComponent";
import { Icon } from "@iconify/react";
import handwave from '../../images/handwave.png';
import google from '../../images/google.svg';
import apple from '../../images/apple.svg';

export default function Signin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values) => {
    setIsLoading(true);
    let data = {
      username: values.username,
      password: values.password,
    };
    AxiosInstance("application/json")
      .post(`/login_account`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsLoading(false);
          if (res.data.statuscode == "200") {
            localStorage.setItem("token", res.data?.data?.token);
          }
          if (res.data?.statuscode === 200) {
            toast(res.data?.message, {
              position: "top-right",
              type: "success",
            });

            setIsAuthenticated(true);
            navigate("/home");
          } else {
            toast(res.data?.message, {
              position: "top-right",
              type: "error",
            });
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        let userData = {
          email: data?.user?.email ?? "",
          username: data?.user?.displayName ?? "",
        };
        AxiosInstance("application/json")
          .post(`/googleauth`, userData)
          .then((res) => {
            if (res && res.data && (res.status == 200 || res.status == 201)) {
              localStorage.setItem("token", res.data?.data?.token);
              toast(res.data?.message, {
                position: "top-right",
                type: "success",
              });
              setIsAuthenticated(true);
              navigate("/profile");
            } else {
              toast(res.data?.message, {
                position: "top-right",
                type: "error",
              });
            }
          })
          .catch((er) => {
            toast(er?.response?.data?.message || er?.message, {
              position: "top-right",
              type: "error",
            });
          });
      })
      .catch((error) => { });
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
            .required("This field is required")
            .matches(
              // Regular expression for email or phone number validation
              /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
              "Invalid email or phone number"
            ),
          password: Yup.string().required("Password is required"),
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
                        placementPrefix="al_bs_tooltip"
                        modifiers={[{ preventOverflow: { boundariesElement: 'window' }}]}
                        placement='left' target="backtohome">
                        Back to Home
                      </UncontrolledTooltip>
                    </div>
                  </Link>
                  <div className="wflexLayout al_mx-auto align-items-center justify-content-center">
                    <div className="wflexScroll w-100">
                      <h5 className="mb-1">
                        <span className="fw-medium">Welcome to </span><br/>
                        <span>
                          Hello<span className="text-info">Alfred.AI <img src={handwave} alt="" width={25} className="mb-2" /></span>
                        </span>
                      </h5>
                      <p className="cs_light text-grey text-italic" style={{ fontFamily: 'STIX Two Text' }}>
                        "Lets take your wellness journey to new heights"
                      </p>

                      <div className="al_signinbg">
                        <div className="al_login-form">
                          <FormGroup>
                            <Label>Mobile Number / Email ID</Label>
                            <Field
                              type="text"
                              name="username"
                              placeholder="Enter Mobile Number / Email ID"
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
                                placeholder="Enter password"
                                className="form-control"
                              />
                              <div
                                onClick={togglePasswordVisibility}
                                className="password_icon"
                              >
                                {showPassword ? (
                                  <Icon
                                    icon="bi:eye-slash"
                                    width="1.2em"
                                    height="1.2em"
                                  />
                                ) : (
                                  <Icon
                                    icon="bi:eye"
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
                          <Link to="/forgot-password" className="al_forgot_pw">
                            Forgot password?
                          </Link>
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
                              to="/registration"
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
                        <img src={google} alt="google" className="me-2" width={17} />Sign in / Sign up With Google
                      </button>
                      <button type="button" className="al_signinbuttons">
                        <img src={apple} alt="apple" className="me-2" width={17} />
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
