import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment"; // Import moment library
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Card, CardBody, Col, FormGroup, Label, Row, UncontrolledTooltip } from "reactstrap";
import * as Yup from "yup";
import {
  allowsOnlyNumeric,
  passwordReg,
  phoneNumberReg,
} from "../../../_mock/RegularExp";
import { AxiosInstance } from "../../../_mock/utilities";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import successImg from "../../../images/sucessimg.svg";
import OTPComponent from "../ForgotPassword/OTP";
import Loading from "../../InnerApp/LoadingComponent";
import { getGenderoptions, getResidenceoptions, getEductaionOptions, customContentValidation, allowedNumbersOnField } from "../../../_mock/helperIndex";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef(Array(4).fill(null));
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [otpResponse, setOtpResponse] = useState("");
  const [isTermsAndConditionsRead, serIsTermsAndConditionsRead] = useState(true);
  const genderoptions = getGenderoptions;
  const residenceoptions = getResidenceoptions;
  const educationOptions = getEductaionOptions;

  const [showPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        username: formData?.username || "",
        email: formData?.email || "",
        dob: formData?.dob || "",
        gender: formData?.gender || "",
        mobile: formData?.mobile || "",
        rtype: formData?.rtype || "",
        education: formData?.education || "",
        ssn: formData?.ssn || "",
        insuranceurl: formData?.insuranceurl || "",
        file: formData?.file || null,
        termsAndConditions: formData?.termsAndConditions || false
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Register form fields
        // username: Yup.string()
        //   .min(2, "Too Short!")
        //   .max(50, "Too Long!")
        //   .required("Full Name is required"),
        // mobile: Yup.string()
        //   .matches(phoneNumberReg, "Invalid phone number")
        //   .required("This field is required"),
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string()
          .trim()
          .max(50, "Maximum 50 characters are allowed")
          .email("Invalid email")
          .required("Email is required"),
        mobile: customContentValidation('Mobile Number is required', { patternType: 'number', message: 'number' }, 10),
        dob: Yup.date()
          .max(
            new Date(Date.now() - 567648000000),
            "You must be at least 18 years old"
          )
          .min(
            new Date(Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000),
            "You must be below 120 years old"
          )
          .required("DOB is required"),
        gender: Yup.string().required("Gender is required"),
        rtype: Yup.string().required("Resident type is required"),
        education: Yup.string().required("Education field is required"),
        ssn: customContentValidation('', { patternType: 'number', message: 'number' }, 9)
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
        dirty
      }) => {
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
                    {/* <>
                      <div className="w-80 mx-auto wflexLayout wflex-items-center">
                        <h5 className="mb-3">Type of Account</h5>
                        <div className="al_login-form al_registrationform wflexScroll">
                          <div className="al_accounttype mb-3">
                            <h6 className="mb-0 fw-medium">I am a</h6>
                            <h4 className="mb-0">Patient</h4>
                          </div>
                          <div className="al_accounttype">
                            <h6 className="mb-0 fw-medium">I am a</h6>
                            <h4 className="mb-0">Healthcare<br />Provider</h4>
                          </div>
                        </div>
                        <div className="mt-4 text-medium">
                          Already have an account?{" "}
                          <Link
                            to="/signin"
                            className="al_text_link cs_medium"
                          >
                            Sign in
                          </Link>
                        </div>
                      </div>
                    </> */}
                    <>
                      <h6 className="mb-2">Personal Details</h6>
                      <div className="al_login-form al_registrationform wflexScroll">
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Full Name
                          </Label>
                          <Field
                            type="text"
                            name="username"
                            placeholder="e.g.John Doe"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="username"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Email ID
                          </Label>
                          <Field
                            type="text"
                            name="email"
                            placeholder="e.g.abc@email.com"
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
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Date of Birth
                          </Label>
                          <DatePicker
                            className="form-control al_calendarIcon"
                            name="dob"
                            placeholderText="e.g.MM/DD/YYYY"
                            popperPlacement="auto"
                            popperModifiers={[{
                              flip: {
                                behavior: ["bottom"],
                              },
                              preventOverflow: {
                                enabled: false,
                              },
                            }]}
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
                          <Label>
                            <span className="requiredLabel">*</span>Gender
                          </Label>
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
                            onBlur={() => setFieldTouched('gender', true)}
                          />
                          <ErrorMessage
                            name="gender"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Mobile
                          </Label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                +1
                              </span>
                            </div>
                            <Field
                              type="text"
                              className="form-control"
                              name="mobile"
                              placeholder="e.g.123-4567-8901"
                              // onKeyPress={(e) => allowsOnlyNumeric(e)}
                              onKeyPress={(e) => allowedNumbersOnField(10, e)}
                              aria-describedby="basic-addon1"
                            />
                          </div>
                          <ErrorMessage
                            name="mobile"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Residence Type
                          </Label>
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
                            onBlur={() => setFieldTouched('rtype', true)}
                          />
                          <ErrorMessage
                            name="rtype"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Highest Education
                          </Label>
                          <Select
                            options={educationOptions}
                            name="education"
                            className="inputSelect"
                            value={educationOptions.find(
                              (option) => option.value === values.education
                            )}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "education",
                                selectedOption ? selectedOption.value : ""
                              );
                            }}
                            onBlur={() => setFieldTouched('education', true)}
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
                            placeholder="e.g.xxx-xxx-xxx"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="ssn"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="file">Upload Insurance</Label>
                          <input
                            type="file"
                            id="file"
                            name="file"
                            hidden
                            onChange={(event) => {
                              setFieldValue("file", event.currentTarget.files[0]);
                            }}
                          />
                          <div>
                            {values.file ? values.file.name : "No file selected"}
                          </div>
                          <div id="al_blockele">
                            <label htmlFor="file" className="al_choose">
                              Upload File
                            </label>
                          </div>
                          {/* <div className="al_fileuplod-note">* jpg, jpeg, png File only</div> */}
                          <ErrorMessage
                            name="file"
                            component="div"
                            className="text-danger"
                          />
                        </FormGroup>

                        <Label
                          check
                          className="d-flex align-items-center"
                        >
                          <div id="terms" style={{ lineHeight: 0 }}>
                            <input name="termsAndConditions" type="checkbox" defaultChecked={values?.termsAndConditions} value={values?.termsAndConditions}
                              disabled={isTermsAndConditionsRead}
                              onChange={(e) => {
                                setFieldValue("termsAndConditions", e.target.checked);
                              }} />
                          </div>&nbsp; I agree to the&nbsp;<Link to="/terms" target="_blank" rel="noopener noreferrer" onClick={() => {
                            serIsTermsAndConditionsRead(false); setFormData({ ...formData, ...values });
                          }}>terms and conditions</Link>
                          {isTermsAndConditionsRead &&
                            <UncontrolledTooltip color="primary" placement="right" target="terms">
                              Please read the Terms and Conditions to enable this option
                            </UncontrolledTooltip>
                          }
                        </Label>
                      </div>
                      <div className="al_login_footer mt-3">
                        <button type="submit" className="al_login_button" disabled={!values?.termsAndConditions}>
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
                    </>
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
                          {/* <div className="al_text_link text-small" style={{textDecoration: "underline"}}>Change Mobile Number/Email ID</div> */}
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
                      <button
                        type="button"
                        className="al_login_button_back mt-3 py-2"
                        onClick={() => setActiveForm(1)}
                      >
                        <i className="icon_alfred_back-arrow me-2" style={{ verticalAlign: "middle" }}></i>Back
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
        scheduletype: "1",
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
                  <img src={alferdlogo} alt="logo" />
                </div>
              </Col>
              <Col lg="5" sm="6" className="al_login-right h-100">
                <div className="wflexLayout al_mx-auto">
                  <div className="wflex-items-center wflexLayout">
                    <h5 className={"mb-0"}>Type of subscription</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <Row className="planscard mt-2">
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
                              <h6 className="my-2">Features</h6>
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
                              <h6 className="my-2">Features</h6>
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
                              <h6 className="my-2">Features</h6>
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
                {/* <div className="text-center mb-4">
                  <img src={approvalsent} alt="approval" height={85} />
                  <div className="mt-4">You have registered</div>
                  <h4 className="text-success">successfully</h4>
                  <p className="mb-0 textLight">
                    Your account is currently under review. You will receive an email notification once it’s approved. Thank you
                  </p>
                </div> */}
              </div>
              <div className="al_login_footer mt-3">
                <button
                  type="submit"
                  className="al_login_button"
                  onClick={() => {
                    setActiveForm(5); // Switch back to the first form after submitting the second form
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

  const [activeForm, setActiveForm] = useState(1);
  const [formData, setFormData] = useState(null);

  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let data = {
      email: values?.email,
      username: values?.username,
      mobile: values?.mobile
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
    setIsSubmitting(true);
    setFormData({ ...formData, ...values });
    let data = {
      ...formData,
      dob: moment(formData.dob).format("YYYY-MM-DD"),
      password: values?.password,
    };
    delete data.reenterpassword;
    delete data.otp;
    delete data.file;

    AxiosInstance("application/json")
      .post(`/create_account`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsSubmitting(false);
          if (res.data?.statuscode === 200) {
            setIsLoading(false);
            toast(res.data?.message, {
              position: "top-right",
              type: "success",
            });
            setActiveForm(4); // Switch back to the first form after submitting the third form
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
  const handleFinalSubmit = (values) => {
    setIsLoading(true);
    // Here you can submit formData to your backend or perform other actions
    setFormData({ ...formData, ...values });
    navigate("/signin");
  };
  return (
    <div className="al_login_container">
      {isLoading && <Loading />}

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
                            <span
                              style={{ color: "#9ba8b9", fontSize: "11px" }}
                            >
                              Password must contain 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character
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
                                type={
                                  isShowConfirmPassword ? "text" : "password"
                                }
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
      ) : activeForm === 4 ? (
        <PasswordSuccessForm />
      ) : (
        <FourthForm onSubmit={handleFinalSubmit} />
      )}
    </div>
  );
}