import React from "react";
import { Country, State } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import * as Yup from "yup";
import { customContentValidation, getAuthRoute, getEductaionOptions, getRegForm } from "../../../_mock/helperIndex";
import { getRegistrationOtpRequest, setActiveRegistrationForm, setAuthRoutes, setPersistActionData } from "../../../store/SessionStore/slice";
import { getMobileValidationLengthByCountryCodeRequest } from "../../../store/UtilityCallFunction/slice";
import { Terms } from "./Terms&Confition";

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

export const DoctorRegister = () => {
    const dispatch = useDispatch();
    const educationOptions = getEductaionOptions;

    const { regFormData } = useSelector((state) => (state?.sessionStoreSlice));
    const { mobileFieldValidation } = useSelector((state) => (state?.utilityCallFunctionSlice));

    const countriesOptions = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));

    const countryChangeHanlde = (e, setFieldValue) => {
        setFieldValue("country", e.value);
        setFieldValue("state", "");
        setFieldValue("stateOptions", "")
        let stateBasedOnCountry = State.getStatesOfCountry(e.value)?.length === 0 ? [{ isoCode: "none", name: "none" }] : State.getStatesOfCountry(e.value)
        const states = stateBasedOnCountry?.map((state) => ({
            value: state.isoCode,
            label: state.name,
        }));
        setFieldValue("stateOptions", states)
    }

    const handleSubmit = (values, activeForm) => {
        if (values)
            dispatch(getRegistrationOtpRequest({ values, activeForm }));
        else
            dispatch(setActiveRegistrationForm(activeForm))
    }

    let backToSignInHandle = () => {
        dispatch(setActiveRegistrationForm(""))
        dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    }

    const handleMobileChange = async (value, country, setFieldValue) => {
        setFieldValue('mobile', value);
        let mobileNumberWithoutCountryCode = value?.replace(country?.dialCode, "")?.length;
        await setFieldValue('mobileValueLengthWithoutCountryCode', mobileNumberWithoutCountryCode)
        dispatch(getMobileValidationLengthByCountryCodeRequest(country))
    };

    const regFormResetHandle = () => {
        dispatch(setPersistActionData(""))
    }

    const getInitialValues = {
        username: regFormData?.username || "",
        email: regFormData?.email || "",
        mobile: regFormData?.mobile || "",
        education: regFormData?.education || "",
        specialization: regFormData?.specialization || "",
        nationalID: regFormData?.nationalID || "",
        licenseNo: regFormData?.licenseNo || "",
        rCode: regFormData?.rCode || "",
        country: regFormData?.rtype || "",
        state: regFormData?.state || "",
        hospital: regFormData?.hospital || "",
        stateOptions: "",
        mobileValueLengthWithoutCountryCode: null
    }

    const validationSchema = Yup.object().shape({
        // Define validation rules for Patient Registation fields
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string()
            .trim()
            .max(50, "Maximum 50 characters are allowed")
            .email("Invalid email")
            .required("Email is required"),
        mobile: Yup.string()
            // .matches(phoneNumberReg, "Invalid phone number")
            .required("This field is required"),
        education: Yup.string().required("Education field is required"),
        specialization: Yup.string().required("Specialization field is required"),
        nationalID: Yup.string().required("National ID is required"),
        licenseNo: Yup.string().required("License No. is required"),
        // rCode: Yup.string().required("This field is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        // city: Yup.string().required("City is required"),
        // hospital: Yup.string().required("Hospital name is required"),
    });
    return (
        <React.Fragment>
            <Formik
                initialValues={getInitialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("Submit=>", values)
                    handleSubmit(values, getRegForm.OTPFORM)
                }}
            >{({ values, errors, setFieldValue, setFieldTouched, touched }) => (
                <>
                    <Form className="wflexLayout" >
                        <div className="wflexLayout al_mx-auto">
                            <div className="wflex-items-center wflexLayout">
                                {console.log("989798979879879", errors)}
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
                                            <span className="requiredLabel">*</span>Mobile
                                        </Label>
                                        {/* <div className="input-group">
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
                                        /> */}
                                        <div className="input-group">
                                            <PhoneInput
                                                country={'us'}
                                                value={values.mobile}
                                                onChange={(value, country) => handleMobileChange(value, country, setFieldValue)}
                                                inputProps={{
                                                    onBlur: () => { setFieldTouched('mobile', true) }
                                                }}
                                            />
                                            {touched.mobile && values?.mobile === "" ? <div className="text-danger">{"Mobile number is required"}</div> :
                                                values?.mobileValueLengthWithoutCountryCode !== null && mobileFieldValidation && values?.mobileValueLengthWithoutCountryCode !== mobileFieldValidation ?
                                                    <div className="text-danger">{`Allow only ${mobileFieldValidation} numbers`}</div> : ""
                                            }
                                        </div>
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
                                            menuPlacement="top"
                                            value={values.education && educationOptions?.find(
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
                                        <Label>
                                            <span className="requiredLabel">*</span>State of Practice
                                        </Label>
                                        <Select
                                            options={stateOfPractice}
                                            name="specialization"
                                            className="inputSelect"
                                            value={values.specialization && educationOptions?.find(
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
                                            value={values.country && countriesOptions?.find(
                                                (option) => option.value === values.country
                                            )}
                                            options={countriesOptions}
                                            onChange={(option) => countryChangeHanlde(option, setFieldValue)}
                                        />
                                        <ErrorMessage
                                            name="country"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>
                                            <span className="requiredLabel">*</span>
                                            State
                                        </Label>
                                        <Select
                                            name="state"
                                            placeholder="Select"
                                            className="inputSelect"
                                            options={values?.stateOptions || []}
                                            onChange={(option) => setFieldValue("state", option.value)}
                                            value={(values?.stateOptions && values?.stateOptions?.find((option) => option.value === values.state)) || ""}
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
                                            value={values?.hospital && hospitalsOptions?.find(
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
                                    </FormGroup>
                                </div>
                                <div className="al_login_footer mt-3">
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            style={{ width: "50px" }}
                                            className="al_login_button_back me-3 mb-0 d-flex align-items-center justify-content-center"
                                            onClick={() => handleSubmit(null, getRegForm.REGTYPESELECTION)}
                                        >
                                            <i className="icon_alfred_back-arrow"></i>
                                        </button>
                                        <button
                                            type="reset"
                                            className="al_grey_borderbtn me-3"
                                            style={{ minWidth: "max-content" }}
                                            onClick={regFormResetHandle}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="al_login_button"
                                            disabled={values?.mobile === "" || (values?.mobileValueLengthWithoutCountryCode !== null && values?.mobileValueLengthWithoutCountryCode !== mobileFieldValidation)}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="al_login_button_back mt-3"
                                    >
                                        <Link to="/signin" onClick={backToSignInHandle}>
                                            Back to <strong>Sign in</strong>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {values?.isTermsAndConditionClick && <Terms props={{ values, setFieldValue, errors }} />}
                    </Form>
                </>
            )
                }

            </Formik >
        </React.Fragment >
    )
}