import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { customContentValidation, getActionTypes, getmobileLengthWithoutCO } from "../../../_mock/helperIndex";
import { addOrUpdateAdminRequest } from "../../../store/AdminCreation/slice";
import {
    getMobileValidationLengthByCountryCodeRequest,
    setActionTypeAndActionData
} from "../../../store/UtilityCallFunction/slice";

export const AdminCreationAction = React.memo(() => {
    const dispatch = useDispatch();

    let { mobileFieldValidation, actionData, actionType } = useSelector((state) => (state?.utilityCallFunctionSlice));

    useEffect(() => {
        if (mobileFieldValidation === null)
            mobileFieldValidation = actionData?.mobile_checks?.max_len
    }, [actionData, mobileFieldValidation]);

    useEffect(() => {
        return () => {
            dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
        }
    }, [])

    const cancelHandle = () => {
        dispatch(setActionTypeAndActionData(getActionTypes.UNSELECT))
    }

    const getMobileValueWithoutCountryCode = async (value, country, setFieldValue) => {
        let mobileNumberWithoutCountryCode = getmobileLengthWithoutCO(value, country)
        await setFieldValue('mobileValueLengthWithoutCountryCode', mobileNumberWithoutCountryCode)
        dispatch(getMobileValidationLengthByCountryCodeRequest(country))
    }

    const handleMobileChange = (value, country, setFieldValue) => {
        setFieldValue('mobile', value);
        setFieldValue('country', country?.countryCode)
        getMobileValueWithoutCountryCode(value, country, setFieldValue)
    }

    let getInitialValues = {
        adminName: actionData?.name || "",
        email: actionData?.email || "",
        mobile: actionData?.mobile || "",
        designation: actionData?.designation || "",
        accountExp: actionData ? new Date(actionData?.expiry_date) : "",
        uniqueIDCode: actionData?.Unique_identification_code || "",
        mobileValueLengthWithoutCountryCode: (actionData?.mobile_checks?.Dial_Code && getmobileLengthWithoutCO(actionData?.mobile, null, actionData?.mobile_checks?.Dial_Code)) || null,
        country: actionData?.mobile_checks?.country_code || "us",
        dialCode: actionData?.mobile_checks?.Dial_Code || "",
        superadminEmail: actionData?.superadminEmail || ""
    }

    const getValidationSchema = Yup.object().shape({
        adminName: customContentValidation('Name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        email: Yup.string().trim().max(50, "Max 50 characters are allowed").email("please eneter a valid email address").required("Email-ID is required"),
        designation: customContentValidation('Designation is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
        accountExp: Yup.date().nullable().required("Account expiry date is required").min(new Date(new Date().setHours(0, 0, 0, 0)), "Account expired, please change the date to proceeds"),
        uniqueIDCode: Yup.lazy(() => {
            return actionType === getActionTypes.ADD
                ? Yup.string().required('Unique identity code is required').max(6, "max 6 charcates are allowed")
                : Yup.string().optional()
        }),
        superadminEmail: Yup.lazy(() => {
            return actionType === getActionTypes.ADD
                ? Yup.string().trim().max(50, "Max 50 characters are allowed").email("please eneter a valid email address").required("Email-ID is required")
                : Yup.string().optional()
        }),
    });

    return (
        <React.Fragment>
            <div className='wflexScroll d-flex flex-column'>
                <div className='flex-grow-1'>
                    <Row className='mx-0'>
                        <Col lg="8" md="12" className='px-0'>
                            <div className='al-pad pb-0'>
                                <h3 className='bc_main_text mb-2 me-4'>Add New Admin</h3>
                            </div>
                            <div className='al-pad'>
                                <Formik
                                    enableReinitialize
                                    initialValues={getInitialValues}
                                    validationSchema={getValidationSchema}
                                    onSubmit={(values) => {
                                        console.log("Submit=>", { values, actionData })
                                        dispatch(addOrUpdateAdminRequest({ values, actionType, actionData }))
                                    }}
                                >
                                    {({ values, setFieldValue, setFieldTouched, touched, dirty, errors }) => (
                                        <>
                                            <Form>
                                                <Row>
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label><span className='requiredLabel'>*</span>Name</Label>
                                                            <Field
                                                                type="text"
                                                                name="adminName"
                                                                placeholder="e.g.John Doe"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="adminName"
                                                                component={"div"}
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label><span className='requiredLabel'>*</span>Email ID</Label>
                                                            <Field
                                                                type="text"
                                                                name="email"
                                                                placeholder="e.g.example@gmail.com"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="email"
                                                                component={"div"}
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label><span className='requiredLabel'>*</span>Mobile</Label>
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
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label><span className='requiredLabel'>*</span>Designation</Label>
                                                            <Field
                                                                type="text"
                                                                name="designation"
                                                                placeholder="e.g.Frontend Developer"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="designation"
                                                                component={"div"}
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup>
                                                            <Label><span className='requiredLabel'>*</span>Account expiry date</Label>
                                                            <DatePicker
                                                                className={'form-control ' + (values?.accountExp ? '' : 'al_calendarIcon')}
                                                                name="accountExp"
                                                                placeholderText="e.g.MM/dd/YYYY"
                                                                popperPlacement="auto"
                                                                popperProps={{
                                                                    strategy: "fixed"
                                                                }}
                                                                popperModifiers={[
                                                                    {
                                                                        flip: {
                                                                            behavior: ["bottom"],
                                                                        },
                                                                        preventOverflow: {
                                                                            enabled: false,
                                                                        },
                                                                        hide: { enabled: false }
                                                                    },
                                                                ]}
                                                                selected={values?.accountExp || ""}
                                                                onChange={(e) => setFieldValue("accountExp", e)}
                                                                dateFormat={"MM/dd/yyyy"}
                                                                minDate={new Date()}
                                                                autoComplete="off"
                                                                showMonthDropdown
                                                                // showTimeSelect
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                onBlur={() => actionData?.expiry_date && setFieldTouched(true)}
                                                                isClearable={values?.accountExp && true}
                                                            />
                                                            <ErrorMessage
                                                                name="accountExp"
                                                                component={"div"}
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    {actionType === getActionTypes.ADD &&
                                                        <>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Your Email ID</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="superadminEmail"
                                                                        placeholder="e.g.superadmin@example.com"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="superadminEmail"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Unique Identification Code</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="uniqueIDCode"
                                                                        placeholder="e.g.XXXDOC"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="uniqueIDCode"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </>}
                                                </Row>
                                                <div className='mt-2 pt-0'>
                                                    <button
                                                        type="button"
                                                        className="al_cancelbgbutton me-3"
                                                        onClick={cancelHandle}
                                                    >Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="al_savebtn"
                                                        disabled={!dirty}
                                                    >Save
                                                    </button>
                                                </div>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
});