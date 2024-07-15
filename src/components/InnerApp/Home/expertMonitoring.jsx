import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from 'reactstrap';
import bulb from "../../../images/idea.png";
import { getHealthDetailsLastUpdateRequest } from "../../../store/Home/slice";
import { ExpertMonitoringLeftView } from "./expertMonitoringLeftView";
import { ExpertMonitoringRightView } from "./expertMonitoringRightView";

export const ExpertMonitoring = () => {
    const dispatch = useDispatch();

    const { lastUpdatedHealthDetails } = useSelector((state) => state?.homePageSlice);

    useEffect(() => {
        dispatch(getHealthDetailsLastUpdateRequest())
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mb-2">
                <h5 className="mb-0">Health details </h5>
                {lastUpdatedHealthDetails?.difference >= 0 ? (
                    <div className="d-flex align-items-center justify-content-end gap-1 al_note_content">
                        <img src={bulb} alt="" width={20} />
                        You, Last gave your vital{" "}
                        {lastUpdatedHealthDetails?.difference != 0 &&
                            <>
                                <span style={{ color: "#3bc0c3" }}>
                                    {lastUpdatedHealthDetails?.difference}
                                </span>
                                days ago{" "}
                            </>}
                        on
                        <span style={{ color: "#3bc0c3" }}>
                            {lastUpdatedHealthDetails?.date}
                        </span>
                    </div>
                ) : null}
            </div>
            <Row className="flex-row-xs-reverse">
                <Col lg="6" sm="12">
                    <ExpertMonitoringLeftView />
                </Col>
                <Col lg="6" sm="12">
                    <ExpertMonitoringRightView />
                </Col>
            </Row>
        </React.Fragment>
    )
}