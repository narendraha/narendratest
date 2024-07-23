import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from 'reactstrap';
import { getActionTypes } from "../../../_mock/helperIndex";
import bulb from "../../../images/idea.png";
import { getHealthDetailsLastUpdateRequest } from "../../../store/Home/slice";
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";
import { ExpertMonitoringLeftView } from "./expertMonitoringLeftView";
import { ExpertMonitoringRightView } from "./expertMonitoringRightView";
import { UncontrolledTooltip } from "reactstrap";

export const ExpertMonitoring = () => {
    const dispatch = useDispatch();

    const { lastUpdatedHealthDetails } = useSelector((state) => state?.homePageSlice);

    useEffect(() => {
        dispatch(getHealthDetailsLastUpdateRequest())
    }, [dispatch]);

    const handleSelect = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: null }))
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mb-2">
                <h5 className="mb-0">Health details </h5>
                {lastUpdatedHealthDetails?.difference >= 0 ? (
                    <div className="d-flex align-items-center justify-content-end gap-1 al_note_content">
                        <img src={bulb} alt="" width={20} />
                        You, Last gave your vital{" "}
                        <span style={{ color: "#3bc0c3" }}>
                            {+lastUpdatedHealthDetails?.difference === 0 ? "today " : lastUpdatedHealthDetails?.difference}
                        </span>
                        {+lastUpdatedHealthDetails?.difference !== 0 ? "days ago " : ""}
                        on
                        <span className="al_text_link" onClick={handleSelect}>
                            {lastUpdatedHealthDetails?.date}
                        </span>
                        <i className="icon_alfred_info text-info ms-2" style={{ verticalAlign: "middle" }} id="vitalInfo"></i>
                        <UncontrolledTooltip
                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                            placement='top' target="vitalInfo">
                            check you last updated vital by clicking on Date
                        </UncontrolledTooltip>
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