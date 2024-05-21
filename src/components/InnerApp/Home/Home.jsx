import React, { useState } from "react";
import {
  Row,
  Col,
  Label,
  FormGroup,
  TabContent,
  TabPane,
  NavLink,
  Nav,
  NavItem,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import atrialfib from "../../../images/atrialfib.png";
import whytreatment from "../../../images/whytreatment.png";
import rhythm from "../../../images/rhythm.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import LayoutAlertMessage from "../MainLayout/LayoutAlertMessage";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import Highcharts from "highcharts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AxiosInstance } from "../../../_mock/utilities";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [tab, setTab] = useState("1");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [labelValues, setLabelValues] = useState(0);
  const [labelValues1, setLabelValues1] = useState(0);
  const [labelValues2, setLabelValues2] = useState(0);
  const [labelValues3, setLabelValues3] = useState(0);
  const [labelValues4, setLabelValues4] = useState(0);
  const [labelValues5, setLabelValues5] = useState(0);
  const [labelValues6, setLabelValues6] = useState(0);
  const [labelValues7, setLabelValues7] = useState(0);
  const [labelValues8, setLabelValues8] = useState(0);
  const [labelValues9, setLabelValues9] = useState(0);
  const [labelValues10, setLabelValues10] = useState(0);
  const [labelValues11, setLabelValues11] = useState(0);
  const [labelValues12, setLabelValues12] = useState(0);
  const [showconfirm, setShowconfirm] = useState(false);
  const [isShowconfirm, setIsShowconfirm] = useState(false);

  // heath details
  const [show2, setShow2] = useState(false);
  const [healthDetails, setHealthDetails] = useState();
  const horizontalLabels = {
    0: "None",
    20: "Mild",
    45: "Moderate",
    70: "Severe",
    90: "Extreme",
  };
  const handleValueChange = (value, setValue) => {
    setValue(value);
  };
  const handleValueChangeEnd = (value, setValue) => {
    if (value <= 30 && value > 10) {
      setValue(20);
    } else if (value <= 55 && value > 35) {
      setValue(45);
    } else if (value <= 80 && value > 55) {
      setValue(70);
    } else if (value <= 100 && value > 80) {
      setValue(90);
    } else {
      setValue(0);
    }
  };

  // For the first slider
  const handleValueChangeSlider = (value) => {
    handleValueChange(value, setLabelValues);
  };

  const handleValueChangeEndSlider = (value) => {
    handleValueChangeEnd(value, setLabelValues);
  };

  // For the second slider
  const handleValueChangeSlider1 = (value) => {
    handleValueChange(value, setLabelValues1);
  };

  const handleValueChangeEndSlider1 = (value) => {
    handleValueChangeEnd(value, setLabelValues1);
  };
  // For the third slider
  const handleValueChangeSlider2 = (value) => {
    handleValueChange(value, setLabelValues2);
  };

  const handleValueChangeEndSlider2 = (value) => {
    handleValueChangeEnd(value, setLabelValues2);
  };
  // For the 4 slider
  const handleValueChangeSlider3 = (value) => {
    handleValueChange(value, setLabelValues3);
  };

  const handleValueChangeEndSlider3 = (value) => {
    handleValueChangeEnd(value, setLabelValues3);
  };
  // For the 5 slider
  const handleValueChangeSlider4 = (value) => {
    handleValueChange(value, setLabelValues4);
  };

  const handleValueChangeEndSlider4 = (value) => {
    handleValueChangeEnd(value, setLabelValues4);
  };
  // For the 6 slider
  const handleValueChangeSlider5 = (value) => {
    handleValueChange(value, setLabelValues5);
  };

  const handleValueChangeEndSlider5 = (value) => {
    handleValueChangeEnd(value, setLabelValues5);
  };
  // For the 7 slider
  const handleValueChangeSlider6 = (value) => {
    handleValueChange(value, setLabelValues6);
  };

  const handleValueChangeEndSlider6 = (value) => {
    handleValueChangeEnd(value, setLabelValues6);
  };
  // For the 8 slider
  const handleValueChangeSlider7 = (value) => {
    handleValueChange(value, setLabelValues7);
  };

  const handleValueChangeEndSlider7 = (value) => {
    handleValueChangeEnd(value, setLabelValues7);
  };
  // For the 9 slider
  const handleValueChangeSlider8 = (value) => {
    handleValueChange(value, setLabelValues8);
  };

  const handleValueChangeEndSlider8 = (value) => {
    handleValueChangeEnd(value, setLabelValues8);
  };
  // For the 10 slider
  const handleValueChangeSlider9 = (value) => {
    handleValueChange(value, setLabelValues9);
  };

  const handleValueChangeEndSlider9 = (value) => {
    handleValueChangeEnd(value, setLabelValues9);
  };
  // For the 11 slider
  const handleValueChangeSlider10 = (value) => {
    handleValueChange(value, setLabelValues10);
  };

  const handleValueChangeEndSlider10 = (value) => {
    handleValueChangeEnd(value, setLabelValues10);
  };
  // For the 11 slider
  const handleValueChangeSlider11 = (value) => {
    handleValueChange(value, setLabelValues11);
  };

  const handleValueChangeEndSlider11 = (value) => {
    handleValueChangeEnd(value, setLabelValues11);
  };
  // For the 11 slider
  const handleValueChangeSlider12 = (value) => {
    handleValueChange(value, setLabelValues12);
  };

  const handleValueChangeEndSlider12 = (value) => {
    handleValueChangeEnd(value, setLabelValues12);
  };
  const valueMappings = {
    0: "1",
    20: "2",
    45: "3",
    70: "4",
    90: "5",
  };

  const getOutputNumber = (value) => {
    return valueMappings[value];
  };
  const handleSubmit = (data) => {
    setIsShowconfirm(data);
    if (data) {
      const output = `${getOutputNumber(labelValues)}${getOutputNumber(
        labelValues1
      )}${getOutputNumber(labelValues2)}${getOutputNumber(
        labelValues3
      )}${getOutputNumber(labelValues4)}${getOutputNumber(
        labelValues5
      )}${getOutputNumber(labelValues6)}${getOutputNumber(
        labelValues7
      )}${getOutputNumber(labelValues8)}${getOutputNumber(
        labelValues9
      )}${getOutputNumber(labelValues10)}${getOutputNumber(
        labelValues11
      )}${getOutputNumber(labelValues12)}`;
      console.log("Output:", output, typeof output);

      let data = {
        // weight: 70,
        // height: 175,
        // bloodP: 120,
        // pulse: 80,
        vitals: output,
      };
      AxiosInstance("application/json")
        .post(`/add_symptoms`, data)
        .then((res) => {
          if (res && res.data && res.status == "200") {
            if (res.data?.statuscode === 200) {
              toast(res.data?.message, {
                position: "top-center",
                type: "success",
              });
              setIsShowconfirm(!data);
              setTab("4");
            } else {
              toast(res.data?.message, {
                position: "top-center",
                type: "error",
              });
            }
          }
        })
        .catch((er) => {
          console.log(er);
          toast(er?.response?.data?.message, {
            position: "top-center",
            type: "error",
          });
        });
    }
  };
  const shownextStep = () => {
    setShowconfirm(!showconfirm);
    if (showconfirm) {
      setTab("3");
    }
  };

  const sorteddata = [
    [Date.UTC(2024, 2, 21), 81],
    [Date.UTC(2024, 2, 22), 95],
    [Date.UTC(2024, 2, 23), 91],
    [Date.UTC(2024, 2, 24), 98],
    [Date.UTC(2024, 2, 25), 83],
    [Date.UTC(2024, 2, 26), 95],
    [Date.UTC(2024, 2, 27), 80],
    [Date.UTC(2024, 2, 28), 90],
    [Date.UTC(2024, 2, 29), 100],
  ];

  useEffect(() => {
    Highcharts.chart("expertmonitoringgraph", {
      chart: {
        type: "area",
        style: {
          fontFamily: "Poppins",
        },
        panning: true,
      },
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        min: Math.min.apply(
          null,
          sorteddata.slice(-7).map(function (point) {
            return point[0];
          })
        ),
        max: Math.max.apply(
          null,
          sorteddata.slice(-7).map(function (point) {
            return point[0];
          })
        ),
        labels: {
          distance: 5,
          padding: 5,
          overflow: "justify",
          style: {
            fontSize: "11px",
          },
          formatter: function () {
            return Highcharts.dateFormat("%d-%m-%Y", new Date(this.value));
          },
          rotation: -45,
        },
        title: {
          text: null,
        },
        scrollbar: {
          enabled: true,
        },
        tickLength: 0,
        gridLineWidth: 0,
        lineWidth: 0,
        showLastLabel: true,
        showEmpty: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Pulse",
        },
        labels: {
          distance: 5,
          padding: 5,
          style: {
            fontSize: "11px",
          },
        },
        endOnTick: false,
        gridLineWidth: 1,
        showEmpty: false,
      },
      tooltip: {
        valueSuffix: " bpm",
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
          },
        ],
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          color: "#0079ca",
        },
        series: {
          groupPadding: 1,
          pointPadding: 1,
          pointPlacement: "on",
          borderWidth: 0,
          pointWidth: 50,
        },
      },
      navigator: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
      legend: { enabled: false },
      series: [
        {
          name: "Pulse",
          data: sorteddata,
        },
      ],
    });
  }, []);

  const handleHeathDetails = (data) => {
    setShow2(data);
    if (data) {
      delete healthDetails?.isCheckMedicalRecords
      // direct redirect to next tab without api call
      setTab("3");
      setShow2(!data);
    }
  }

  return (
    <>
      <ConfirmationAction newFun={isShowconfirm ? handleSubmit : show2 && handleHeathDetails} open={isShowconfirm || show2} />
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-0">Hello, {decoded?.username}!</h3>
          <Row className="al_hometabs">
            <Col sm="12">
              <Nav tabs className="mb-3">
                <NavItem>
                  <NavLink
                    className={tab === "1" ? "active" : ""}
                    onClick={() => {
                      setTab("1");
                    }}
                  >
                    <div>
                      <span>H</span>
                      <span className="d-none d-sm-block">Health Hub</span>
                      {/* <i className="icon_alfred_back-arrow"></i> */}
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "2" ? "active" : ""}
                    onClick={() => {
                      setTab("2");
                    }}
                  >
                    <div>
                      <span>E</span>
                      <span className="d-none d-sm-block">
                        Expert Monitoring
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "3" ? "active" : ""}
                    onClick={() => {
                      setTab("3");
                    }}
                  >
                    <div>
                      <span>L</span>
                      <span className="d-none d-sm-block">
                        List your Symptoms
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "4" ? "active" : ""}
                    onClick={() => {
                      setTab("4");
                    }}
                  >
                    <div>
                      <span>L</span>
                      <span className="d-none d-sm-block">Lifestyle Goals</span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "5" ? "active" : ""}
                    onClick={() => {
                      setTab("5");
                    }}
                  >
                    <div>
                      <span>O</span>
                      <span className="d-none d-sm-block">
                        Optimal Risk Management
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={tab}>
                <TabPane tabId="1">
                  <p>Knowing about AF will reduce the risk</p>
                  <Row>
                    <Col lg="7" sm="12">
                      <Row>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Understand Atrial fibrillation(AF)</h6>
                            <img src={atrialfib} alt="" style={{ height:"120px", objectFit: "contain" }} />
                            <p className="mt-3">
                              Atrial fibrillation (AF) is a type of arrhythmia,
                              which means that the heart beats fast and irregularly.
                              The risk of AF increases markedly with age. Some of
                              the known causes of AF include chronic high blood
                              pressure, heart valve diseases and hyperthyroidism.
                            </p>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Why treatment?</h6>
                            <img src={whytreatment} alt="" style={{ height:"120px", objectFit: "contain" }} />
                            <p className="mt-3">
                              The way the heart beats in atrial fibrillation means
                              there's a risk of blood clots forming in the heart
                              chambers. If these enter the bloodstream, they can
                              cause a stroke. Your doctor will assess and discuss
                              your risk with you, and try to minimise your chance of
                              having a stroke.
                            </p>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Rhythm</h6>
                            <img src={rhythm} alt="" style={{ height:"120px", objectFit: "contain" }} />
                            <p className="mt-3">
                              Atrial fibrillation (AFib) is an irregular and often
                              very rapid heart rhythm. An irregular heart rhythm is
                              called an arrhythmia. AFib can lead to blood clots in
                              the heart. The condition also increases the risk of
                              stroke, heart failure and other heart-related
                              complications.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="5" sm="12">
                      <Card className="al_cardnoborder" style={{ backgroundColor: "#F7F7F7", boxShadow: "none" }}>
                        <CardBody>
                          <h6>Videos</h6>
                          <Row className="mt-3 al_knowldgebank">
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting
                                    industry.Text of the printing and typesetting
                                    industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="al_savebtn"
                      onClick={() => {
                        setTab("2");
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <h5>Health details</h5>
                  <Row>
                    <Col lg="6" sm="12">
                      <div className="text-end al_note">Your last entry sucessfully updated on: 12-04-2024 12:00 AM</div>
                      <Formik
                        initialValues={{
                          weight: "",
                          height: "",
                          bloodP: "",
                          pulse: "",
                          isCheckMedicalRecords: false
                        }}
                        validationSchema={Yup.object().shape({
                          weight: Yup.number()
                            .typeError("Must be a number")
                            .required("This field is required"),
                          height: Yup.number()
                            .typeError("Must be a number")
                            .required("This field is required"),
                          bloodP: Yup.number()
                            .typeError("Must be a number")
                            .required("This field is required"),
                          pulse: Yup.number()
                            .typeError("Must be a number")
                            .required("This field is required"),
                          isCheckMedicalRecords: Yup.boolean()
                            .oneOf([true], 'This field is required')
                            .required('This field is required'),
                        })}
                        onSubmit={(values) => {
                          setShow2(true);
                          setHealthDetails(values)
                        }}
                      >
                        {({ }) => {
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
                                    name="date"
                                    placeholderText="Select date"
                                    popperPlacement="auto"
                                    popperModifiers={{
                                      flip: {
                                        behavior: ["bottom"],
                                      },
                                      preventOverflow: {
                                        enabled: false,
                                      },
                                    }}
                                    selected={new Date()}
                                    onChange={(e) => { }}
                                    dateFormat={"MM/dd/yyyy"}
                                    minDate={new Date().setMonth(
                                      new Date().getMonth() - 1
                                    )}
                                    maxDate={new Date()}
                                    autoComplete="off"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="4" lg="6" sm="4">
                                  <div className="al_vitalunits">
                                    <i className="icon_alfred_weight" style={{ color: "#9086f7" }}></i>
                                    <FormGroup className="mb-0">
                                      <Label>Weight</Label>
                                      <Field
                                        type="text"
                                        name="weight"
                                        placeholder="100"
                                        className="form-control"
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
                                <Col xl="4" lg="6" sm="4">
                                  <div className="al_vitalunits">
                                    <i className="icon_alfred_bp" style={{ color: "#efbc06" }}></i>
                                    <FormGroup className="mb-0">
                                      <Label>Blood Pressure</Label>
                                      <Field
                                        type="text"
                                        name="bloodP"
                                        placeholder="120/80"
                                        className="form-control"
                                      />
                                      <ErrorMessage
                                        name="bloodP"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(BPM)</div>
                                  </div>
                                </Col>
                                <Col xl="4" lg="6" sm="4">
                                  <div className="al_vitalunits">
                                    <i className="icon_alfred_pulse" style={{ color: "#7ff1e4" }}></i>
                                    <FormGroup className="mb-0">
                                      <Label>Pulse</Label>
                                      <Field
                                        type="text"
                                        name="pulse"
                                        placeholder="70"
                                        className="form-control"
                                      />
                                      <ErrorMessage
                                        name="pulse"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(mmHg)</div>
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
                                  <Field type="checkbox" name="isCheckMedicalRecords" />
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
                            </Form>
                          );
                        }}
                      </Formik>
                    </Col>
                    <Col lg="6" sm="12">
                      <div
                        id="expertmonitoringgraph"
                        style={{ height: "350px" }}
                      ></div>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="al_grey_borderbtn"
                      onClick={() => {
                        setTab("1");
                      }}
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
                </TabPane>
                <TabPane tabId="3">
                  <p>Select the symptoms range listed below</p>
                  <div className="al_symptoms">
                    <Row>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Breathlessness during activity</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider(labelValues)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Breathlessness even at rest</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues1}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider1}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider1(labelValues1)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Dizziness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues2}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider2}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider2(labelValues2)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Cold sweat</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues3}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider3}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider3(labelValues3)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Pronounced tiredness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues4}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider4}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider4(labelValues4)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Chest pain</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues5}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider5}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider5(labelValues5)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Pressure / discomfort in chest</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues6}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider6}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider6(labelValues6)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Worry</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues7}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider7}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider7(labelValues7)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Weakness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues8}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider8}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider8(labelValues8)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Infirmity</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues9}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider9}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider9(labelValues9)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Near syncope</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues10}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider10}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider10(labelValues10)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Syncope</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues11}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider11}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider11(labelValues11)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Tiredness afterwards</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                <label className="btn active">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="never"
                                  />{" "}
                                  Never
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="occasionally"
                                  />{" "}
                                  Occasionally
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="often"
                                  />{" "}
                                  Often
                                </label>
                                <label className="btn">
                                  <input
                                    type="radio"
                                    name="frequency"
                                    id="always"
                                  />{" "}
                                  Always
                                </label>
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                min={0}
                                max={100}
                                tooltip={false}
                                value={labelValues12}
                                labels={horizontalLabels}
                                onChange={handleValueChangeSlider12}
                                onChangeComplete={() =>
                                  handleValueChangeEndSlider12(labelValues12)
                                }
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                <Label
                                  check
                                  className="d-flex align-center me-3"
                                >
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="yes"
                                  />
                                  &nbsp;Yes
                                </Label>
                                <Label check className="d-flex align-center">
                                  <input
                                    type="radio"
                                    name="effectingquality"
                                    value="no"
                                  />
                                  &nbsp;No
                                </Label>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="al_grey_borderbtn"
                      onClick={() => {
                        setTab("2");
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="al_savebtn mx-3"
                      onClick={() => setIsShowconfirm(true)}
                    >
                      Proceed
                    </button>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <p>Select where you want to be coached in</p>
                  <div className="w-80">
                    <Row className="al_goalslist mb-4">
                      <Col lg="3">
                        <Label
                          check
                          className="d-flex align-items-center justify-content-between"
                        >
                          <span>Diet</span>
                          <input type="checkbox" name="diet" />
                        </Label>
                      </Col>
                      <Col lg="3">
                        <Label
                          check
                          className="d-flex align-items-center justify-content-between"
                        >
                          <span>Exercise</span>
                          <input type="checkbox" name="exercise" />
                        </Label>
                      </Col>
                      <Col lg="3">
                        <Label
                          check
                          className="d-flex align-items-center justify-content-between"
                        >
                          <span>Weight</span>
                          <input type="checkbox" name="weight" />
                        </Label>
                      </Col>
                      <Col lg="3">
                        <Label
                          check
                          className="d-flex align-items-center justify-content-between"
                        >
                          <span>Blood pressure</span>
                          <input type="checkbox" name="bloodpressure" />
                        </Label>
                      </Col>
                    </Row>
                    <hr />
                    <div className="mt-4">
                      <Row className="mb-3">
                        <Col lg="6" sm="12">
                          <p className="al_note">Your Details</p>
                          <h5 className="mb-2">Hello, Richard!</h5>
                          <div>
                            <strong>Age: </strong>
                            <span>40</span>
                          </div>
                          <div>
                            <strong>Gender: </strong>
                            <span>Male</span>
                          </div>
                          <div>
                            <strong>Residence type: </strong>
                            <span>Cohabitant</span>
                          </div>
                          <div>
                            <strong>Education: </strong>
                            <span>University Degree</span>
                          </div>
                        </Col>
                        <Col lg="6" sm="12">
                          <h6 className="mt-3 mb-2">Your Medication</h6>
                          <Table borderless responsive>
                            <thead>
                              <tr>
                                <th>Symptoms</th>
                                <th className="w-25">Range</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Breathlessness even at rest</td>
                                <td className="text-warning">Moderate</td>
                              </tr>
                              <tr>
                                <td>Dizziness</td>
                                <td className="text-success">Mild</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>

                      <hr />
                      <h6 className="mt-3">
                        Choose the time period to set your goal
                      </h6>

                      <Row className="mb-4">
                        <Col lg="4" sm="6">
                          <div className="al_lightbgbutton active">
                            Create goal for <strong>1 week</strong>
                          </div>
                        </Col>
                        <Col lg="4" sm="6">
                          <div className="al_lightbgbutton">
                            Create goal for <strong>15 days</strong>
                          </div>
                        </Col>
                        <Col lg="4" sm="6">
                          <div className="al_lightbgbutton">
                            Create goal for <strong>1 month</strong>
                          </div>
                        </Col>
                      </Row>
                      <p className="al_note mb-3">
                        Disclaimer: Goal will be created based on the list of
                        symptoms you have selected and the data you have
                        provided in this application{" "}
                      </p>

                      <button type="button" className="al_savebtn">
                        OK
                      </button>
                      {/* <LayoutAlertMessage /> */}
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <ul className="standardPlans">
                    <li>
                      Refer to your managing my AF and risk of stroke guide if
                      you get an episode of AF
                    </li>
                    <li>Learn about your AF medicines</li>
                    <li>
                      Keep an up-to-date list of all medications which you are
                      using
                    </li>
                    <li>
                      Take your AF medications the way doctor tells you, and do
                      not run out of medication
                    </li>
                    <li>
                      If you take Warfarin, make sure that you have regular
                      blood tests and keep a record of your results{" "}
                    </li>
                    <li>
                      Visit your doctors regularly and ask questions if you have
                      any concerns
                    </li>
                    <li>
                      Know your stroke risk factors and keep a record of your
                      CHADS score in this booklet
                    </li>
                    <li>
                      Reduce your risk of more frequent or severe AF and risk of
                      stroke by choosing a healthy lifestyle
                    </li>
                    <li>Feel your pulse every morning and evening</li>
                  </ul>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
