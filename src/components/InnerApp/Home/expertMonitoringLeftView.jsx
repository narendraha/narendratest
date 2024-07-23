import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { allowedNumbersOnField } from "../../../_mock/helperIndex";
import { getActionTypes, getActivetab } from "../../../_mock/internalJsControl";
import { setActiveTabRequest, updateHealthDetailsRequest } from "../../../store/Home/slice";
import { setConfirmationOpen } from "../../../store/UtilityCallFunction/slice";

export const ExpertMonitoringLeftView = () => {
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        dispatch(updateHealthDetailsRequest(data))
    }

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.EXPTMONITORING, nextOrBackTab: getActivetab.HEALTHHUB }))
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    tdate: new Date() || "",
                    weight: "",
                    // height: "",
                    systolic: "",
                    diastolic: "",
                    pulse: "",
                    isCheckMedicalRecords: false
                }}
                validationSchema={Yup.object().shape({
                    weight: Yup.number()
                        .min(22, "Weight must be at least 22 lbs")
                        .max(1400, "Weight is too high!")
                        .required("Weight is required"),
                    // height: Yup.number()
                    //   .typeError("Must be a number")
                    //   .required("This field is required"),
                    systolic: Yup.number().when('diastolic', {
                        is: (diastolic) => diastolic === undefined,
                        then: Yup.number().max(370, "Systolic is Too high!").required("BP is required"),
                        otherwise: Yup.number().when(['diastolic', 'systolic'], {
                            is: (diastolic, systolic) => (diastolic <= 360 || systolic > 370),
                            then: Yup.number().max(370, "Systolic is Too high!").required("Systolic is required"),
                            otherwise: Yup.number().optional()
                        })
                    }),
                    diastolic: Yup.number().when('systolic', {
                        is: (systolic) => systolic === undefined,
                        then: Yup.number().max(360, "Diastolic is Too high!").required("."),
                        otherwise: Yup.number().when('systolic', {
                            is: (systolic) => systolic <= 370,
                            then: Yup.number().max(360, "Diastolic is Too high!").required("Diastolic is required"),
                            otherwise: Yup.number().optional()
                        })
                    }),
                    pulse: Yup.number()
                        .max(200, "BPM is Too high!")
                        .min(27, "Pulse must be at least 27 BPM")
                        .required("BPM is required"),
                    tdate: Yup.date().nullable().required("This field is required"),
                    isCheckMedicalRecords: Yup.boolean()
                        .oneOf([true], "This field is required")
                        .required("This field is required"),
                }, ['systolic', 'diastolic'])}
                onSubmit={(values) => {
                    let data = {
                        ...values,
                        tdate: moment(values?.tdate)?.format("YYYY-MM-DD")
                    }
                    dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, actionData: data, callApi: handleSubmit }))
                }}
            >{({ values, setFieldValue, setFieldTouched }) => (
                <>
                    <Form>
                        <Row>
                            <Col sm="6" className="mb-3">
                                <Label>Date</Label>
                                <DatePicker
                                    className="form-control al_calendarIcon"
                                    name="tdate"
                                    placeholderText="e.g.YYYY-MM-DD"
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
                                    selected={values?.tdate}
                                    onChange={(e) => { setFieldValue("tdate", e); }}
                                    minDate={new Date().setMonth(new Date().getMonth() - 3)}
                                    dateFormat="yyyy/MM/dd"
                                    maxDate={new Date()}
                                    onBlur={() => setFieldTouched("tdate", true)}
                                    autoComplete="off"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                                <ErrorMessage
                                    name="tdate"
                                    component={"div"}
                                    className="text-danger"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="4" lg="6" sm="4" className="mb-3">
                                <div className="al_vitalunits h-100">
                                    <i
                                        className="icon_alfred_weight"
                                        style={{ color: "#9086f7" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                        <Label>Weight</Label>
                                        <Field
                                            type="text"
                                            name="weight"
                                            placeholder="e.g.100"
                                            className="form-control"
                                            onKeyPress={(e) => allowedNumbersOnField(4, e)}
                                        />
                                        <ErrorMessage
                                            name="weight"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(lbs)</div>
                                </div>
                            </Col>
                            <Col xl="4" lg="6" sm="4" className="mb-3">
                                <div className="al_vitalunits h-100">
                                    <i
                                        className="icon_alfred_bp"
                                        style={{ color: "#efbc06" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                        <Label>Blood Pressure</Label>
                                        <div className="d-flex gap-2">
                                            <div>
                                                <Field
                                                    type="text"
                                                    name="systolic"
                                                    placeholder="e.g.120"
                                                    className="form-control"
                                                    onKeyPress={(e) => allowedNumbersOnField(3, e)}
                                                />
                                            </div>
                                            <div className="mt-2 text-muted">/</div>
                                            <div>
                                                <Field
                                                    type="text"
                                                    name="diastolic"
                                                    placeholder="e.g.80"
                                                    className="form-control"
                                                    onKeyPress={(e) => allowedNumbersOnField(3, e)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <ErrorMessage
                                                name="systolic"
                                                component={"div"}
                                                className="text-danger systolic"
                                            />
                                            <ErrorMessage
                                                name="diastolic"
                                                component={"div"}
                                                className="text-danger diastolic"
                                            />
                                        </div>
                                    </FormGroup>
                                    <div className="text-grey mt-1">(mmHg)</div>
                                </div>
                            </Col>
                            <Col xl="4" lg="6" sm="4" className="mb-3">
                                <div className="al_vitalunits h-100">
                                    <i
                                        className="icon_alfred_pulse"
                                        style={{ color: "#7ff1e4" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                        <Label>Pulse</Label>
                                        <Field
                                            type="text"
                                            name="pulse"
                                            placeholder="e.g.70"
                                            className="form-control"
                                            onKeyPress={(e) => allowedNumbersOnField(3, e)}
                                        />
                                        <ErrorMessage
                                            name="pulse"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(BPM)</div>
                                </div>
                            </Col>
                        </Row>

                        <FormGroup
                            check
                            inline
                            className="me-0 ps-0 w-100"
                        >
                            <Label
                                check
                                className="me-2 d-flex align-items-center"
                            >
                                <Field
                                    type="checkbox"
                                    name="isCheckMedicalRecords"
                                />
                                <span>
                                    Above mentioned details are valid as per the
                                    medical records
                                </span>
                            </Label>
                            <ErrorMessage
                                name="isCheckMedicalRecords"
                                component={"div"}
                                className="text-danger"
                            />
                        </FormGroup>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="al_grey_borderbtn"
                                onClick={handleSetTabs}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="al_savebtn mx-3"
                            >
                                Proceed
                            </button>
                        </div>
                    </Form>
                </>
            )}

            </Formik>
        </React.Fragment>
    )
}