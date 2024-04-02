import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Label, FormGroup, Card, CardBody } from "reactstrap";
import Select from "react-select";
import alferdlogo from "../../images/alfredlogowhite.svg";
import successImg from "../../images/sucessimg.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { allowsOnlyNumeric, phoneNumberReg } from "../../_mock/RegularExp";
import moment from "moment"; // Import moment library
import { AxiosInstance } from "../../_mock/utilities";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState();
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const inputRefs = useRef(Array(4).fill(null));

  const genderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const residenceoptions = [
    { value: "Cohabitant", label: "Cohabitant" },
    { value: "Non-Resident", label: "Non-Resident" },
  ];

  const handleFileChange = (event) => {
    setFileName({ fileName: event.target.files[0].name });
  };

  const FirstForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        username: "",
        email: "",
        dob: "",
        gender: "",
        mobile: "",
        rtype: "",
        education: "",
        ssn: "",
        insuranceurl:""
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Register form fields
        username: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("This field is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("This field is required"),
        mobile: Yup.string()
          .matches(phoneNumberReg, "Invalid phone number")
          .required("This field is required"),
        dob: Yup.string().required("This field is required"),
        gender: Yup.string().required("This field is required"),
        rtype: Yup.string().required("This field is required"),
        education: Yup.string().required("This field is required"),
        ssn: Yup.string().required("This field is required"),
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
                    <h5 className={"mb-0"}>Register</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <FormGroup>
                        <Label>Full Name</Label>
                        <Field
                          type="text"
                          name="username"
                          placeholder="Enter Full Name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="username"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Email ID</Label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Enter Email ID"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Date of Birth</Label>
                        <DatePicker
                          className="form-control al_calendarIcon"
                          name="dob"
                          placeholderText="Select DOB"
                          popperPlacement="auto"
                          popperModifiers={{
                            flip: {
                              behavior: ["bottom"],
                            },
                            preventOverflow: {
                              enabled: false,
                            },
                          }}
                          selected={values.dob}
                          onChange={(e) => {
                            setFieldValue("dob", e);
                          }}
                          dateFormat={"MM/dd/yyyy"}
                          maxDate={new Date()}
                          onBlur={() => setFieldTouched("dob", true)}
                          autoComplete="off"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        <ErrorMessage
                          name="dob"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Gender</Label>
                        <Select
                          options={genderoptions}
                          name="gender"
                          className="inputSelect"
                          value={genderoptions.find(
                            (option) => option.value === values.gender
                          )}
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "gender",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                        />
                        <ErrorMessage
                          name="gender"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Mobile</Label>
                        <Field
                          type="text"
                          name="mobile"
                          placeholder="Enter Mobile Number"
                          className="form-control"
                          onKeyPress={(e) => allowsOnlyNumeric(e)}
                        />
                        <ErrorMessage
                          name="mobile"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Residence Type</Label>
                        <Select
                          options={residenceoptions}
                          name="rtype"
                          className="inputSelect"
                          value={residenceoptions.find(
                            (option) => option.value === values.rtype
                          )}
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "rtype",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                        />
                        <ErrorMessage
                          name="rtype"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Education</Label>
                        <Field
                          type="text"
                          name="education"
                          placeholder="Enter Education"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="education"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>SSN</Label>
                        <Field
                          type="password"
                          name="ssn"
                          placeholder="Enter SSN"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="ssn"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Upload Insurance</Label>
                        <input
                          type="file"
                          id="insurance"
                          hidden
                          onChange={(e) => handleFileChange(e)}
                        />
                        <div>{fileName}</div>
                        <div id="al_blockele">
                          <label htmlFor="insurance" className="al_choose">
                            Upload File
                          </label>
                        </div>
                        {/* <div className="al_fileuplod-note">* jpg, jpeg, png File only</div> */}
                        <ErrorMessage
                          name="insurance"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                    </div>
                    <div className="al_login_footer mt-3">
                      {" "}
                      <button type="submit" className="al_login_button">
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
                    <h5 className={"mb-0" + " text-center"}>
                      OTP Verification
                    </h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <div className="text-center">
                        <FormGroup className="mt-3">
                          <Label>Enter otp sent to ******2987</Label>
                          <Row className="mx-0 al_otpfields">
                            <Field name="otp">
                              {({ field }) => (
                                <OtpInput
                                  {...field}
                                  numInputs={4}
                                  // separator={<span>-</span>}
                                  isInputNum
                                  containerStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  inputStyle={{
                                    margin: "5px",
                                    width: "55px",
                                    height: "55px",
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
                                          console.log("ememe", e.key);
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
                                              // console.log("index", index)
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

  const ThirdForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        password: "",
        reenterpassword: "",
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Password form fields
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        reenterpassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
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
      }) => {
        return (
          <Form className="wflexLayout" onSubmit={handleSubmit}>
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
                    <h5 className={"mb-0"}>Set Password</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <FormGroup>
                        <Label>New Password</Label>
                        <Field
                          type={isShowPassword ? "password" : "text"}
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
                      <FormGroup>
                        <Label>Re-enter New Password</Label>
                        <Field
                          type={isShowConfirmPassword ? "password" : "text"}
                          name="reenterpassword"
                          placeholder="Re-enter New Password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="reenterpassword"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      {/* <div className="text-center mb-4">
                        <img src={successImg} alt="success" height={85} />
                        <div className="mt-4">Password set</div>
                        <h4 className="text-success">successfully</h4>
                        <p className="mb-0 textLight">
                          Login to your account with new password
                        </p>
                      </div> */}
                    </div>
                    <div className="al_login_footer mt-3">
                      <button type="submit" className="al_login_button">
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
  );

  const FourthForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        scheduletype: '',
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Subscription form fields
        scheduletype: Yup.string().required("This field is required"),
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
      }) => {
        return (
          <Form className="wflexLayout" onSubmit={handleSubmit}>
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
                    <h5 className={"mb-0"}>Type of subscription</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <Row className="planscard mt-3">
                        <Col sm="10">
                          <Card>
                            <CardBody>
                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label check className="d-flex align-center">
                                  <div className="me-3">
                                    <h5 className="mb-0">Basic</h5>
                                    <span>
                                      It is a long established fact that a
                                      reader.
                                    </span>
                                  </div>
                                  <Field
                                    type="radio"
                                    name="scheduletype"
                                    value="1"
                                  />
                                </Label>
                              </FormGroup>
                              <h6 className="my-3">Features</h6>
                              <ul className="standardPlans">
                                <li>
                                  Patient Registration
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Avatar Customization
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Chat
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Connect with wearables
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Access Knowledge base
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Referral Option
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Real-time sentiment capture
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Ambient listening
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Goal setting
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Goal tracking
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Dashboards
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Widgets
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Physician Consultation
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Journey Enhancements
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Third party vendor interfaces
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                              </ul>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col sm="10">
                          <Card>
                            <CardBody>
                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label check className="d-flex align-center">
                                  <div className="me-3">
                                    <h5 className="mb-0">Standard</h5>
                                    <span>
                                      It is a long established fact that a
                                      reader.
                                    </span>
                                  </div>
                                  <Field
                                    type="radio"
                                    name="scheduletype"
                                    value="2"
                                  />
                                </Label>
                              </FormGroup>
                              <h6 className="my-3">Features</h6>
                              <ul className="standardPlans">
                                <li>
                                  Patient Registration
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Avatar Customization
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Chat
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Connect with wearables
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Access Knowledge base
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Referral Option
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Real-time sentiment capture
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Ambient listening
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Goal setting
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Goal tracking
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Dashboards
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Widgets
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Physician Consultation
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Journey Enhancements
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                                <li>
                                  Third party vendor interfaces
                                  <i className="icon_alfred_circle_xmark_solid"></i>
                                </li>
                              </ul>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col sm="10">
                          <Card>
                            <CardBody>
                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label check className="d-flex align-center">
                                  <div className="me-3">
                                    <h5 className="mb-0">Premium</h5>
                                    <span>
                                      It is a long established fact that a
                                      reader.
                                    </span>
                                  </div>
                                  <Field
                                    type="radio"
                                    name="scheduletype"
                                    value="3"
                                  />
                                </Label>
                              </FormGroup>
                              <h6 className="my-3">Features</h6>
                              <ul className="standardPlans">
                                <li>
                                  Patient Registration
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Avatar Customization
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Chat
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Connect with wearables
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Access Knowledge base
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Referral Option
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Real-time sentiment capture
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Ambient listening
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Goal setting
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Goal tracking
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Dashboards
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Widgets
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Physician Consultation
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Journey Enhancements
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                                <li>
                                  Third party vendor interfaces
                                  <i className="icon_alfred_circle_check_solid text-success"></i>
                                </li>
                              </ul>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                    <ErrorMessage
                        name="scheduletype"
                        component={"div"}
                        className="text-danger"
                      />
                    <div className="al_login_footer mt-3">
                      <button type="submit" className="al_login_button">
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
  );
  const [activeForm, setActiveForm] = useState(1);
  const [formData, setFormData] = useState(null);

  const handleFirstFormSubmit = (values) => {
    console.log("First form submitted with values:", values);
    setActiveForm(2); // Switch to the second form after submitting the first form
    setFormData({ ...formData, ...values });
  };

  const handleSecondFormSubmit = (values) => {
    console.log("Second form submitted with values:", values);
    setActiveForm(3); // Switch back to the first form after submitting the second form
    setFormData({ ...formData, ...values });
  };
  const handleThirdFormSubmit = (values) => {
    console.log("Third form submitted with values:", values);
    setActiveForm(4); // Switch back to the first form after submitting the third form
    setFormData({ ...formData, ...values });
  };
  console.log("formdata", formData);
  const handleFinalSubmit = () => {
    // Here you can submit formData to your backend or perform other actions
    let data = {
      ...formData,
      dob: moment(formData.dob).format("YYYY-MM-DD"),
    };
    console.log("Final form submitted with values:", formData);

    AxiosInstance("application/json")
      .post(`/create_account`, data)
      .then((res) => {
        console.log("datassss", res.data);
        if (res && res.data && res.status == "200") {
          console.log("datassss", res.data);
          if(res.data?.statuscode === 200){
            toast(res.data?.message, {
                position: "top-right",
                type: "success",
            });
            navigate('/signin')
          }else{
            toast(res.data?.message, {
                position: "top-right",
                type: "error",
            });
            navigate('/signin')
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
      {activeForm === 1 ? (
        <FirstForm onSubmit={handleFirstFormSubmit} />
      ) : activeForm === 2 ? (
        <SecondForm onSubmit={handleSecondFormSubmit} />
      ) : activeForm === 3 ? (
        <ThirdForm onSubmit={handleThirdFormSubmit} />
      ) : (
        <FourthForm onSubmit={handleFinalSubmit} />
      )}
    </div>
  );
}
