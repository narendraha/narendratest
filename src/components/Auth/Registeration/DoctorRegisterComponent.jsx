import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import Loading from "../../InnerApp/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { getRegisterClear, getRegisterResponseData } from "../../../store/PatientRegisterFlow/slice";
import { pageTitle, getEductaionOptions, customContentValidation, allowedNumbersOnField, getActionTypes } from "../../../_mock/helperIndex";

export default function Register() {
  pageTitle("Register | Doctor")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const educationOptions = getEductaionOptions;
  const [formData, setFormData] = useState(null);
  const {isLoading, activeForm, actionData, flowForm} = useSelector((state)=>state.patientRegisterSlice)

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  useEffect(()=>{
    if(activeForm){
      navigate(activeForm)
     }
  }, [activeForm])
  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    dispatch(getRegisterResponseData({actionType: getActionTypes.SELECT,actionData: values, flowForm:flowForm}));
  };
  
  return (
    <div className="al_login_container">
    <Formik
      enableReinitialize
      initialValues={{
        username: formData?.username || actionData?.username || "",
        email: formData?.email || actionData?.email || "",
        mobile: formData?.mobile || actionData?.mobile || "",
        highest_grade: formData?.highest_grade || actionData?.highest_grade || "",
        state_of_practice: formData?.state_of_practice || actionData?.state_of_practice || "",
        national_provider_id: formData?.national_provider_id  || actionData?.national_provider_id|| "",
        medical_license_number: formData?.medical_license_number || actionData?.medical_license_number || "",
        referral_code: formData?.referral_code || actionData?.referral_code || "",
        country: formData?.country || actionData?.country || "",
        state: formData?.state || actionData?.state || "",
        city: formData?.city || actionData?.city || "",
        name_of_hospital: formData?.name_of_hospital || actionData?.name_of_hospital || "",
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Register form fields
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string()
          .trim()
          .max(50, "Maximum 50 characters are allowed")
          .email("Invalid email")
          .required("Email is required"),
        mobile: customContentValidation('Mobile Number is required', { patternType: 'number', message: 'number' }, 10, 10),
        highest_grade: Yup.string().required("Education is required"),
        state_of_practice: Yup.string().required("State of practice is required"),
        national_provider_id: customContentValidation('National ID is required', { patternType: 'number', message: 'number' }, 10, 10),
        medical_license_number: customContentValidation('License number is required', { patternType: 'number', message: 'number' }, 11, 11),
        // referral_code: Yup.string().required("This field is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        name_of_hospital: Yup.string().required("Hospital name is required"),
      })}
      onSubmit={(values) => {
        handleFirstFormSubmit(values)}
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
          const cities =
          values.country && values.state
            ? City?.getCitiesOfState(values.country, values.state).map(
                (state) => ({
                  value: (state.name).normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                  label: (state.name).normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                })
              )
            : [];
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
                            <span className="requiredLabel">*</span>Highest Grade of Education
                          </Label>
                          <Select
                            options={educationOptions}
                            name="highest_grade"
                            className="inputSelect"
                            value={educationOptions.find(
                              (option) => option.value === values.highest_grade
                            )}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "highest_grade",
                                selectedOption ? selectedOption.value : ""
                              );
                            }}
                          />
                          <ErrorMessage
                            name="highest_grade"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>State of Practice
                          </Label>
                          <Select
                            options={educationOptions}
                            name="state_of_practice"
                            className="inputSelect"
                            value={educationOptions.find(
                              (option) => option.value === values.state_of_practice
                            )}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "state_of_practice",
                                selectedOption ? selectedOption.value : ""
                              );
                            }}
                          />
                          <ErrorMessage
                            name="state_of_practice"
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
                            name="national_provider_id"
                            placeholder="Enter ID number"
                            className="form-control"
                            onKeyPress={(e) => allowedNumbersOnField(10, e)}
                          />
                          <ErrorMessage
                            name="national_provider_id"
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
                            name="medical_license_number"
                            placeholder="Enter Medical License number"
                            className="form-control"
                            onKeyPress={(e) => allowedNumbersOnField(11, e)}
                          />
                          <ErrorMessage
                            name="medical_license_number"
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
                            <span className="requiredLabel">*</span>State
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
                            <span className="requiredLabel">*</span>City
                          </Label>
                          <Select
                            name="city"
                            placeholder="Select"
                            className="inputSelect"
                            options={cities}
                            onChange={(option) => setFieldValue("city", option.value)}
                            value={cities.find((option) => option.value === values.city)}
                            isDisabled={!values.country && !values.state}
                          />
                          <ErrorMessage
                            name="city"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <span className="requiredLabel">*</span>Name of the Hospital
                          </Label>
                          <Select
                            options={educationOptions}
                            name="name_of_hospital"
                            className="inputSelect"
                            value={educationOptions.find(
                              (option) => option.value === values.name_of_hospital
                            )}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "name_of_hospital",
                                selectedOption ? selectedOption.value : ""
                              );
                            }}
                          />
                          <ErrorMessage
                            name="name_of_hospital"
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
                            name="referral_code"
                            placeholder="Enter Referral"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="referral_code"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                      </div>
                      <div className="al_login_footer mt-3">
                        <button
                          type="submit"
                          className="al_login_button"
                        >
                          Continue
                        </button>
                        <button
                          type="button"
                          className="al_login_button_back mt-3"
                          onClick={()=>dispatch(getRegisterClear())}
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
    </Formik>
    </div>
  );
}
