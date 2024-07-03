import React from "react";
import { Form, Formik } from "formik";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { getActionTypes } from "../../../_mock/internalJsControl";
import { addSymptomsDetailRequest, setActionTypeAndActionData } from "../../../store/Home/slice";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import Loading from "../LoadingComponent";

const horizontalLabels = {
    0: "None",
    20: "Mild",
    45: "Moderate",
    70: "Severe",
    90: "Extreme",
};

let frequencyList = ["Never", "Occasionally", "Often", "Always"];

export const SymptomsListForm = () => {
    
    const dispatch = useDispatch();

    const { actionType, actionData, isLoading } = useSelector((state) => state?.homePageSlice)

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
        let value = field === 'serverity' ? ((e <= 30 && e > 10) ? 20 : (e <= 55 && e > 35) ? 45 : (e <= 80 && e > 55) ? 70 : (e <= 100 && e > 80) ? 90 : 0) : e
        setFieldValue(`ListOfSymptomsCapturingData[${i}].${field}`, value)
    }

    const handleSubmitForm = () => {
        dispatch(addSymptomsDetailRequest(actionData))
    }

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <ConfirmationAction newFun={handleSubmitForm} open={actionType === getActionTypes.ISCONFIRM} />
            <p>Select the symptoms range listed below</p>
            <Formik
                initialValues={getInitialValues()}
                // validationSchema={{}}
                onSubmit={(values) => {
                    console.log("values=>", values)
                    dispatch(setActionTypeAndActionData({ actionType: getActionTypes.ISCONFIRM, actionData: values }))
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <Form>
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
                                type="submit"
                                className="al_savebtn mx-3"
                            // onClick={() => setIsShowconfirm(true)}
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