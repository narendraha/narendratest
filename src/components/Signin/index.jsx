import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Alert, Label, FormGroup } from "reactstrap";
import alferdlogo from "../../images/alfredlogowhite.svg";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App1 from "./temp";
import { AxiosInstance } from "../../_mock/utilities";
import { toast } from "react-toastify";

export default function Signin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    // navigate("/home");
    let data={
        username : values.username,
        password : values.password
    }
    AxiosInstance("application/json")
    .post(`/login_account`, data)
    .then((res) => {
      if (res && res.data && res.status == "200") {
        localStorage.setItem('token', res.data?.data?.token)
        if(res.data?.statuscode === 200){
          toast(res.data?.message, {
              position: "top-right",
              type: "success",
              
          });
          setIsAuthenticated(true);
          navigate('/dashboard')
        }else{
          toast(res.data?.message, {
              position: "top-right",
              type: "error",
          });
        }
      }
    })
    .catch((er) => {
      console.log(er);
      toast(er?.response?.data?.message, {
          position: 'top-right',
          type: 'error',
      })
    });
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
          username : Yup.string()
          .email("Invalid email")
          .required("This field is required"),
          password: Yup.string().required("Password is required")
        })}
        onSubmit={(values) =>{handleSubmit(values)}}
      >
        {({
          values,
          errors,
          handleSubmit,
        }) => {
          return (
            <Form className="wflexLayout">
              <Row className="al_login_section">
                <Col lg="7" sm="6" className="al_left_login h-100">
                  <div className="wflexLayout">
                    <Link to="/">
                      <img src={alferdlogo} alt="logo" width={180} />
                    </Link>
                  </div>
                </Col>
                <Col lg="5" sm="6" className="al_login-right h-100">
                  <div className="wflexLayout al_mx-auto">
                    <div className="wflex-items-center wflexLayout">
                      <h5>Sign in</h5>

                      <div className="wflexScroll">
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
                        {/* <Link to="/forgot-password" className="al_forgot_pw al_text_link">Forgot password?</Link> */}
                        <button
                          type="submit"
                          disabled={isSubmitting ? true : false}
                          className="al_login_button mt-3"
                        >
                          Sign in
                        </button>
                        <div className="mt-3">
                          Don’t have an account?{" "}
                          <Link
                            to="/registration"
                            className="al_text_link cs_medium"
                          >
                            Signup
                          </Link>
                        </div>
                        <div className="alhr-or">OR</div>
                        {/* <button type="button" className='al_signinbuttons'>
                                        <i className='icon_alfred_google'></i>
                                        <span>Sign in with Google</span>
                                    </button> */}
                        <GoogleOAuthProvider clientId="127686704222-9h7eguj5fq0ibo9e9tib7d155s9tsjft.apps.googleusercontent.com">
                          <App1 />
                        </GoogleOAuthProvider>
                        <button type="button" className="al_signinbuttons">
                          <i className="icon_alfred_apple"></i>
                          <span>Continue With Apple</span>
                        </button>
                      </div>
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
