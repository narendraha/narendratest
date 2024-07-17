import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, FormGroup, Label, Row, Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes, getActivetab } from "../../../_mock/internalJsControl";
import bulb from "../../../images/idea.png";
import { addSymptomsDetailRequest, getSymptomsDetailsLastUpdateRequest, setActiveTabRequest } from "../../../store/Home/slice";
import { setConfirmationOpen } from "../../../store/UtilityCallFunction/slice";

const horizontalLabels = {
    0: "None",
    20: "Mild",
    45: "Moderate",
    70: "Severe",
    90: "Extreme",
};

let frequencyList = ["Never", "Occasionally", "Often", "Always"];

let lsitOfSymptoms = [
    { key: "breathnessda", symptomName: "Breathlessness during activity", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "breathnessea", symptomName: "Breathlessness even at rest", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "dizziness", symptomName: "Dizziness", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "col_swet", symptomName: "Cold sweat", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "chest_pain", symptomName: "Chest pain", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "pressurechest", symptomName: "Pressure / discomfort in chest", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "worry", symptomName: "Worry", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "weakness", symptomName: "Weakness", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "infirmity", symptomName: "Infirmity", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "nsynacpe", symptomName: "Near syncope", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "syncope", symptomName: "Syncope", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "tirednessafterwards", symptomName: "Tiredness afterwards", frequency: "", serverity: "", isAffectingLife: "" }
];

export const SymptomsListForm = () => {

    const dispatch = useDispatch();

    const { lastUpdatedSymptomsDetails } = useSelector((state) => state?.homePageSlice);

    useEffect(() => {
        dispatch(getSymptomsDetailsLastUpdateRequest())
    }, [])

    const handleFieldOnchange = (e, i, setFieldValue, field) => {
        let value = field === 'serverity' ? ((e <= 30 && e > 10) ? 20 : (e <= 55 && e > 35) ? 45 : (e <= 80 && e > 55) ? 70 : (e <= 100 && e > 80) ? 90 : 0) : e
        setFieldValue(`ListOfSymptomsCapturingData[${i}].${field}`, value)
    }

    const handleSubmit = (data) => {
        dispatch(addSymptomsDetailRequest(data))
    }

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.SYMPTOMSLIST, nextOrBackTab: getActivetab.EXPTMONITORING }))
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mb-2">
                <p>Select the symptoms range listed below</p>
                {lastUpdatedSymptomsDetails?.difference >= 0 ? (
                    <div className="d-flex align-items-center justify-content-end gap-1 al_note_content">
                        <img src={bulb} alt="" width={20} />
                        You, Last gave your symptoms{" "}
                        <span style={{ color: "#3bc0c3" }}>
                            {lastUpdatedSymptomsDetails?.difference === 0 ? "today " : lastUpdatedSymptomsDetails?.difference}
                        </span>
                        {lastUpdatedSymptomsDetails?.difference != 0 ? "days ago " : ""}
                        on
                        <span style={{ color: "#3bc0c3" }}>
                            {lastUpdatedSymptomsDetails?.date}
                        </span>
                    </div>
                ) : null}
                <Modal className='modal-md detailsModal' isOpen={false} wrapClassName="al_outerparentwp">
                    <div className='d-flex align-items-center justify-content-between p-4'>
                        <h6 className='mb-0'>Last Updated Symptoms (18-06-2024)</h6>
                        <i className="icon_alfred_close pointer" title="Close" onClick={() => { }}></i>
                    </div>
                    <ModalBody className="wflexLayout p-0">
                        <div className='wflexScroll mb-3'>
                            <Table borderless className='al_listtable al-pad pt-0 mb-0 al_symtomdetails'>
                                <thead className='sticky_header'>
                                    <tr>
                                        <th>Symptom</th>
                                        <th>Frequency</th>
                                        <th>Severity</th>
                                        <th>Effecting quality of life</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cold sweat</td>
                                        <td>Occasionally</td>
                                        <td>Extreme</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Chest Pain</td>
                                        <td>Often</td>
                                        <td>Moderate</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Pressure/Discomfort in chest</td>
                                        <td>Always</td>
                                        <td>Extreme</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            <Formik
                initialValues={{
                    ListOfSymptomsCapturingData: lsitOfSymptoms
                }}
                onSubmit={(values) => {
                    console.log("values=>", values)
                    dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, actionData: values, callApi: handleSubmit }))
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <Form>
                        <div className="al_symptoms">
                            <Row>
                                {values?.ListOfSymptomsCapturingData?.map((sympt, index) => (
                                    <Col lg="4" md="6" sm="12" key={sympt?.key} className="mb-4">
                                        <h6>{sympt.symptomName}</h6>
                                        <Card className="al_cardnoborder">
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
                                ))}
                            </Row>
                        </div>
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
                    </Form>
                </>
            )}

            </Formik>
        </React.Fragment>
    )
}