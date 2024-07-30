import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Label, Row, Table } from "reactstrap";
import { getActivetab } from "../../../../_mock/internalJsControl";
import { setActiveTabRequest } from "../../../../store/Home/slice";
import LifeStyleGoalTabs from "./lifeStyleGoalTabs";

export const getGoalTimePeriod = {
    WEEKWISE: 0,
    DAYSWISE: 1,
    MONTHWISE: 2,
};

export const LifeStyleGoal = () => {
    const dispatch = useDispatch();

    const { getProfileDetails } = useSelector((state) => state?.utilityCallFunctionSlice);

    const handleSetTabs = (isBack = null) => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.LIFEGOAL, nextOrBackTab: isBack ? isBack : getActivetab.ORMANAGEMENT }))
    }

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
                                Hello,{getProfileDetails?.username || "N/A"}!
                            </h5>
                            <div>
                                <strong>Age: </strong>
                                <span>{getProfileDetails?.age || "N/A"}</span>
                            </div>
                            <div>
                                <strong>Gender: </strong>
                                <span>{getProfileDetails?.gender || "N/A"}</span>
                            </div>
                            <div>
                                <strong>Residence type: </strong>
                                <span>{getProfileDetails?.rtype || "N/A"}</span>
                            </div>
                            <div>
                                <strong>Education: </strong>
                                <span>{getProfileDetails?.education || "N/A"}</span>
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

                    <LifeStyleGoalTabs />
                    <p className="al_note mb-3">
                        Disclaimer: Goal will be created based on the list of
                        symptoms you have selected and the data you have
                        provided in this application{" "}
                    </p>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="al_grey_borderbtn"
                            onClick={() => handleSetTabs(getActivetab.SYMPTOMSLIST)}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="al_savebtn mx-3"
                            onClick={() => handleSetTabs()}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}