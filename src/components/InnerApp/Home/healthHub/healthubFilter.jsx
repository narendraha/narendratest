import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getActionTypes, getWeekoptions } from '../../../../_mock/helperIndex';
import { getHealthHubProgressRequest, setSelectedHealthHubWeekValues } from '../../../../store/Home/slice';
import { setActionTypeAndActionData } from '../../../../store/UtilityCallFunction/slice';

const weekoptions = getWeekoptions;

const horizontalLabels = [
    { label: "Knowledge", value: 0 },
    { label: "Awareness", value: 25 },
    { label: "Exposure", value: 50 },
    { label: "Experience", value: 75 },
    { label: "Expertise", value: 95 }
];

const HealthubFilter = () => {
    const dispatch = useDispatch();

    const { selectedHealthHubWeek, healthHubProgressDetails } = useSelector((state) => state?.homePageSlice);

    let weekOptionsWithDiabledKey = weekoptions?.map((x) => {
        let value = healthHubProgressDetails?.[x.value];
        let isSkippedWeek = value === "none";
        let isCompletedWeek = value === true
        return {
            ...x,
            isDisabled: !healthHubProgressDetails?.[x.value],
            icon: isCompletedWeek ? "icon_alfred_circle_check_solid " : isSkippedWeek ? "icon_alfred_circle_xmark_solid" : "",
            class: isCompletedWeek ? "al_complete" : isSkippedWeek ? "al_skipped" : "",
        }
    });

    useEffect(() => {
        dispatch(getHealthHubProgressRequest())
    }, [])

    const handleSelect = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: null }))
    }

    const handleWeekSelection = (e) => {
        dispatch(setSelectedHealthHubWeekValues(e))
    }

    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col className="d-flex align-items-center mb-3">
                    <div className="w-25">
                        <Select
                            options={weekOptionsWithDiabledKey}
                            name="weeklevel"
                            className="inputSelect"
                            value={selectedHealthHubWeek || weekoptions[0] || ""}
                            onChange={(e) => handleWeekSelection(e)}
                            isOptionDisabled={(option) => option?.isDisabled}
                        />
                    </div>
                    <i className="icon_alfred_overview al_text_link text-decoration-none pointer mx-3" id="overviewtooltip" style={{ fontSize: "22px" }} onClick={handleSelect}></i>
                    <UncontrolledTooltip
                        modifiers={[{
                            preventOverflow: {
                                boundariesElement: "window",
                            },
                        }]}
                        placement="right"
                        trigger='hover'
                        target="overviewtooltip"
                    >
                        Overview
                    </UncontrolledTooltip>
                    <div className="w-auto px-3 al_button_sm al_greyborderbutton">
                        <div className="fw-medium">Skip</div>
                    </div>
                </Col>
                <Col lg="4" md="6" sm="6">
                    <Row className="align-items-center">
                        <span className="w-auto px-0">Progress</span>
                        <Col className="healthhubprogress px-0">
                            <ol className="al_progress mb-0">
                                {horizontalLabels?.map((x, index) => {
                                    return <li key={index} className={weekOptionsWithDiabledKey[index]?.class} title={x?.label}><i className={weekOptionsWithDiabledKey[index]?.icon}></i></li>
                                })}
                            </ol>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </React.Fragment >
    )
}

export default HealthubFilter