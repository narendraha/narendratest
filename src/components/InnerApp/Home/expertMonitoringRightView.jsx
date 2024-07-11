import React, { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import nodata from '../../../images/nodata.svg';
import { getHealthDetailsGraphRequest } from "../../../store/Home/slice";

export const ExpertMonitoringRightView = () => {
    const dispatch = useDispatch();

    const [chartOptions, setChartOptions] = useState(null);

    const { getVitalsForHealthDetailGraph } = useSelector((state) => state?.homePageSlice);

    useEffect(() => {
        let reqObj = {
            start_date: "",
            end_date: "",
        }
        dispatch(getHealthDetailsGraphRequest(reqObj))
    }, [dispatch]);

    useEffect(() => {
        if (!getVitalsForHealthDetailGraph || !getVitalsForHealthDetailGraph.length) {
            // Data not yet available or empty
            return;
        }
        // Extract unique dates from data
        const uniqueDates = Array.from(
            new Set(getVitalsForHealthDetailGraph?.length > 0 && getVitalsForHealthDetailGraph.map((item) => item.tdate))
        );

        // Sort unique dates in ascending order
        // uniqueDates.sort();

        // Format dates in YYYY-MM-DD format
        const formattedDates = uniqueDates.map((date) =>
            Highcharts.dateFormat("%Y-%m-%d", new Date(date))
        );

        const prepareSeries = (data) => {
            const systolicSeries = {
                name: "Systolic",
                data: [],
            };

            const diastolicSeries = {
                name: "Diastolic",
                data: [],
            };
            const weightSeries = {
                name: "Weight",
                data: [],
            };

            const pulseSeries = {
                name: "Pulse",
                data: [],
            };
            data.forEach((item) => {
                if (item.tdate !== null) {
                    systolicSeries.data.push({
                        x: formattedDates.indexOf(item.tdate),
                        y: item.systolic_p,
                        customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/> Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
                    });
                    diastolicSeries.data.push({
                        x: formattedDates.indexOf(item.tdate),
                        y: item.diastolic_p,
                        customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
                    });
                    weightSeries.data.push({
                        x: formattedDates.indexOf(item.tdate),
                        y: Number(item.weight),
                        customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/> Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
                    });
                    pulseSeries.data.push({
                        x: formattedDates.indexOf(item.tdate),
                        y: Number(item.pulse),
                        customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
                    });
                }
            });

            return [systolicSeries, diastolicSeries, weightSeries, pulseSeries];
        };
        const series = prepareSeries(getVitalsForHealthDetailGraph);

        const options = {
            chart: {
                type: "line",
                style: {
                    fontFamily: "Poppins",
                },
            },
            title: {
                text: "Health Details",
                style: {
                    fontSize: "16px",
                    fontWeight: "500",
                },
            },
            xAxis: {
                categories: formattedDates,
                title: {
                    text: "Date",
                },
            },
            yAxis: {
                title: {
                    text: "Health Details",
                },
            },
            credits: {
                enabled: false, // Hides the Highcharts watermark
            },
            tooltip: {
                formatter: function () {
                    const index = this.series.xAxis.categories.indexOf(this.x);
                    const date = formattedDates[index];
                    return `<b>${date}</b><br/>${this.point.customTooltip}`;
                },
            },
            series: series,
            plotOptions: {
                series: {
                    lineWidth: 1,
                    marker: {
                        enabled: true,
                    },
                },
            },
        };

        setChartOptions(options);
    }, [getVitalsForHealthDetailGraph]);

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    start_date: null,
                    end_date: null,
                }}
                onSubmit={(values) => {
                    let data = {
                        start_date: moment(values?.start_date).format("YYYY-MM-DD") || "",
                        end_date: moment(values?.end_date).format("YYYY-MM-DD") || ""
                    };
                    dispatch(getHealthDetailsGraphRequest(data))
                }}
            >{({ values, setFieldTouched, setFieldValue }) => (
                <>
                    <Form>
                        <Row className="flex-xs-column">
                            <Col>
                                <FormGroup>
                                    <Label>
                                        {/* <span className="requiredLabel">*</span> */}
                                        Start Date:
                                    </Label>
                                    <DatePicker
                                        className={'form-control ' + (values?.start_date ? '' : 'al_calendarIcon')}
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
                                        selected={values?.start_date ? new Date(values?.start_date) : null}
                                        onChange={(date) => {
                                            setFieldValue("start_date", date)
                                            if (date > values?.end_date)
                                                setFieldValue("end_date", "")
                                        }}
                                        onBlur={() => setFieldTouched("start_date", true)}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={values?.end_date || ""}
                                        maxDate={new Date()}
                                        autoComplete="off"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        isClearable={true}
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
                                        {/* <span className="requiredLabel">*</span> */}
                                        End Date:
                                    </Label>
                                    <DatePicker
                                        className={'form-control ' + (values?.end_date ? '' : 'al_calendarIcon')}
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
                                        selected={values?.end_date ? new Date(values?.end_date) : null}
                                        onChange={(date) => setFieldValue("end_date", date)}
                                        onBlur={() => setFieldTouched("end_date", true)}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date(values?.start_date) || ""}
                                        maxDate={new Date()}
                                        autoComplete="off"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        isClearable={true}
                                    />
                                    <ErrorMessage
                                        name="end_date"
                                        component={"div"}
                                        className="text-danger"
                                    />
                                </FormGroup>
                            </Col>
                            <div className="mt-4 pt-2 w-auto">
                                <button type="submit" disabled={!(values?.start_date && values?.end_date)} className="al_savebtn">
                                    Submit
                                </button>
                            </div>
                        </Row>

                        {Array.isArray(getVitalsForHealthDetailGraph) && getVitalsForHealthDetailGraph?.length > 0 ? (
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
                            <div className="d-flex flex-column align-items-center pt-5">
                                <img src={nodata} width={220} alt="" />
                                <h6 className="mt-3 mb-0">No data found!</h6>
                            </div>
                        )}
                    </Form>
                </>
            )}

            </Formik>
        </React.Fragment >
    )
}
