import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { customContentValidation, getActionTypes, getmobileLengthWithoutCO, loginRoles } from '../../../_mock/helperIndex';
import { addProfileImageRequest, profileDetailsAndProfileImageUpdateRequest } from '../../../store/Profile/slice';
import {
    getMobileValidationLengthByCountryCodeRequest,
    setActionTypeAndActionData,
    setConfirmationOpen
} from "../../../store/UtilityCallFunction/slice";

export const AdminProfileEditAction = () => {
    const dispatch = useDispatch();

    const uploadedProfileImage = useSelector((state) => state?.profileSlice?.uploadedProfileImage);

    let getProfileDetails = useSelector((state) => state?.utilityCallFunctionSlice?.getProfileDetails);
    let profilePicture = useSelector((state) => state?.utilityCallFunctionSlice?.profilePicture);
    let mobileFieldValidation = useSelector((state) => state?.utilityCallFunctionSlice?.mobileFieldValidation);

    useEffect(() => {
        if (mobileFieldValidation === null)
            mobileFieldValidation = getProfileDetails?.mobile_checks?.max_len
    }, [getProfileDetails, mobileFieldValidation]);

    const handleSubmit = (data) => {
        dispatch(profileDetailsAndProfileImageUpdateRequest({ data, isAdmin: getProfileDetails.role_id == loginRoles.ADMIN }))
    }

    const handleCancel = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
        dispatch(addProfileImageRequest(""))
    }

    const getMobileValueWithoutCountryCode = async (value, country, setFieldValue) => {
        let mobileNumberWithoutCountryCode = getmobileLengthWithoutCO(value, country)
        await setFieldValue('mobileValueLengthWithoutCountryCode', mobileNumberWithoutCountryCode)
        dispatch(getMobileValidationLengthByCountryCodeRequest(country))
    }

    const handleMobileChange = (value, country, setFieldValue) => {
        setFieldValue('mobile', value);
        setFieldValue('country', country?.countryCode)
        setFieldValue('nationality', country?.name)
        getMobileValueWithoutCountryCode(value, country, setFieldValue)
    }

    const fetChInitialValues = (key) => {
        return getProfileDetails?.[key] !== "NA" ? getProfileDetails?.[key] : ""
    }

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    username: fetChInitialValues("name"),
                    email: fetChInitialValues("email"),
                    mobile: fetChInitialValues("mobile"),
                    designation: fetChInitialValues("designation"),
                    nationality: fetChInitialValues("nationality"),
                    profile_url: profilePicture || "",
                    mobileValueLengthWithoutCountryCode: (getProfileDetails?.mobile_checks?.Dial_Code && getmobileLengthWithoutCO(getProfileDetails?.mobile, null, getProfileDetails?.mobile_checks?.Dial_Code)) || null,
                    country: getProfileDetails?.mobile_checks?.country_code || 'us',
                    dialCode: getProfileDetails?.mobile_checks?.Dial_Code,
                }}
                validationSchema={Yup.object().shape({
                    username: customContentValidation('Name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
                    designation: customContentValidation('Designation is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
                })}
                onSubmit={(values) => {
                    let data = {
                        name: values?.username || "",
                        email: values?.email || "",
                        mobile: values?.mobile,
                        designation: values?.designation || "",
                        nationality: values?.nationality
                    }
                    dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, actionData: data, callApi: handleSubmit }))
                }}
            >
                {({
                    values,
                    setFieldValue,
                    setFieldTouched,
                    dirty,
                    touched
                }) => {
                    return (
                        <>
                            <Form>
                                <Row>
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
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Mobile
                                            </Label>
                                            <div className="input-group">
                                                <PhoneInput
                                                    country={values?.country}
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
                                    </Col>
                                    <Col md="4" sm="12">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Designation
                                            </Label>
                                            <Field
                                                type="text"
                                                name="designation"
                                                placeholder="e.g.John Doe"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="designation"
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
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form >
                        </>
                    );
                }}
            </Formik>
        </React.Fragment >
    )
}
