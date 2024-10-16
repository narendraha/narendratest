import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getActionTypes, getWeekoptions } from '../../../../_mock/helperIndex';
import { getHealthHubProgressRequest, getWeekWiseHealthHubContentRequest, setHealthHubSkippedWeekRequest, setSelectedHealthHubWeekValues } from '../../../../store/Home/slice';

import { setActionTypeAndActionData } from '../../../../store/UtilityCallFunction/slice';

const weekoptions = getWeekoptions;

const HealthubFilter = () => {
    const dispatch = useDispatch();
    const { selectedHealthHubWeek, healthHubProgressDetails, currentProgressWeek } = useSelector((state) => state?.homePageSlice);

    const [visibleWeekRange, setVisibleWeekRange] = useState([0, 5]);// State to manage the visible weeks in the progress bar (initially show the first 5 weeks)

    let weekOptionsWithDiabledKey = weekoptions?.map((x) => {
        let value = healthHubProgressDetails?.[x.value],
            isSkippedWeek = (value === null),
            inProgressWeek = (currentProgressWeek?.value === x.value),
            isCompletedWeek = (value === true && !inProgressWeek),
            isNotCompleteWeek = (value === false);
        return {
            ...x,
            isDisabled: isNotCompleteWeek,
            icon: isCompletedWeek ? "icon_alfred_circle_check_solid " : isSkippedWeek ? "icon_alfred_circle_xmark_solid" : "",
            class: isCompletedWeek ? "al_complete" : isSkippedWeek ? "al_skipped" : inProgressWeek ? "al_current" : "",
        }
    });

    useEffect(() => {
        dispatch(getHealthHubProgressRequest())
    }, [dispatch])

    const handleSelect = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: null }))
    }

    const setSelectedWeekIndexVisibility = (e) => {
        const selectedIndex = weekoptions.findIndex(option => option.value === e?.value);

        // If the selected week is between 1 and 5 (index 0 to 4), reset the range to show the first 5 weeks
        if (selectedIndex < 5) {
            setVisibleWeekRange([0, 5]);
        } else {
            setVisibleWeekRange([selectedIndex - 4, selectedIndex + 1]);
        }
    }

    const handleWeekSelection = (e) => {
        dispatch(setSelectedHealthHubWeekValues(e))
        dispatch(getWeekWiseHealthHubContentRequest(e?.value))
        setSelectedWeekIndexVisibility(e)
    }

    useEffect(() => {
        setSelectedWeekIndexVisibility(selectedHealthHubWeek)
    }, [selectedHealthHubWeek])

    const skipWeekHandle = () => {
        dispatch(setHealthHubSkippedWeekRequest(selectedHealthHubWeek || currentProgressWeek))
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
                            value={selectedHealthHubWeek || currentProgressWeek || ""}
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
                        <div className="fw-medium" onClick={skipWeekHandle}>Skip</div>
                    </div>
                    <button className="w-auto mx-3 px-2 py-1 al_button_sm al_savebtn" style={{ minWidth: "auto" }}>
                        <i className='icon_alfred_share'></i>
                    </button>
                </Col>
                <Col lg="4" md="6" sm="6">
                    <Row className="align-items-center">
                        <span className="w-auto pe-0">Progress</span>
                        <Col className="healthhubprogress px-0">
                            <ol className="al_progress mb-0">
                                {weekoptions?.slice(visibleWeekRange[0], visibleWeekRange[1]).map((x, index) => {
                                    const actualIndex = visibleWeekRange[0] + index;
                                    return (
                                        <li
                                            key={actualIndex}
                                            className={weekOptionsWithDiabledKey[actualIndex]?.class}
                                            title={x?.label}
                                        >
                                            <i className={weekOptionsWithDiabledKey[actualIndex]?.icon}></i>
                                        </li>
                                    );
                                })}
                            </ol>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </React.Fragment >
    )
}

export default HealthubFilter;
