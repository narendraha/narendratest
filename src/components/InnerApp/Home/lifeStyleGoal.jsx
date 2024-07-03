import React, { useState } from "react";
import { Col, Label, Row, Table } from "reactstrap";

export const EGoalTimePeriod = {
    WEEKWISE: 0,
    DAYSWISE: 1,
    MONTHWISE: 2,
};

export const LifeStyleGoal = () => {

    const [getActiveLifestyleGoal, setActiveLifestleGoal] = useState(
        EGoalTimePeriod.WEEKWISE
    );

    const [patientAndSymptomsDetails, setPatientAndSymptomsDetails] = useState({
        patientDetails: null,
        symptomsDetails: null,
    });
    return (
        <React.Fragment>
            <p>Select where you want to be coached in</p>
            <div className="w-100">
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
                        <Col lg="4" sm="6">
                            <p className="al_note">Your Details</p>
                            <h5 className="mb-2 text-capitalize">
                                Hello,{" "}
                                {patientAndSymptomsDetails?.patientDetails
                                    ?.username || "N/A"}
                                !
                            </h5>
                            <div>
                                <strong>Age: </strong>
                                <span>
                                    {patientAndSymptomsDetails?.patientDetails
                                        ?.age || "N/A"}
                                </span>
                            </div>
                            <div>
                                <strong>Gender: </strong>
                                <span>
                                    {patientAndSymptomsDetails?.patientDetails
                                        ?.gender || "N/A"}
                                </span>
                            </div>
                            <div>
                                <strong>Residence type: </strong>
                                <span>
                                    {patientAndSymptomsDetails?.patientDetails
                                        ?.rtype || "N/A"}
                                </span>
                            </div>
                            <div>
                                <strong>Education: </strong>
                                <span>
                                    {patientAndSymptomsDetails?.patientDetails
                                        ?.education || "N?A"}
                                </span>
                            </div>
                        </Col>
                        <Col lg="8" sm="6">
                            <h6 className="mt-3 mb-2">Your Medication</h6>
                            <Row>
                                <Col lg="6" sm="12">
                                    <Table borderless responsive>
                                        <thead>
                                            <tr>
                                                <th>Symptoms</th>
                                                <th className="w-25">Range</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {patientAndSymptomsDetails.symptomsDetails && Object.keys(patientAndSymptomsDetails.symptomsDetails)?.map((key, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{lifeStyleGoalSymptomsKeys[key]}</td>
                                      <td className="text-warning">{patientAndSymptomsDetails?.symptomsDetails[key]?.severity}</td>
                                    </tr>
                                  </>
                                )
                              })} */}
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
                        </Col>
                    </Row>

                    <hr />
                    <h6 className="mt-3">
                        Choose the time period to set your goal
                    </h6>

                    <Row className="mb-4">
                        <Col lg="3" sm="6">
                            <div
                                className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                                    EGoalTimePeriod.WEEKWISE
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setActiveLifestleGoal(EGoalTimePeriod.WEEKWISE)
                                }
                            >
                                Create goal for <strong>1 week</strong>
                            </div>
                        </Col>
                        <Col lg="3" sm="6">
                            <div
                                className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                                    EGoalTimePeriod.DAYSWISE
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setActiveLifestleGoal(EGoalTimePeriod.DAYSWISE)
                                }
                            >
                                Create goal for <strong>15 days</strong>
                            </div>
                        </Col>
                        <Col lg="3" sm="6">
                            <div
                                className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                                    EGoalTimePeriod.MONTHWISE
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setActiveLifestleGoal(EGoalTimePeriod.MONTHWISE)
                                }
                            >
                                Create goal for <strong>1 month</strong>
                            </div>
                        </Col>
                    </Row>
                    <p className="al_note mb-3">
                        Disclaimer: Goal will be created based on the list of
                        symptoms you have selected and the data you have
                        provided in this application{" "}
                    </p>

                    <button
                        type="button"
                        className="al_savebtn"
                        // onClick={() => setTab("5")}
                    >
                        OK
                    </button>
                    {/* <LayoutAlertMessage /> */}
                </div>
            </div>
        </React.Fragment>
    )
}