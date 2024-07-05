import { ErrorMessage, Field, Form, Formik } from "formik";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import {
    allowsOnlyNumericOnly3Digit,
    allowsOnlyNumericOnly4Digit,
} from "../../../_mock/RegularExp";
import bulp from "../../../images/idea.png";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../_mock/utilities";
import { getActivetab } from "../../../_mock/internalJsControl";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabRequest, setActionTypeAndActionData } from "../../../store/Home/slice";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import { getActionTypes } from "../../../_mock/internalJsControl";

export const ExpertMonitoring = () => {
    const dispatch = useDispatch();

    const { actionType } = useSelector((state) => state?.homePageSlice);

    const [chartOptions, setChartOptions] = useState(null);
    const [symptomData, getSymptomData] = useState([]);
    const [healthDetails, setHealthDetails] = useState();
    const [getLastUpdated, setgetLastUpdated] = useState("");

    const fetchData = async (data) => {
        let graphData = {
            start_date: data?.start_date,
            end_date: data?.end_date,
        };
        AxiosInstance("application/json")
            .post(`/health_details_graph`, graphData)
            .then((res) => {
                if (res && res.data && res.status === 200) {
                    if (res.data?.statuscode === 200) {
                        const data = res?.data?.data || [];
                        getSymptomData(data);
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

    const handleSetTabs = (isBack = null) => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.EXPTMONITORING, nextOrBackTab: isBack ? isBack : getActivetab.SYMPTOMSLIST }))
    }

    const handleSubmitForm = () => {
        handleSetTabs()
    }

    return (
        <React.Fragment>
            <ConfirmationAction newFun={handleSubmitForm} open={actionType === getActionTypes.ISCONFIRM} />
            <div className="d-flex justify-content-between mb-2">
                <h5 className="mb-0">Health details </h5>
                {getLastUpdated?.difference >= 0 ? (
                    <div className="d-flex align-items-center justify-content-end gap-1 al_note_content">
                        <img src={bulp} alt="" width={20} />
                        You, Last gave your symptoms{" "}
                        <span style={{ color: "#3bc0c3" }}>
                            {" "}
                            {getLastUpdated?.difference}
                        </span>{" "}
                        days ago on
                        <span style={{ color: "#3bc0c3" }}>
                            {getLastUpdated?.date}
                        </span>
                    </div>
                ) : null}
            </div>

            <Row className="flex-row-xs-reverse">
                <Col lg="6" sm="12">
                    <Formik
                        initialValues={{
                            tdate: new Date(),
                            weight: "",
                            // height: "",
                            systolic: "",
                            diastolic: "",
                            pulse: "",
                            isCheckMedicalRecords: false,
                        }}
                        validationSchema={Yup.object().shape({
                            weight: Yup.number()
                                .min(22, "Weight must be at least 22 lbs")
                                .max(1400, "Weight is too high!")
                                .required("Weight is required"),
                            // height: Yup.number()
                            //   .typeError("Must be a number")
                            //   .required("This field is required"),
                            systolic: Yup.number()
                                .max(370, "Systolic is too high!")
                                .required("Systolic is required"),
                            diastolic: Yup.number().when('systolic', {
                                is: (systolic) => systolic <= 370,
                                then: Yup.number().max(360, "Diastolic is Too high!").required("Diastolic is required"),
                                otherWise: Yup.number().optional()
                            }),
                            // diastolic: Yup.number()
                            //   .max(120, "Diastolic is Too high!")
                            //   .required("This field is required"),
                            pulse: Yup.number()
                                .max(200, "BPM is Too high!")
                                .required("BPM is required"),
                            tdate: Yup.date().nullable().required("This field is required"),
                            isCheckMedicalRecords: Yup.boolean()
                                .oneOf([true], "This field is required")
                                .required("This field is required"),
                        })}
                        onSubmit={(values) => {
                            setHealthDetails(values);
                            dispatch(setActionTypeAndActionData({ actionType: getActionTypes.ISCONFIRM, actionData: values }));
                        }}
                    >
                        {({ setFieldValue, values, setFieldTouched, errors }) => {
                            return (
                                <Form>
                                    {/* <Row>
                                <Col sm="4">
                                  <FormGroup>
                                    <Label>Height(ft)</Label>
                                    <Field
                                      type="text"
                                      name="height"
                                      placeholder="Enter Height"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="height"
                                      component={"div"}
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row> */}

                                    <Row>
                                        <Col sm="6" className="mb-3">
                                            <Label>Date</Label>
                                            <DatePicker
                                                className="form-control al_calendarIcon"
                                                name="tdate"
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
                                                selected={
                                                    // values?.tdate ? values?.tdate : new Date()
                                                    values?.tdate
                                                }
                                                onChange={(e) => {
                                                    setFieldValue("tdate", e);
                                                }}
                                                minDate={new Date().setMonth(
                                                    new Date().getMonth() - 3
                                                )}
                                                dateFormat={"MM/dd/yyyy"}
                                                maxDate={new Date()}
                                                onBlur={() =>
                                                    setFieldTouched("tdate", true)
                                                }
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
                                                                onKeyPress={(e) =>
                                                                    allowsOnlyNumericOnly3Digit(e)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="mt-2 text-muted">/</div>
                                                        <div>
                                                            <Field
                                                                type="text"
                                                                name="diastolic"
                                                                placeholder="e.g.80"
                                                                className="form-control"
                                                                onKeyPress={(e) =>
                                                                    allowsOnlyNumericOnly3Digit(e)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
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
                                                        onKeyPress={(e) =>
                                                            allowsOnlyNumericOnly3Digit(e)
                                                        }
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
                                            onClick={() => handleSetTabs(getActivetab.HEALTHHUB)}
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
                            );
                        }}
                    </Formik>
                </Col>
                <Col lg="6" sm="12">
                    {/* 
                        * old graph
                      <div
                        id="expertmonitoringgraph"
                        style={{ height: "350px" }}
                      ></div> */}

                    <Formik
                        initialValues={{
                            start_date: null,
                            end_date: null,
                        }}
                        validationSchema={Yup.object().shape({
                            start_date: Yup.date()
                                .nullable()
                                .required("Start Date is required"),
                            end_date: Yup.date()
                                .nullable()
                                .min(
                                    Yup.ref("start_date"),
                                    "End Date should be greater than or equal to Start Date"
                                )
                                .max(
                                    new Date(),
                                    "End Date should not be in the future"
                                )
                                .required("End Date is required"),
                        })}
                        onSubmit={(values) => {
                            let data = {
                                start_date: moment(values.start_date).format(
                                    "YYYY-MM-DD"
                                ),
                                end_date: moment(values.end_date).format(
                                    "YYYY-MM-DD"
                                ),
                            };
                            fetchData(data);
                        }}
                    >
                        {({
                            values,
                            setFieldValue,
                            errors,
                            touched,
                            setFieldTouched,
                        }) => {
                            return (
                                <Form>
                                    <Row className="flex-xs-column">
                                        <Col>
                                            <FormGroup>
                                                <Label>
                                                    <span className="requiredLabel">*</span>
                                                    Start Date:
                                                </Label>
                                                <DatePicker
                                                    className="form-control al_calendarIcon"
                                                    name="start_date"
                                                    placeholderText="Select start date"
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
                                                    selected={
                                                        values?.start_date
                                                            ? new Date(values?.start_date)
                                                            : null
                                                    }
                                                    onChange={(date) =>
                                                        setFieldValue("start_date", date)
                                                    }
                                                    onBlur={() =>
                                                        setFieldTouched("start_date", true)
                                                    }
                                                    dateFormat="yyyy/MM/dd"
                                                    maxDate={new Date()}
                                                    autoComplete="off"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                                <ErrorMessage
                                                    name="start_date"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>
                                                    <span className="requiredLabel">*</span>
                                                    End Date:
                                                </Label>
                                                <DatePicker
                                                    className="form-control al_calendarIcon"
                                                    name="end_date"
                                                    placeholderText="Select end date"
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
                                                    selected={
                                                        values?.end_date
                                                            ? new Date(values?.end_date)
                                                            : null
                                                    }
                                                    onChange={(date) =>
                                                        setFieldValue("end_date", date)
                                                    }
                                                    onBlur={() =>
                                                        setFieldTouched("end_date", true)
                                                    }
                                                    dateFormat="yyyy/MM/dd"
                                                    maxDate={new Date()}
                                                    autoComplete="off"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                                <ErrorMessage
                                                    name="end_date"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <div className="mt-4 pt-2 w-auto">
                                            <button type="submit" className="al_savebtn">
                                                Submit
                                            </button>
                                        </div>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>

                    {Array.isArray(symptomData) && symptomData?.length > 0 ? (
                        <Card className="al_cardview h-auto mb-3">
                            <CardBody>
                                {chartOptions && (
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={chartOptions}
                                    />
                                )}
                            </CardBody>
                        </Card>
                    ) : (
                        <div>No date found!!</div>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    )
}