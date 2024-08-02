import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Country, State } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment"; // Import moment library
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { passwordReg, phoneNumberReg } from "../../../_mock/RegularExp";
import { customContentValidation, getEductaionOptions, pageTitle } from "../../../_mock/helperIndex";
import { AxiosInstance } from "../../../_mock/utilities";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import successImg from "../../../images/sucessimg.svg";
import Loading from "../../InnerApp/LoadingComponent";
import { PhoneNumberCodeAndFlag } from "../../Utilities/PhoneNumberCodeAndFlag";
import OTPForm from "../OTPForm";
import SubscriptionForm from "../SubscriptionForm";

let stateOfPractice = [
  { label: "Cardiology", value: "cardiology" },
  { label: "Primary Care", value: "primary care" },
  { label: "Cardio Electrophysiologist", value: "cardio electrophysiologist" },
  { label: "Structural Cardiology", value: "structural cardiology" },
  { label: "Others", value: "others" }
]

let hospitalsOptions = [
  { label: "Yashoda Hospital", value: "Yashoda Hospital" },
  { label: "AIG Hopitals", value: "AIG Hopitals" },
  { label: "Dr. Agrawal Hospital", value: "Dr. Agrawal Hospital" },
  { label: "L.V. Prasad Hospital", value: "L.V. Prasad Hospital" },
]

export default function Register() {
  pageTitle("Register | Doctor")
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [otpResponse, setOtpResponse] = useState("");
  const educationOptions = getEductaionOptions;
  const [showPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState(1);
  const [formData, setFormData] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStates(states);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);
  const FirstFormPhysicain = ({ onSubmit }) => (
    <Formik
      enableReinitialize
      initialValues={{
        username: formData?.username || "",
        email: formData?.email || "",
        mobile: formData?.mobile || "",
        education: formData?.education || "",

        specialization: formData?.specialization || "",
        nationalID: formData?.nationalID || "",
        licenseNo: formData?.licenseNo || "",
        rCode: formData?.rCode || "",
        country: formData?.rtype || "",
        state: formData?.state || "",
        hospital: formData?.hospital || "",
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Register form fields
        // username: Yup.string()
        //   .min(2, "Too Short!")
        //   .max(50, "Too Long!")
        //   .required("User field is required"),
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string()
          .trim()
          .max(50, "Maximum 50 characters are allowed")
          .email("Invalid email")
          .required("Email is required"),
        mobile: Yup.string()
          // .matches(phoneNumberReg, "Invalid phone number")
          .required("This field is required"),
        specialization: Yup.string().required("Specialization field is required"),
        nationalID: Yup.string().required("National ID is required"),
        licenseNo: Yup.string().required("License No. is required"),
        // rCode: Yup.string().required("This field is required"),
        country: Yup.string().required("Country is required"),
        // state: Yup.string().required("State is required"),
        // hospital: Yup.string().required("Hospital is required"),
        education: Yup.string().required("Education is required"),
      })}
      onSubmit={(values) => {
        console.log('values: ', values);
        onSubmit({ ...values })
      }
      }
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        setFieldTouched,
        handleSubmit,
        formikProps,
        dirty,
      }) => {
        const states = values.country
          ? State.getStatesOfCountry(values.country).map((state) => ({
            value: state.isoCode,
            label: state.name,
          }))
          : [];
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
                    <h6 className="mb-2">Healthcare Provider Registration</h6>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <FormGroup>
                        <Label>
                          <span className="requiredLabel">*</span>Full Name
                        </Label>
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
                        <Label>
                          <span className="requiredLabel">*</span>Email ID
                        </Label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Enter Email ID"
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
                          <span className="requiredLabel">*</span>Mobile
                        </Label>
                        <div className="input-group">
                          <Field
                            type="text"
                            // className="form-control"
                            name="mobile"
                            placeholder="e.g.123-4567-8901"
                            // onKeyPress={(e) => allowedNumbersOnField(10, e)}
                            aria-describedby="basic-addon1"
                            component={PhoneNumberCodeAndFlag}
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
                          <span className="requiredLabel">*</span>Highest Grade of Education
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
                        />
                        <ErrorMessage
                          name="education"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          <span className="requiredLabel">*</span>State of Practice
                        </Label>
                        <Select
                          options={stateOfPractice}
                          name="specialization"
                          className="inputSelect"
                          value={educationOptions.find(
                            (option) => option.value === values.specialization
                          )}
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "specialization",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                        />
                        <ErrorMessage
                          name="specialization"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          <span className="requiredLabel">*</span>National Provider Identification
                        </Label>
                        <Field
                          type="text"
                          name="nationalID"
                          placeholder="Enter ID number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="nationalID"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          <span className="requiredLabel">*</span>Medical License Number
                        </Label>
                        <Field
                          type="text"
                          name="licenseNo"
                          placeholder="Enter Medical License number"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="licenseNo"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          <span className="requiredLabel">*</span>Country
                        </Label>
                        <Select
                          name="country"
                          className="inputSelect"
                          value={countries.find(
                            (option) => option.value === values.country
                          )}
                          options={countries}
                          onChange={(option) => {
                            setFieldValue("country", option.value);
                            setFieldValue("state", ""); // Reset state value when country changes
                          }}
                        />
                        <ErrorMessage
                          name="country"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          {/* <span className="requiredLabel">*</span> */}
                          State
                        </Label>
                        <Select
                          name="state"
                          placeholder="Select"
                          className="inputSelect"
                          options={states}
                          onChange={(option) => setFieldValue("state", option.value)}
                          value={states.find((option) => option.value === values.state)}
                          isDisabled={!values.country}
                        />
                        <ErrorMessage
                          name="state"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          {/* <span className="requiredLabel">*</span> */}
                          Name of the Hospital
                        </Label>
                        <Select
                          options={hospitalsOptions}
                          name="hospital"
                          className="inputSelect"
                          value={hospitalsOptions.find(
                            (option) => option.value === values.hospital
                          )}
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "hospital",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                        />
                        <ErrorMessage
                          name="hospital"
                          component={"div"}
                          className="text-danger"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          Referral Code
                        </Label>
                        <Field
                          type="text"
                          name="rCode"
                          placeholder="Enter Referral"
                          className="form-control"
                        />
                        {/* <ErrorMessage
                          name="rCode"
                          component={"div"}
                          className="text-danger"
                        /> */}
                      </FormGroup>
                    </div>
                    <div className="al_login_footer mt-3">
                      <div className="d-flex">
                        <button
                          type="button"
                          style={{ width: "50px" }}
                          className="al_login_button_back me-3 d-flex align-items-center justify-content-center"
                          onClick={() => navigate('/registration-info')}
                        >
                          <i className="icon_alfred_back-arrow"></i>
                        </button>
                        <button
                          type="submit"
                          className="al_login_button"
                        >
                          Continue
                        </button>
                      </div>
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
          </Form >
        );
      }}
    </Formik >
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

  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    let data = {
      email: values?.email,
      username: values?.username,
      mobile: values?.mobile,
    };
    resendOtp(data);
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
    // dispatch(getRegisterResponseData({ actionType: updatedActionType, actionData: values, isTerm }));

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

  return (
    <div className="al_login_container">
      {isLoading && <Loading />}

      {activeForm === 1 ? (
        <FirstFormPhysicain onSubmit={handleFirstFormSubmit} />
      ) : activeForm === 2 ? (
        <OTPForm activeForm={activeForm} setActiveForm={setActiveForm} otpResponse={otpResponse} setOtpResponse={setOtpResponse} formData={formData} setFormData={setFormData} />
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
            handleThirdFormSubmit(values);
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
                              Password must contain 8 characters, including one
                              uppercase letter, one lowercase letter, one
                              number, and one special character
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
                                  setFieldValue(
                                    "reenterpassword",
                                    trimmedValue
                                  );
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
        <SubscriptionForm formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
}
