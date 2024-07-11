import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { allowsOnlyNumeric, allowsOnlyNumericOnly2Digit, allowsOnlyNumericOnly4Digit, allowsOnlyNumericOnlysingleDigit, phoneNumberReg } from "../../../_mock/RegularExp";
import { allowedNumbersOnField, customContentValidation, getActionTypes, getEductaionOptions, getGenderoptions, getResidenceoptions } from '../../../_mock/helperIndex';
import { profileDetailsAndProfileImageUpdateRequest, setActionTypeAndActionData } from '../../../store/Profile/slice';
import Loading from '../LoadingComponent';
import { setConfirmationOpen } from "../../../store/UtilityCallFunction/slice";

const genderoptions = getGenderoptions;
const residenceoptions = getResidenceoptions;
const educationOptions = getEductaionOptions;
const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "A Unknown", label: "A Unknown" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "B Unknown", label: "B Unknown" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "AB Unknown", label: "AB Unknown" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "O Unknown", label: "O Unknown" },
    { value: "Unknown", label: "Unknown" },
];

export const ProfileEditAction = () => {
    const dispatch = useDispatch();

    const { getProfileDetails, profilePicture, uploadedProfileImage, isLoading } = useSelector((state) => state?.profileSlice);

    const handleSubmit = (data) => {
        dispatch(profileDetailsAndProfileImageUpdateRequest(data))
    }

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <Formik
                enableReinitialize
                initialValues={{
                    username: getProfileDetails?.username !== "NA" ? getProfileDetails?.username : "",
                    email: getProfileDetails?.email !== "NA" ? getProfileDetails?.email : "",
                    dob:
                        getProfileDetails?.dob !== "NA"
                            ? getProfileDetails?.dob
                            : new Date(),
                    // gender: getProfileDetails?.gender !== "NA" ? getProfileDetails?.gender : "",
                    gender: getProfileDetails?.gender !== "NA" ? getProfileDetails?.gender : "",
                    mobile: getProfileDetails?.mobile !== "NA" ? getProfileDetails?.mobile : "",
                    rtype: getProfileDetails?.rtype !== "NA" ? getProfileDetails?.rtype : "",
                    education: getProfileDetails?.education !== "NA" ? getProfileDetails?.education : "",
                    ssn: getProfileDetails?.ssn !== "NA" ? getProfileDetails?.ssn : "",
                    feet: getProfileDetails?.feet !== "NA" ? getProfileDetails?.feet : '',
                    inch: getProfileDetails?.inch !== "NA" ? getProfileDetails?.inch : '',
                    weight: getProfileDetails?.weight !== "NA" ? getProfileDetails?.weight : "",
                    // age: getProfileDetails?.age || "",
                    bloodtype: getProfileDetails?.bloodtype !== "NA" ? getProfileDetails?.bloodtype : "",
                    nationality: getProfileDetails?.nationality !== "NA" ? getProfileDetails?.nationality : "",
                    profile_url: profilePicture || ""
                }}
                validationSchema={Yup.object().shape({
                    // username: Yup.string()
                    //     .min(2, "Too Short!")
                    //     .max(50, "Too Long!")
                    //     .required("Name is required"),
                    // email: Yup.string()
                    //   .email("Invalid email")
                    //   .required("This field is required"),
                    username: customContentValidation('Full Name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
                    mobile: Yup.string()
                        .matches(phoneNumberReg, "Invalid phone number")
                        .required("Mobile number is required"),
                    dob: Yup.date()
                        .max(
                            new Date(Date.now() - 567648000000),
                            "You must be at least 18 years old"
                        )
                        .min(
                            new Date(
                                Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000
                            ),
                            "You must be below 120 years old"
                        )
                        .required("Required"),
                    gender: Yup.string().required("This field is required"),
                    bloodtype: Yup.string().required(
                        "Blood Type is required"
                    ),
                    rtype: Yup.string().required("This field is required"),
                    education: Yup.string().required(
                        "Education is required"
                    ),
                    ssn: customContentValidation('', { patternType: 'number', message: 'number' }, 9),
                    feet: Yup.string()
                        .test(
                            'is-greater-than-one',
                            'Height must be greater than 1',
                            value => value && parseFloat(value) >= 1
                        )
                        .min(1, "Too Short!") // Minimum length of 1 character
                        .max(3, "Max 3 characters are  Long!")  // Maximum length of 3 characters
                        .required("Height is required"),
                    weight: Yup.number()
                        .min(22, "Weight must be at least 22 lbs")
                        .max(1400, "Weight is too high!")
                        .required("Weight is required"),
                    // age: Yup.string()
                    //   .min(1, "Too Short!")
                    //   .max(3, "Too Long!")
                    //   .required("This field is required"),
                })}
                onSubmit={(values) => {
                    // Handle form submission here
                    let data = {
                        ...values,
                        dob: moment(values.dob).format("YYYY-MM-DD"),
                        nationality: "United State"
                    };
                    dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, actionData: data, callApi: handleSubmit }))
                    // dispatch(setActionTypeAndActionData({ actionType: getActionTypes.EDIT, actionData: data, isConfirmModel: true }))
                }}
            >
                {({
                    values,
                    setFieldValue,
                    errors,
                    touched,
                    setFieldTouched,
                    dirty
                }) => {
                    return (
                        <>
                            <Form>
                                <Row>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Height (ft)
                                            </Label>
                                            <div className="d-flex gap-2">
                                                <div>
                                                    <Field
                                                        type="text"
                                                        name="feet"
                                                        placeholder="e.g.9"
                                                        className="form-control"
                                                        onKeyPress={(e) =>
                                                            allowsOnlyNumericOnlysingleDigit(e)
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="feet"
                                                        component={"div"}
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="mt-2"></div>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        name="inch"
                                                        placeholder="e.g.0"
                                                        className="form-control"
                                                        onKeyPress={(e) =>
                                                            allowsOnlyNumericOnly2Digit(e)
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="inch"
                                                        component={"div"}
                                                        className="text-danger"
                                                    />
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Weight (lbs)
                                            </Label>
                                            <Field
                                                type="text"
                                                name="weight"
                                                placeholder="e.g. 40"
                                                className="form-control"
                                                onKeyPress={(e) =>
                                                    allowsOnlyNumericOnly4Digit(e)
                                                }
                                            />
                                            <ErrorMessage
                                                name="weight"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Blood Type
                                            </Label>
                                            <Select
                                                className="inputSelect"
                                                options={bloodTypes}
                                                name="bloodtype"
                                                value={bloodTypes?.find(
                                                    (option) =>
                                                        option.value === values?.bloodtype
                                                )}
                                                onChange={(selectedOption) =>
                                                    setFieldValue(
                                                        "bloodtype",
                                                        selectedOption?.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFieldTouched("bloodtype", true)
                                                }
                                            />
                                            <ErrorMessage
                                                name="bloodtype"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>Full
                                                Name
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
                                    </Col>
                                    {/* <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>Age
                                  </Label>
                                  <Field
                                    type="text"
                                    name="age"
                                    placeholder="Enter Age"
                                    className="form-control"
                                    onKeyPress={(e) => allowsOnlyNumeric(e)}
                                  />
                                  <ErrorMessage
                                    name="age"
                                    component={"div"}
                                    className="text-danger"
                                  />
                                </FormGroup>
                              </Col> */}
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Gender
                                            </Label>
                                            <Select
                                                options={genderoptions}
                                                name="gender"
                                                value={genderoptions?.find(
                                                    (option) =>
                                                        option.value === values?.gender
                                                )}
                                                onChange={(selectedOption) =>
                                                    setFieldValue(
                                                        "gender",
                                                        selectedOption?.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFieldTouched("gender", true)
                                                }
                                                className="inputSelect"
                                            />
                                            <ErrorMessage
                                                name="gender"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>Date
                                                of Birth
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
                                                selected={
                                                    values?.dob
                                                        ? new Date(values?.dob)
                                                        : values?.dob == "NA"
                                                            ? new Date()
                                                            : new Date()
                                                }
                                                onChange={(e) => {
                                                    setFieldValue("dob", e);
                                                }}
                                                dateFormat={"yyyy/MM/dd"}
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
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Mobile
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
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                SSN
                                            </Label>
                                            <Field
                                                type="text"
                                                name="ssn"
                                                placeholder="e.g.xxx-xxx-xxx"
                                                className="form-control"
                                                onKeyPress={(e) => allowsOnlyNumeric(e)}
                                            />
                                            <ErrorMessage
                                                name="ssn"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Resident Type
                                            </Label>
                                            <Select
                                                className="inputSelect"
                                                options={residenceoptions}
                                                name="rtype"
                                                value={residenceoptions?.find(
                                                    (option) => option.value === values?.rtype
                                                )}
                                                onChange={(selectedOption) =>
                                                    setFieldValue(
                                                        "rtype",
                                                        selectedOption?.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    setFieldTouched("rtype", true)
                                                }
                                            />
                                            <ErrorMessage
                                                name="rtype"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Highest Education
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
                                    </Col>
                                    {/* <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Email
                                  </Label>
                                  <Field
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="form-control"
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component={"div"}
                                    className="text-danger"
                                  />
                                </FormGroup>
                              </Col> */}
                                    <Col md="8" sm="12">
                                        <FormGroup>
                                            <Label>Name of Insurance Provider</Label>
                                            <Field
                                                type="text"
                                                name="insurance_provider"
                                                placeholder="Enter Name of Insurance Provider"
                                                className="form-control"
                                                disabled={true}
                                            />
                                            <ErrorMessage
                                                name="insurance_provider"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6" sm="12">
                                        <FormGroup>
                                            <Label>Insurance Policy / Card Number</Label>
                                            <Field
                                                type="text"
                                                name="insurance_policy_no"
                                                placeholder="Enter Insurance Policy / Card Number"
                                                className="form-control"
                                                disabled={true}
                                            />
                                            <ErrorMessage
                                                name="insurance_policy_no"
                                                component={"div"}
                                                className="text-danger"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="mt-3">
                                    <button type="submit" disabled={uploadedProfileImage && uploadedProfileImage?.file !== "" ? false : !dirty} className="al_savebtn">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="al_cancelbgbutton mx-3"
                                        onClick={() => {
                                            dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </React.Fragment>
    )
}
