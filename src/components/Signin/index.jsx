import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Label, FormGroup } from "reactstrap";
import alferdlogo from "../../images/alfredlogowhite.svg";
import alferdlogomobile from "../../images/alfredlogo.svg";
import { useState } from "react";
import { AxiosInstance } from "../../_mock/utilities";
import { toast } from "react-toastify";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";

export default function Signin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    let data = {
      username: values.username,
      password: values.password,
    };
    AxiosInstance("application/json")
      .post(`/login_account`, data)
      .then((res) => {
        if (res && res.data && res.status == "200") {
          localStorage.setItem("token", res.data?.data?.token);
          if (res.data?.statuscode === 200) {
            toast(res.data?.message, {
              position: "top-center",
              type: "success",
            });
            setIsAuthenticated(true);
            navigate("/home");
          } else {
            toast(res.data?.message, {
              position: "top-center",
              type: "error",
            });
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message, {
          position: "top-center",
          type: "error",
        });
      });
  };

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data?.user, "data");
        let userData = {
          email: data?.user?.email ?? "",
          username: data?.user?.displayName ?? "",
        };
        AxiosInstance("application/json")
          .post(`/googleauth`, userData)
          .then((res) => {
            if (
              res && res.data && (res.status == 200 ||
                res.status == 201)
            ) {
              localStorage.setItem("token", res.data?.data?.token);
              toast(res.data?.message, {
                position: "top-center",
                type: "success",
              });
              setIsAuthenticated(true);
              navigate("/profile");
            } else {
              toast(res.data?.message, {
                position: "top-center",
                type: "error",
              });
            }
          })
          .catch((er) => {
            console.log(er);
            toast(er?.response?.data?.message || er?.message, {
              position: "top-center",
              type: "error",
            });
          });
      })
      .catch((error) => console.log("error", error));
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
        {({ values, errors, handleSubmit }) => {
          return (
            <Form className="wflexLayout">
              <Row className="al_login_section">
                <Col lg="7" sm="6" className="al_left_login h-100">
                  <div className="wflexLayout">
                    <Link to="/">
                      <img src={alferdlogo} className="login_logodesktop" alt="logo" width={180} />
                      <img src={alferdlogomobile} className="login_logomobile" alt="logo_mobile" width={180} />
                    </Link>
                  </div>
                </Col>
                <Col lg="5" sm="6" className="al_login-right h-100">
                  <div className="wflexLayout al_mx-auto align-items-center justify-content-center">
                    <div className="wflexScroll w-100">
                      <h5 className="mb-1"><span className="fw-medium">Welcome to</span> <span className="text-info" style={{fontSize: "24px"}}>Hello Alfred !</span></h5>
                      <p className="text-medium cs_light text-grey text-italic">Lets take your wellness journey to new heights</p>

                      <div className="al_signinbg">
                        <div className="al_login-form">
                          <FormGroup>
                            <Label>Mobile Number / Email ID</Label>
                            <Field
                              type="text"
                              name="username"
                              placeholder="Enter Mobile Number / Email ID"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="username"
                              component={"div"}
                              className="text-danger"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Password</Label>
                            <Field
                              type="password"
                              name="password"
                              placeholder="Enter password"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="password"
                              component={"div"}
                              className="text-danger"
                            />
                          </FormGroup>
                        </div>
                        <div className="al_login_footer">
                          <Link to="/forgot-password" className="al_forgot_pw">Forgot password?</Link>
                          <button
                            type="submit"
                            disabled={isSubmitting ? true : false}
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

                      <div className="alhr-or my-3 text-center fw-medium">OR</div>
                      {/* <button type="button" className='al_signinbuttons'>
                                        <i className='icon_alfred_google'></i>
                                        <span>Sign in with Google</span>
                                    </button> */}
                      <button type="button"
                        onClick={handleClick}
                        className="al_signinbuttons"
                      >
                        <i className="icon_alfred_google"></i>Sign in / Sign up With Google
                      </button>
                      <button type="button" className="al_signinbuttons">
                        <i className="icon_alfred_apple"></i>
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
    </div >
  );
}
