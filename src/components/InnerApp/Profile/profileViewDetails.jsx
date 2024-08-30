import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Label, Row, UncontrolledTooltip } from "reactstrap";
import { getActionTypes, getProfileTabs } from '../../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

export const ProfileViewDetails = () => {
    const dispatch = useDispatch();

    const { getProfileDetails } = useSelector((state) => state?.utilityCallFunctionSlice);

    function maskssn(input) {
        if (input !== "NA" && input !== undefined && input?.length < 2) {
            return input;
        }
        const lastTwoChars = input?.slice(-3);
        const maskedPart = "*".repeat(input?.length - 3);
        return `${maskedPart}${lastTwoChars}`;
    }

    const openModelHandle = (actionType, actionData) => {
        dispatch(setActionTypeAndActionData({ actionType, actionData }))
    }

    return (
        <React.Fragment>
            <h2 className="cs_semibold mb-1 text-capitalize">
                {getProfileDetails?.username}
            </h2>
            <h6 className="al_profile_role mb-2">
                {getProfileDetails?.email}
            </h6>
            <div className="al_pointsearned mb-4">
                Points Earned: 89
            </div>
            <Row>
                <Col>
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.subscription === "NA" ? "No Plan is Available" : "N/A"}</div>
                        <Label>Your Subscription Plan</Label>
                    </div>
                </Col>
                <div className="px-3 w-auto">
                    <button
                        type="button"
                        className="al_upgrade_btn al_basic"
                        disabled={true}
                    >
                        Upgrade Plan
                        <i className="ps-1 icon_alfred_password"></i>
                    </button>
                </div>
            </Row>
            <hr />
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.feet > 0 ? `${getProfileDetails?.feet}.${getProfileDetails?.inch !== "NA" ? getProfileDetails?.inch : "00"}` : "N/A"}</div>
                        <Label>Height (ft)</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.weight || "N/A"}</div>
                        <Label>Weight (lbs)</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.bloodtype || "N/A"}</div>
                        <Label>Blood Type</Label>
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.rtype || "N/A"}</div>
                        <Label>Residence Type</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.education || "N/A"}</div>
                        <Label>Highest Education</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.dob || "N/A"}</div>
                        <Label>Date of Birth</Label>
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.age || "N/A"}</div>
                        <Label>Age</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.gender || "N/A"}</div>
                        <Label>Gender</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.ssn !== "NA" && getProfileDetails?.ssn !== undefined ? maskssn(getProfileDetails?.ssn) : "N/A"}</div>
                        <Label>SSN</Label>
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{+getProfileDetails?.mobile || "N/A"}</div>
                        <Label>Mobile</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.nationality || "N/A"}</div>
                        <Label>Nationality</Label>
                    </div>
                </Col>
                <Col md="4" sm="12">
                    <div className="al_profiledata">
                        <div>{getProfileDetails?.bmi || "N/A"}</div>
                        <Label>BMI<i className="icon_alfred_info ms-2" style={{ verticalAlign: "middle" }} id="bmiinfo"></i></Label>
                        <UncontrolledTooltip
                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                            placement='bottom' target="bmiinfo">
                            BMI will be updated automatically when height and weight are changed
                        </UncontrolledTooltip>
                    </div>
                </Col>
            </Row>
            <hr />
            <h6>KYC Information</h6>
            <div className="al_profiledata">
                <Label>PIV ID</Label>
                <div className="d-flex wrap my-2">
                    <div className="d-flex align-items-center">
                        <i
                            className="icon_alfred_image me-2"
                            style={{ fontSize: "16px", color: "#939BA7" }}
                        ></i>
                        <span style={{ color: "#939BA7" }}>
                            PIV-idfrontside.jpg
                        </span>
                    </div>
                    <a href="/#" className="text-grey" style={{ pointerEvents: "none" }}>View<i className="ps-1 icon_alfred_password"></i></a>
                </div>

                <div className="d-flex wrap my-2">
                    <div className="d-flex align-items-center">
                        <i
                            className="icon_alfred_image me-2"
                            style={{ fontSize: "16px", color: "#939BA7" }}
                        ></i>
                        <span style={{ color: "#939BA7" }}>
                            PIV-idbackside.jpg
                        </span>
                    </div>
                    <a href="/#" className="text-grey" style={{ pointerEvents: "none" }}>View<i className="ps-1 icon_alfred_password"></i></a>
                </div>
            </div>
            <hr />
            <Row>
                <Col md="6" sm="12">
                    <div className="al_profiledata">
                        <div>
                            {getProfileDetails?.insurance_provider || "N/A"}
                        </div>
                        <Label>Name of Insurance Provider</Label>
                    </div>
                </Col>
                <Col md="6" sm="12">
                    <div className="al_profiledata">
                        <div>
                            {getProfileDetails?.insurance_policy_no || "N/A"}
                        </div>
                        <Label>Insurance Policy / Card Number</Label>
                    </div>
                </Col>
            </Row>
            <hr />
            <div className="al_profilebtns">
                <button type="button" className="mb-3" onClick={() => openModelHandle(getActionTypes.SELECT, getProfileTabs.CHANGEPASSWORD)}>
                    <i className="icon_alfred_password"></i>Change Password
                </button>
                <button type="button" className="mb-3" onClick={() => openModelHandle(getActionTypes.SELECT, getProfileTabs.BANKDETAILS)}>
                    <i className="icon_alfred_bankcard"></i>Bank Card
                </button>
                <button type="button" className="mb-3" onClick={() => openModelHandle(getActionTypes.SELECT, getProfileTabs.SETTINGS)}>
                    <i className="icon_alfred_menu_settings"></i>Settings
                </button>
            </div>
            <div className="mt-3">
                <button
                    type="submit"
                    className="al_savebtn"
                    onClick={() => openModelHandle(getActionTypes.EDIT)}
                >
                    Edit
                </button>
            </div>
        </React.Fragment>
    )
}
