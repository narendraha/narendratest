import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from "reactstrap";
import { getActivetab } from '../../../_mock/internalJsControl';
import riskmanagement from "../../../images/riskmanagement.png";
import riskmanagement2 from "../../../images/riskmanagement2.jpg";
import riskmanagement3 from "../../../images/riskmanagement3.jpg";
import { setActiveTabRequest } from '../../../store/Home/slice';

export const RiskOptimization = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.ORMANAGEMENT, nextOrBackTab: null }))
    }, []);

    return (
        <React.Fragment>
            <Row className="mt-4">
                <Col xl="4" md="6" sm="12" className="mb-3">
                    <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={riskmanagement} alt="" />
                                <div className="p-3">
                                    <p>
                                        Refer to your managing my AF and risk of stroke
                                        guide if you get an episode of AF
                                    </p>
                                    <div className="text-info text-end fw-medium">
                                        Know more
                                        <i
                                            className="icon_alfred_right_arrow ms-1"
                                            style={{
                                                verticalAlign: "middle",
                                                fontSize: "10px",
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="standardPlans p-4 ps-5 flip-card-back">
                                <li>
                                    Refer to your managing my AF and risk of stroke
                                    guide if you get an episode of AF
                                </li>
                                <li>Learn about your AF medicines</li>
                                <li>Feel your pulse every morning and evening</li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl="4" md="6" sm="12" className="mb-3">
                    <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={riskmanagement2} alt="" />
                                <div className="p-3">
                                    <p>
                                        Take your AF medications the way doctor tells
                                        you, and do not run out of medication
                                    </p>
                                    <div className="text-info text-end fw-medium">
                                        Know more
                                        <i
                                            className="icon_alfred_right_arrow ms-1"
                                            style={{
                                                verticalAlign: "middle",
                                                fontSize: "10px",
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="standardPlans p-4 ps-5 flip-card-back">
                                <li>
                                    Take your AF medications the way doctor tells you,
                                    and do not run out of medication
                                </li>
                                <li>
                                    Visit your doctors regularly and ask questions if
                                    you have any concerns
                                </li>
                                <li>
                                    Keep an up-to-date list of all medications which
                                    you are using
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col xl="4" md="6" sm="12" className="mb-3">
                    <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={riskmanagement3} alt="" />
                                <div className="p-3">
                                    <p>
                                        Know your stroke risk factors and keep a record
                                        of your CHADS score in this booklet
                                    </p>
                                    <div className="text-info text-end fw-medium">
                                        Know more
                                        <i
                                            className="icon_alfred_right_arrow ms-1"
                                            style={{
                                                verticalAlign: "middle",
                                                fontSize: "10px",
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="standardPlans p-4 ps-5 flip-card-back">
                                <li>
                                    Know your stroke risk factors and keep a record of
                                    your CHADS score in this booklet
                                </li>
                                <li>
                                    Reduce your risk of more frequent or severe AF and
                                    risk of stroke by choosing a healthy lifestyle
                                </li>
                                <li>
                                    If you take Warfarin, make sure that you have
                                    regular blood tests and keep a record of your
                                    results
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}