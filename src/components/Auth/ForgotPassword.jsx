import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { passwordReg } from "../../_mock/RegularExp";
import { AxiosInstance } from "../../_mock/utilities";
import alferdlogomobile from "../../images/alfredlogo.svg";
import alferdlogo from "../../images/alfredlogowhite.svg";
import successImg from "../../images/sucessimg.svg";
import Loading from "../InnerApp/LoadingComponent";
import OTPComponent from "./ResendOtp";
import { pageTitle } from "../../_mock/internalJsControl";

export default function ForgotPassword() {
  pageTitle("ForgotPassword")
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(1);
  const [formData, setFormData] = useState(null);
  const inputRefs = useRef(Array(4).fill(null));
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [otpResponse, setOtpResponse] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setisShowConfirmPassword(!isShowConfirmPassword);
  };

  const resendOtp = (data) => {
    setIsFormLoading(true);
    AxiosInstance("application/json")
      .post(`/generate_otp`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsFormLoading(false);
          if (res.data.statuscode === 200) {
            setOtpResponse(res.data?.message);
            toast(res.data?.message, {
              position: "top-right",
              type: "success",
            });
            setActiveForm(2); // Switch to the second form after submitting the first form
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

  const FirstForm = ({ onSubmit }) => (
    <Formik
      enableReinitialize
      initialValues={{
        email: formData?.email || "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required("This field is required")
          .matches(
            /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
            "Invalid email or phone number"
          ),
      })}
      onSubmit={(values) => onSubmit({ ...values })}
    >
      {({ values, errors, setFieldValue }) => {
        return (
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
                      <button type="submit" className="al_login_button">
                        Verify
                      </button>
                      <button
                        type="button"
                        className="al_login_button_back mt-3"
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
  );

  const SecondForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        otp: "",
      }}
      validationSchema={Yup.object().shape({
        otp: Yup.string()
          .length(4, "OTP must be exactly 4 characters")
          .matches(/^\d{4}$/, "OTP must contain only digits")
          .required("OTP is required"),
      })}
      onSubmit={(values) => onSubmit({ ...values })}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        setFieldTouched,
        handleSubmit,
        formikProps,
        setFieldError,
        handleChange,
      }) => {
        return (
          <Form className="wflexLayout">
            {isFormLoading && <Loading />}
            <Row className="al_login_section">
              <Col lg="7" sm="6" className="al_left_login h-100">
                <div className="wflexLayout">
                  <img src={alferdlogo} alt="logo" />
                </div>
              </Col>
              <Col lg="5" sm="6" className="al_login-right h-100">
                <div className="wflexLayout al_mx-auto">
                  <div className="wflex-items-center wflexLayout">
                    <h5 className={"mb-0 text-center"}>OTP Verification</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <div className="text-center">
                        <FormGroup className="mt-3">
                          <Label>{otpResponse ? otpResponse : null}</Label>
                          <div className="al_text_link text-small" style={{ textDecoration: "underline" }} onClick={() => setActiveForm(1)}>Change Mobile Number/Email ID</div>
                          <Row className="mx-0 al_otpfields">
                            <Field name="otp">
                              {({ field }) => (
                                <OtpInput
                                  {...field}
                                  numInputs={4}
                                  isInputNum
                                  containerStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  inputStyle={{
                                    margin: "5px",
                                    width: "5vw",
                                    height: "5vw",
                                    textAlign: "center",
                                    border: "1px solid #B9C4D2",
                                    borderRadius: "12px",
                                  }}
                                  ref={(ref) => {
                                    if (ref) inputRefs.current[0] = ref;
                                  }}
                                  renderInput={(inputProps, index) => (
                                    <React.Fragment key={index}>
                                      <input
                                        {...inputProps}
                                        value={values.otp[index] || ""}
                                        onChange={(e) => {
                                          const updatedValue =
                                            e.target.value.replace(/\D/g, "");
                                          handleChange({
                                            target: {
                                              name: "otp",
                                              value:
                                                index === 0
                                                  ? updatedValue
                                                  : values.otp.substring(
                                                    0,
                                                    index
                                                  ) +
                                                  updatedValue +
                                                  values.otp.substring(
                                                    index + 1
                                                  ),
                                            },
                                          });
                                          if (
                                            index < 3 &&
                                            updatedValue.length === 1
                                          ) {
                                            inputRefs.current[
                                              index + 1
                                            ]?.focus();
                                          }
                                        }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Backspace" ||
                                            values.otp[index] === ""
                                          ) {
                                            // Handle backspace to remove the last character
                                            e.preventDefault();
                                            const updatedValue =
                                              values.otp.substring(0, index) +
                                              "" +
                                              values.otp.substring(index + 1);
                                            handleChange({
                                              target: {
                                                name: "otp",
                                                value: updatedValue,
                                              },
                                            });
                                            if (index > 0) {
                                              const newRefs = [
                                                ...inputRefs.current,
                                              ];
                                              newRefs[index - 1]?.focus();
                                              inputRefs.current = newRefs;
                                            }
                                          }
                                        }}
                                        name={`otp.${index}`}
                                        ref={(ref) => {
                                          if (ref)
                                            inputRefs.current[index] = ref;
                                        }}
                                      />
                                      {index < 3}
                                    </React.Fragment>
                                  )}
                                />
                              )}
                            </Field>
                            {!isFormLoading && (
                              <OTPComponent
                                resendOtp={resendOtp}
                                data={formData}
                              />
                            )}
                          </Row>
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-danger"
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="al_login_footer mt-3">
                      <button type="submit" className="al_login_button">
                        Verify
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
  );

  const PasswordSuccessForm = () => (
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
              </div>
              <div className="al_login_footer mt-3">
                <button
                  type="submit"
                  className="al_login_button"
                  onClick={() => {
                    navigate("/signin");
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
  );

  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let data = {
      email: values?.email,
    };
    resendOtp(data);
  };

  const handleSecondFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let data = {
      email: formData?.email,
      otp: values?.otp,
    };
    setIsFormLoading(true);
    AxiosInstance("application/json")
      .post(`/verify_otp`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsFormLoading(false);
          if (res.data.statuscode === 200) {
            toast(res.data?.message, {
              position: "top-right",
              type: "success",
            });
            setActiveForm(3); // Switch back to the first form after submitting the second form
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

  const handleThirdFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let data = {
      email: formData?.email,
      password: values?.password,
    };
    setIsFormLoading(true);
    AxiosInstance("application/json")
      .put(`/update_password`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsFormLoading(false);
          if (res.data.statuscode === 200) {
            toast(res.data?.message, {
              position: "top-right",
              type: "success",
            });
            setActiveForm(4); // Switch back to the first form after submitting the second form
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

  return (
    <div className="al_login_container">
      {activeForm === 1 ? (
        <FirstForm onSubmit={handleFirstFormSubmit} />
      ) : activeForm === 2 ? (
        <SecondForm onSubmit={handleSecondFormSubmit} />
      ) : activeForm === 3 ? (
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
          onSubmit={(values) => {
            handleThirdFormSubmit(values)
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
          }) => {
            return (
              <Form className="wflexLayout" onSubmit={handleSubmit}>
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
                                placeholder="Pass@123"
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
                            <div className="al_note mt-2 fw-light">
                              Password must contain 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character
                            </div>
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
                                type={
                                  isShowConfirmPassword ? "text" : "password"
                                }
                                name="reenterpassword"
                                placeholder="Pass@123"
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
                          // onClick={() => handleThirdFormSubmit(values)}
                          >
                            Continue
                          </button>
                          <button
                            type="button"
                            className="al_login_button_back mt-3"
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
      ) : (
        <PasswordSuccessForm />
      )}
    </div>
  );
}