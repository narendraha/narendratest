import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { customContentValidation, getAuthRoute, getGenderoptions, getRegForm } from "../../../_mock/helperIndex";
import { getRegistrationOtpRequest, setActiveRegistrationForm, setAuthRoutes, setPersistActionData } from "../../../store/SessionStore/slice";
import { getMobileValidationLengthByCountryCodeRequest } from "../../../store/UtilityCallFunction/slice";
import { Terms } from "./Terms&Confition";

export const PatientRegister = () => {
    const dispatch = useDispatch();
    const genderoptions = getGenderoptions;

    const { regFormData } = useSelector((state) => (state?.sessionStoreSlice));
    const { mobileFieldValidation } = useSelector((state) => (state?.utilityCallFunctionSlice));

    const handleSubmit = (values, activeForm) => {
        if (values)
            dispatch(getRegistrationOtpRequest({ values, activeForm }));
        else
            dispatch(setActiveRegistrationForm(activeForm))
    }

    const handleMobileChange = async (value, country, setFieldValue) => {
        setFieldValue('mobile', value);
        setFieldValue('countryCode', country?.countryCode)
        let mobileNumberWithoutCountryCode = value?.replace(country?.dialCode, "")?.length;
        await setFieldValue('mobileValueLengthWithoutCountryCode', mobileNumberWithoutCountryCode)
        await setFieldValue('nationality', country?.name)
        dispatch(getMobileValidationLengthByCountryCodeRequest(country))
    };

    let backToSignInHandle = () => {
        dispatch(setActiveRegistrationForm(""))
        dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    }

    const regFormResetHandle = () => {
        dispatch(setPersistActionData(""))
    }

    const getInitialValues = {
        firstName: regFormData?.firstName || "",
        lastName: regFormData?.lastName || "",
        email: regFormData?.email || "",
        dob: (regFormData?.dob && new Date(regFormData?.dob)) || "",
        gender: regFormData?.gender || "",
        mobile: regFormData?.mobile || "",
        rtype: regFormData?.rtype || "",
        education: regFormData?.education || "",
        ssn: regFormData?.ssn || "",
        insuranceurl: regFormData?.insuranceurl || "",
        file: regFormData?.file || null,
        termsAndConditions: regFormData?.termsAndConditions || false,
        isTermsAndConditionClick: false,
        mobileValueLengthWithoutCountryCode: null,
        nationality: "",
        countryCode: 'us',
    }

    const validationSchema = Yup.object().shape({
        // Define validation rules for Patient Registation fields
        firstName: customContentValidation('First name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        lastName: customContentValidation('Last name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string().trim().max(50, "Maximum 50 characters are allowed").email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile number is required"),
        dob: Yup.date().max(new Date(Date.now() - 567648000000), "Your age must be at-least 18 years old")
            .min(new Date(Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000), "Your age must be below 120 years old")
            .required("DOB is required").nullable(),
        gender: Yup.string().required("Gender is required"),
        // rtype: Yup.string().required("Resident type is required"),
        // education: Yup.string().required("Education field is required"),
        // ssn: customContentValidation('', { patternType: 'number', message: 'number' }, 9, 9),
        termsAndConditions: Yup.boolean().oneOf([true], 'Please Accept our Terms & Conditions')
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
                                <h6 className="mb-2">Personal Details</h6>
                                <div className="al_login-form al_registrationform wflexScroll">
                                    <Row className="mx-0">
                                        <Col lg="6" md="12" className="ps-0">
                                            <FormGroup>
                                                <Label>
                                                    <span className="requiredLabel">*</span>First Name
                                                </Label>
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="e.g.John"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6" md="12" className="pe-0">
                                            <FormGroup>
                                                <Label>
                                                    <span className="requiredLabel">*</span>Last Name
                                                </Label>
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="e.g. Doe"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="lastName"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
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
                                        <div className="input-group">
                                            <PhoneInput
                                                country={values?.countryCode}
                                                value={values.mobile}
                                                onChange={(value, country) => handleMobileChange(value, country, setFieldValue)}
                                                inputProps={{
                                                    onBlur: () => { setFieldTouched('mobile', true) }
                                                }}
                                            />
                                        </div>
                                        {touched.mobile && values?.mobile === "" ? <div className="text-danger">{"Mobile number is required"}</div> :
                                            values?.mobileValueLengthWithoutCountryCode !== null && mobileFieldValidation && values?.mobileValueLengthWithoutCountryCode !== mobileFieldValidation ?
                                                <div className="text-danger">{`Allow only ${mobileFieldValidation} numbers`}</div> : ""
                                        }
                                    </FormGroup>
                                    {/* <FormGroup>
                                        <Label>
                                            <span className="requiredLabel">*</span>Highest
                                            Education
                                        </Label>
                                        <Select
                                            options={educationOptions}
                                            name="education"
                                            className="inputSelect"
                                            menuPlacement="top"
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
                                    </FormGroup> */}
                                    <FormGroup>
                                        <Label>
                                            <span className="requiredLabel">*</span>Date of
                                            Birth
                                        </Label>
                                        <DatePicker
                                            className={'form-control ' + (values?.dob ? '' : 'al_calendarIcon')}
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
                                            selected={values.dob || null}
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
                                            isClearable={true}
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
                                            value={values?.gender && genderoptions.find(
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
                                    {/* <FormGroup>
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
                                       <div className="al_fileuplod-note">* jpg, jpeg, png File only</div>
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </FormGroup> */}
                                    <Label>
                                        <span>I agree to the </span>
                                        <span className="al_text_link"
                                            onClick={() => setFieldValue('isTermsAndConditionClick', true)}
                                        >
                                            Terms and conditions
                                        </span>
                                    </Label>
                                    <div className="text-danger">{errors && errors?.termsAndConditions}</div>
                                </div>
                                <div className="al_login_footer mt-3">
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            style={{ width: "45px", minWidth: "45px" }}
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
