import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Col,
  FormGroup,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import * as Yup from "yup";
import { allowedNumbersOnField, customContentValidation, getActionTypes, getEductaionOptions, getGenderoptions, getResidenceoptions, pageTitle } from "../../../_mock/helperIndex";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import { getRegisterClear, getRegisterResponseData } from "../../../store/PatientRegisterFlow/slice";
import Loading from "../../InnerApp/LoadingComponent";
import { PhoneNumberCodeAndFlag } from "../../Utilities/PhoneNumberCodeAndFlag";

export default function RegisterInfo() {
  pageTitle("Register | Patient")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, activeForm, actionData, actionType } = useSelector((state) => state.patientRegisterSlice)
  const [isTermsAndConditionsRead, serIsTermsAndConditionsRead] = useState(true);
  const genderoptions = getGenderoptions;
  const residenceoptions = getResidenceoptions;
  const educationOptions = getEductaionOptions;
  useEffect(() => {
    console.log('activeForm: ', activeForm);

    if (activeForm) {
      navigate(activeForm)
    }
  }, [activeForm])
  const handleFirstFormSubmit = (values, isTerm = false) => {
    let updatedActionType = isTerm ? actionType : getActionTypes.SELECT
    dispatch(getRegisterResponseData({ actionType: updatedActionType, actionData: values, isTerm }));
    window.sessionStorage.setItem("actionData", JSON.stringify(values));
  };
  const FirstForm = ({ onSubmit }) => (
    <Formik
      enableReinitialize
      initialValues={{
        username: actionData?.username || "",
        email: actionData?.email || "",
        dob: actionData?.dob || "",
        gender: actionData?.gender || "",
        mobile: actionData?.mobile || "",
        rtype: actionData?.rtype || "",
        education: actionData?.education || "",
        ssn: actionData?.ssn || "",
        insuranceurl: actionData?.insuranceurl || "",
        file: actionData?.file || null,
        termsAndConditions: actionData?.termsAndConditions || false,
        countryCode: ""
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Register form fields
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string()
          .trim()
          .max(50, "Maximum 50 characters are allowed")
          .email("Invalid email")
          .required("Email is required"),
        mobile: Yup.string()
          // .matches(phoneNumberReg, "Invalid phone number")
          .required("Mobile number is required"),
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
        ssn: customContentValidation('', { patternType: 'number', message: 'number' }, 9, 9)
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
        dirty,
      }) => {
        return (
          <Form className="wflexLayout">
            {console.log("errorserrors", errors)}
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
                <div className="wflexLayout al_mx-auto">
                  <div className="wflex-items-center wflexLayout">
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
                            <span className="requiredLabel">*</span>Date of
                            Birth
                          </Label>
                          <DatePicker
                            className="form-control al_calendarIcon"
                            name="dob"
                            placeholderText="e.g.MM/DD/YYYY"
                            popperPlacement="auto"
                            popperModifiers={[
                              {
                                flip: {
                                  behavior: ["bottom"],
                                },
                                preventOverflow: {
                                  enabled: false,
                                },
                              },
                            ]}
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
                            <Field
                              type="text"
                              name="mobile"
                              placeholder="e.g.123-4567-8901"
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
                            <span className="requiredLabel">*</span>Residence
                            Type
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
                            <span className="requiredLabel">*</span>Highest
                            Education
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
                            onKeyPress={(e) => allowedNumbersOnField(9, e)}
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
                              setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <div>
                            {values.file
                              ? values.file.name
                              : "No file selected"}
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

                        <Label check className="d-flex align-items-center">
                          <div id="terms" style={{ lineHeight: 0 }}>
                            <input
                              name="termsAndConditions"
                              type="checkbox"
                              defaultChecked={values?.termsAndConditions}
                              value={values?.termsAndConditions}
                              disabled={isTermsAndConditionsRead}
                              onChange={(e) => {
                                setFieldValue(
                                  "termsAndConditions",
                                  e.target.checked
                                );
                              }}
                            />
                          </div>
                          &nbsp; I agree to the&nbsp;
                          <Link
                            to="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              handleFirstFormSubmit(values, true)
                              serIsTermsAndConditionsRead(false);
                            }}
                          >
                            terms and conditions
                          </Link>
                          {isTermsAndConditionsRead && (
                            <UncontrolledTooltip
                              color="primary"
                              placement="right"
                              target="terms"
                            >
                              Please read the Terms and Conditions to enable
                              this option
                            </UncontrolledTooltip>
                          )}
                        </Label>
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
                            disabled={!values?.termsAndConditions}
                          >
                            Continue
                          </button>
                        </div>
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

  return (
    <div className="al_login_container">
      <FirstForm onSubmit={handleFirstFormSubmit} />
    </div>
  );
}
