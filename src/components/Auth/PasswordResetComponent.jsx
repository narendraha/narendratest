import React, { useEffect, useRef, useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import alferdlogo from "../../images/alfredlogowhite.svg";
import { getActionTypes } from "../../_mock/helperIndex";
import { useDispatch, useSelector } from "react-redux";
import {
  getForgorPasswordForm,
  getRegisterClear,
  getRegisterPasswordResponseData,
} from "../../store/PatientRegisterFlow/slice";
import Loading from "../InnerApp/LoadingComponent";
import { passwordReg } from "../../_mock/RegularExp";
export default function RegisterInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const { isLoading, activeForm, actionData, flowForm } = useSelector(
    (state) => state.patientRegisterSlice
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setisShowConfirmPassword(!isShowConfirmPassword);
  };

  const [userSessionData, setUserSessionData] = useState("");

  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let previousFormData = actionData ? actionData : userSessionData

    flowForm === "forgotPassword"
      ? dispatch(
        getForgorPasswordForm({
          actionType: getActionTypes.SELECT,
          actionData: { previousFormData, ...values },
        })
      )
      : dispatch(
        getRegisterPasswordResponseData({
          actionType: getActionTypes.SELECT,
          actionData: { ...actionData, ...values },
        })
      );
  };


  useEffect(() => {
    setUserSessionData(JSON.parse(window.sessionStorage.getItem("actionData")));
  }, []);


  console.log("userSessionData=>", userSessionData, window)

  return (
    <div className="al_login_container">
      <Formik
        initialValues={{
          password: "",
          reenterpassword: "",
        }}
        validationSchema={Yup.object().shape({
          // Define validation rules for Password form fields
          password: Yup.string()
            .max(50, "Max 50 characters are allowed")
            .matches(passwordReg, "Please enter a valid password")
            .required("Password is required"),
          reenterpassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleFirstFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          handleSubmit,
          formikProps,
          isSubmitting,
        }) => {
          return (
            <Form className="wflexLayout" onSubmit={handleSubmit}>
              {isLoading && <Loading />}
              <Row className="al_login_section">
                <Col lg="7" sm="6" className="al_left_login h-100">
                  <div className="wflexLayout">
                    <img src={alferdlogo} alt="logo" />
                  </div>
                </Col>
                <Col lg="5" sm="6" className="al_login-right h-100">
                  <div className="wflexLayout al_mx-auto">
                    <div className="wflex-items-center wflexLayout">
                      <h5 className="mb-3">Set Password</h5>
                      <div className="al_login-form al_registrationform wflexScroll">
                        <FormGroup>
                          <Label>Password</Label>
                          <div className="d-flex align-items-end position-relative">
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="e.g.Pass@123"
                              className="form-control"
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setFieldValue("password", trimmedValue);
                              }}
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
                          <span style={{ color: "#9ba8b9", fontSize: "11px" }}>
                            Password must contain 8 characters, including one
                            uppercase letter, one lowercase letter, one number,
                            and one special character
                          </span>
                          <ErrorMessage
                            name="password"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Re-enter New Password</Label>
                          <div className="d-flex align-items-end position-relative">
                            <Field
                              type={isShowConfirmPassword ? "text" : "password"}
                              name="reenterpassword"
                              placeholder="e.g.Pass@123"
                              className="form-control"
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                setFieldValue("reenterpassword", trimmedValue);
                              }}
                            />
                            <div
                              onClick={togglePasswordVisibility2}
                              className="password_icon"
                            >
                              {isShowConfirmPassword ? (
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
                            name="reenterpassword"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                      </div>
                      <div className="al_login_footer mt-3">
                        <button
                          type="submit"
                          className="al_login_button"
                          disabled={isSubmitting} // Disable button when submitting
                        // onClick={() => handleThirdFormSubmit(values)}
                        >
                          Continue
                        </button>
                        <button
                          type="button"
                          className="al_login_button_back mt-3"
                          onClick={() => dispatch(getRegisterClear())}
                        >
                          <Link to="/signin">
                            Back to <strong>Sign in</strong>
                          </Link>
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
