import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Col, FormGroup, Label, Row, UncontrolledTooltip } from "reactstrap";
import * as Yup from "yup";
import { allowedNumbersOnField, customContentValidation, getActionTypes, getEductaionOptions, getGenderoptions, getResidenceoptions, getRole, pageTitle } from "../../../_mock/helperIndex";
import alferdlogomobile from "../../../images/alfredlogo.svg";
import alferdlogo from "../../../images/alfredlogowhite.svg";
import { getRegisterClear, getRegisterResponseData } from "../../../store/PatientRegisterFlow/slice";
import Loading from "../../InnerApp/LoadingComponent";
import { PhoneNumberCodeAndFlag } from "../../Utilities/PhoneNumberCodeAndFlag";

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

const PatientAndDoctorRegistration = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isTermsAndConditionsRead, serIsTermsAndConditionsRead] = useState(true);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [initialValues, setInitialValues] = useState("");
    const [validationSchema, setValidationSchema] = useState(Yup.object().shape({}));

    const genderoptions = getGenderoptions;
    const residenceoptions = getResidenceoptions;
    const educationOptions = getEductaionOptions;

    const { isLoading, activeForm, flowForm, actionData, actionType } = useSelector((state) => state.patientRegisterSlice);

    let doctorValidationSchema = Yup.object().shape({
        // Define validation rules for Doctor Registation fields
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
        // state: Yup.string().required("State is required"),
        // city: Yup.string().required("City is required"),
        hospital: Yup.string().required("Hospital name is required"),
    });

    let patientValidationSchema = Yup.object().shape({
        // Define validation rules for Patient Registation fields
        username: customContentValidation('Full name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string().trim().max(50, "Maximum 50 characters are allowed").email("Invalid email").required("Email is required"),
        mobile: Yup.string().required("Mobile number is required"),
        dob: Yup.date().max(new Date(Date.now() - 567648000000), "Your age must be at-least 18 years old")
            .min(new Date(Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000), "Your age must be below 120 years old")
            .required("DOB is required").nullable(),
        gender: Yup.string().required("Gender is required"),
        rtype: Yup.string().required("Resident type is required"),
        education: Yup.string().required("Education field is required"),
        ssn: customContentValidation('', { patternType: 'number', message: 'number' }, 9, 9),
    });

    useEffect(() => {
        if (flowForm === getRole.PATIENT) {
            pageTitle("Register | Patient")
            setInitialValues({
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
            });
            setValidationSchema(patientValidationSchema)
        }
        if (flowForm === getRole.PHYSICIAN) {
            pageTitle("Register | Doctor")
            setInitialValues(({
                username: actionData?.username || "",
                email: actionData?.email || "",
                mobile: actionData?.mobile || "",
                education: actionData?.education || "",
                specialization: actionData?.specialization || "",
                nationalID: actionData?.nationalID || "",
                licenseNo: actionData?.licenseNo || "",
                rCode: actionData?.rCode || "",
                country: actionData?.rtype || "",
                state: actionData?.state || "",
                hospital: actionData?.hospital || "",
            }));
            setValidationSchema(doctorValidationSchema)
        }
        return () => {
            setInitialValues("")
            setValidationSchema(Yup.object().shape({}))
        }
    }, [flowForm]);

    useEffect(() => {
        if (activeForm) {
            navigate(activeForm)
        }
    }, [activeForm]);

    const handleFirstFormSubmit = (values, isTerm = false) => {
        let updatedActionType = isTerm ? actionType : getActionTypes.SELECT
        dispatch(getRegisterResponseData({ actionType: updatedActionType, actionData: values, isTerm }));
        window.sessionStorage.setItem("actionData", JSON.stringify(values));
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

    return (
        <React.Fragment>
            <div className="al_login_container">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleFirstFormSubmit(values)
                    }}
                >{({ values, setFieldValue, setFieldTouched, errors }) => (
                    <>
                        <Form className="wflexLayout">
                            {isLoading && <Loading />}
                            {console.log("88888888888888888888", values, errors)}
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
                                                    {flowForm === getRole.PATIENT && <>
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
                                                    </>}

                                                    {flowForm === getRole.PHYSICIAN && <>
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
                                                        </FormGroup>

                                                    </>}

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
                                                            disabled={flowForm === getRole.PATIENT && !values?.termsAndConditions}
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
                    </>
                )}

                </Formik>
            </div>
        </React.Fragment >
    )
}
export default PatientAndDoctorRegistration;