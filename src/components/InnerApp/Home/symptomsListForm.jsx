import React, { useState } from "react";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../_mock/utilities";
import { useLocation } from "react-router";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

const horizontalLabels = {
    0: "None",
    20: "Mild",
    45: "Moderate",
    70: "Severe",
    90: "Extreme",
};

let frequencyList = ["Never", "Occasionally", "Often", "Always"];

export const SymptomsListForm = () => {

    const location = useLocation();

    const [tab, setTab] = useState(
        location?.state?.activeTab ? location?.state?.activeTab : "1"
    );
    const [breathlessness, setBreathlessness] = useState({
        breathnessda: { frequency: "" },
        breathnessea: { frequency: "" },
        dizziness: { frequency: "" },
        col_swet: { frequency: "" },
        p_tiredness: { frequency: "" },
        chest_pain: { frequency: "" },
        pressurechest: { frequency: "" },
        worry: { frequency: "" },
        weakness: { frequency: "" },
        infirmity: { frequency: "" },
        nsynacpe: { frequency: "" },
        syncope: { frequency: "" },
        tirednessafterwards: { frequency: "" },
    });
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
    const [isLoading, setIsLoading] = useState(false);
    const [getTabStatus, setGetStatus] = useState({});
    const [patientAndSymptomsDetails, setPatientAndSymptomsDetails] = useState({
        patientDetails: null,
        symptomsDetails: null,
    });
    const [qualityOfLife, setQualityOfLife] = useState({
        breathnessda: { quality_of_life: "" },
        breathnessea: { quality_of_life: "" },
        dizziness: { quality_of_life: "" },
        col_swet: { quality_of_life: "" },
        p_tiredness: { quality_of_life: "" },
        chest_pain: { quality_of_life: "" },
        pressurechest: { quality_of_life: "" },
        worry: { quality_of_life: "" },
        weakness: { quality_of_life: "" },
        infirmity: { quality_of_life: "" },
        nsynacpe: { quality_of_life: "" },
        syncope: { quality_of_life: "" },
        tirednessafterwards: { quality_of_life: "" },
    });

    const [isShowconfirm, setIsShowconfirm] = useState(false);

    const handleQualityOfLifeChange = (category, value) => {
        setQualityOfLife((prevState) => ({
            ...prevState,
            [category]: { quality_of_life: value },
        }));
    };

    const handleSubmit = (data) => {
        setIsShowconfirm(data);
        if (data) {
            const output = `${getOutputNumber(labelValues)}
          ${getOutputNumber(labelValues1)}
          ${getOutputNumber(labelValues2)}
          ${getOutputNumber(labelValues3)}
          ${getOutputNumber(labelValues4)}
          ${getOutputNumber(labelValues5)}
          ${getOutputNumber(labelValues6)}
          ${getOutputNumber(labelValues7)}
          ${getOutputNumber(labelValues8)}
          ${getOutputNumber(labelValues9)}
          ${getOutputNumber(labelValues10)}
          ${getOutputNumber(labelValues11)}
          ${getOutputNumber(labelValues12)}`;

            let newData = {
                breathnessda: {
                    frequency: breathlessness.breathnessda.frequency,
                    severity: getOutputNumber(labelValues),
                    quality_of_life: getLifeValue(qualityOfLife.breathnessda),
                },
                breathnessea: {
                    frequency: breathlessness.breathnessea.frequency,
                    severity: getOutputNumber(labelValues1),
                    quality_of_life: getLifeValue(qualityOfLife.breathnessea),
                },
                dizziness: {
                    frequency: breathlessness.dizziness.frequency,
                    severity: getOutputNumber(labelValues2),
                    quality_of_life: getLifeValue(qualityOfLife.dizziness),
                },
                col_swet: {
                    frequency: breathlessness.col_swet.frequency,
                    severity: getOutputNumber(labelValues3),
                    quality_of_life: getLifeValue(qualityOfLife.col_swet),
                },
                p_tiredness: {
                    frequency: breathlessness.p_tiredness.frequency,
                    severity: getOutputNumber(labelValues4),
                    quality_of_life: getLifeValue(qualityOfLife.p_tiredness),
                },
                chest_pain: {
                    frequency: breathlessness.chest_pain.frequency,
                    severity: getOutputNumber(labelValues5),
                    quality_of_life: getLifeValue(qualityOfLife.chest_pain),
                },
                pressurechest: {
                    frequency: breathlessness.pressurechest.frequency,
                    severity: getOutputNumber(labelValues6),
                    quality_of_life: getLifeValue(qualityOfLife.pressurechest),
                },
                worry: {
                    frequency: breathlessness.worry.frequency,
                    severity: getOutputNumber(labelValues7),
                    quality_of_life: getLifeValue(qualityOfLife.worry),
                },
                weakness: {
                    frequency: breathlessness.weakness.frequency,
                    severity: getOutputNumber(labelValues8),
                    quality_of_life: getLifeValue(qualityOfLife.weakness),
                },
                infirmity: {
                    frequency: breathlessness.infirmity.frequency,
                    severity: getOutputNumber(labelValues9),
                    quality_of_life: getLifeValue(qualityOfLife.infirmity),
                },
                nsynacpe: {
                    frequency: breathlessness.nsynacpe.frequency,
                    severity: getOutputNumber(labelValues10),
                    quality_of_life: getLifeValue(qualityOfLife.nsynacpe),
                },
                syncope: {
                    frequency: breathlessness.syncope.frequency,
                    severity: getOutputNumber(labelValues11),
                    quality_of_life: getLifeValue(qualityOfLife.syncope),
                },
                tirednessafterwards: {
                    frequency: breathlessness.tirednessafterwards.frequency,
                    severity: getOutputNumber(labelValues12),
                    quality_of_life: getLifeValue(qualityOfLife.tirednessafterwards),
                },
            };
            setIsShowconfirm(!data);
            AxiosInstance("application/json")
                .post(`/add_symptoms`, newData)
                .then((res) => {
                    if (res && res.data && res.status === 200) {
                        if (res.data?.statuscode === 200) {
                            toast(res.data?.message, {
                                position: "top-right",
                                type: "success",
                            });
                            changeStatus();
                            setTab("4");
                            getPatientDetails();
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
        }
    };

    const getOutputNumber = (value) => {
        return horizontalLabels[value];
    };

    const lifeMappings = {
        Yes: "true",
        No: "false",
    };

    const getLifeValue = (value) => {
        return lifeMappings[value.quality_of_life] !== undefined
            ? lifeMappings[value.quality_of_life]
            : ""; // If value.quality_of_life is not found in lifeMappings, return an empty string
    };

    const changeStatus = async () => {
        const tabKeys = {
            1: "health_hub",
            2: "expert_monitoring",
            3: "list_your_symptoms",
            4: "lifestyle_goals",
            5: "optimal_risk_management",
        };
        let key = tabKeys[tab] || "";
        let payload = {
            [key]: 1,
        };
        await AxiosInstance("application/json")
            .post("/setstatus", payload)
            .then((res) => {
                if (res && res.data && res.status == 200) {
                    if (res.data?.statuscode === 200) {
                        // toast(res.data?.message, {
                        //   position: "top-right",
                        //   type: "success",
                        // });
                        getTabListStatus();
                    } else {
                        // toast(res.data?.message, {
                        //   position: "top-right",
                        //   type: "error",
                        // });
                    }
                }
            })
            .catch((er) => {
                toast(er?.response?.data?.message || er?.message, {
                    position: "top-right",
                    type: "error",
                });
            });
    };
    const getTabListStatus = async () => {
        setIsLoading(true);
        await AxiosInstance("application/json")
            .get("/getstatus")
            .then((response) => {
                if (response && response?.status == 200) {
                    setGetStatus(response.data?.data);
                    setIsLoading(false);
                }
            })
            .catch((er) => {
                toast(er?.response?.data?.message || er?.message, {
                    position: "top-right",
                    type: "error",
                });
            });
    };
    const getPatientDetails = async () => {
        await AxiosInstance("application/json")
            .get("/userdetails")
            .then((response) => {
                if (response && response?.status == 200) {
                    setPatientAndSymptomsDetails({ patientDetails: response.data?.data });
                    setIsLoading(false);
                }
            })
            .catch((er) => {
                toast(er?.response?.data?.message || er?.message, {
                    position: "top-right",
                    type: "error",
                });
            });
    };


    const dispatch = useDispatch();

    let getInitialValues = () => ({
        ListOfSymptomsCapturingData: [
            {
                key: "breathnessda",
                symptomName: "Breathlessness during activity",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "breathnessea",
                symptomName: "Breathlessness even at rest",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "dizziness",
                symptomName: "Dizziness",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "col_swet",
                symptomName: "Cold sweat",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "p_tiredness",
                symptomName: "Pronounced tiredness",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "chest_pain",
                symptomName: "Chest pain",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "pressurechest",
                symptomName: "Pressure / discomfort in chest",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "worry",
                symptomName: "Worry",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "weakness",
                symptomName: "Weakness",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "infirmity",
                symptomName: "Infirmity",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "nsynacpe",
                symptomName: "Near syncope",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "syncope",
                symptomName: "Syncope",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },
            {
                key: "tirednessafterwards",
                symptomName: "Tiredness afterwards",
                frequency: "",
                serverity: "",
                isAffectingLife: ""
            },

        ]
    });

    const handleFieldOnchange = (e, i, setFieldValue, field) => {
        console.log("0980980980980980980", e, i)
        if (field === 'serverity') {
            let range = (e <= 30 && e > 10) ? 20 : (e <= 55 && e > 35) ? 45 : (e <= 80 && e > 55) ? 70 : (e <= 100 && e > 80) ? 90 : 0
            setFieldValue(`ListOfSymptomsCapturingData[${i}].${field}`, range)
        } else
            setFieldValue(`ListOfSymptomsCapturingData[${i}].${field}`, e)

    }

    const handleSubmitForm = () => {
        dis
    }
    return (
        <React.Fragment>
            <p>Select the symptoms range listed below</p>
            <Formik
                initialValues={getInitialValues()}
                // validationSchema={{}}
                onSubmit={(values) => {
                    console.log("values=>", values)
                    // handleSubmitForm(values)
                    dispatch
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <div className="al_symptoms">
                        {console.log("99999999999999", values)}
                        <Row>
                            {values?.ListOfSymptomsCapturingData?.map((sympt, index) => {
                                return (
                                    <>
                                        <Col lg="4" md="6" sm="12">
                                            <h6>{sympt.symptomName}</h6>
                                            <Card className="mb-0 al_cardnoborder">
                                                <CardBody>
                                                    <strong>Frequency</strong>
                                                    <div
                                                        className="btn-group btn-group-toggle al_frequencylist"
                                                        data-toggle="buttons"
                                                    >
                                                        {frequencyList?.map((frequency) => (
                                                            <label
                                                                key={frequency}
                                                                className={`btn ${sympt?.frequency === frequency ? "active" : ""}`}>
                                                                <input
                                                                    type="radio"
                                                                    name={`ListOfSymptomsCapturingData[${index}].frequency`}
                                                                    value={frequency}
                                                                    checked={sympt?.frequency === frequency}
                                                                    onChange={(e) => handleFieldOnchange(e?.target?.value, index, setFieldValue, 'frequency')}
                                                                />
                                                                {frequency.charAt(0).toUpperCase() +
                                                                    frequency.slice(1)}
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <strong>Severity</strong>
                                                    <Slider
                                                        range
                                                        min={0}
                                                        max={100}
                                                        marks={horizontalLabels}
                                                        tooltip={false}
                                                        value={values?.ListOfSymptomsCapturingData?.[index]?.serverity}
                                                        onChange={(e) => handleFieldOnchange(e, index, setFieldValue, 'serverity')}
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
                                                        {["Yes", "No"].map((life) => (
                                                            <Label
                                                                key={life}
                                                                className="d-flex align-center me-3"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`ListOfSymptomsCapturingData[${index}].isAffectingLife`}
                                                                    value={life}
                                                                    checked={sympt?.isAffectingLife === life}
                                                                    onChange={(e) => handleFieldOnchange(e?.target?.value, index, setFieldValue, 'isAffectingLife')}
                                                                />
                                                                &nbsp;
                                                                {life.charAt(0).toUpperCase() +
                                                                    life.slice(1)}
                                                            </Label>
                                                        ))}
                                                    </FormGroup>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </>
                                )
                            })}
                        </Row>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="al_grey_borderbtn"
                            onClick={() => {
                                // setTab("2");
                            }}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="al_savebtn mx-3"
                        // onClick={() => setIsShowconfirm(true)}
                        >
                            Proceed
                        </button>
                    </div>
                </>
            )}

            </Formik>
        </React.Fragment>
    )
}