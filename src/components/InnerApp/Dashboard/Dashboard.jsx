import React, { useState } from 'react';
import { TabContent, TabPane, NavLink, Nav, NavItem, Card, CardBody, Row, Col } from 'reactstrap';
import meditation from '../../../images/meditation.svg';
import stress from '../../../images/stress.svg';
import exercise from '../../../images/exercise.svg';
import sleep from '../../../images/sleep.svg';
import pulse from '../../../images/pulse.svg';
import goalreached from '../../../images/goalreached.svg';
import bloodpressure from '../../../images/bloodpressure.svg';
import bloodsugar from '../../../images/bloodsugar.svg';
import weight from '../../../images/weight.svg';

export default function Dashboard1() {

    const [tab, setTab] = useState("1");

    return (
        <>
            <div className="wflexLayout">
                <div className='wflexScroll al-pad'>
                    <h3 className='bc_main_text mb-3'>Dashboard</h3>
                    <Nav tabs className="al_tabs mb-3">
                        <NavItem>
                            <NavLink className={tab === "1" ? "active" : ""}
                                onClick={() => {
                                    setTab("1");

                                }}>
                                <span className="d-none d-sm-block">Life Style</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "2" ? "active" : ""}
                                onClick={() => {
                                    setTab("2");
                                }}>
                                <span className="d-none d-sm-block">Afib</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "3" ? "active" : ""}
                                onClick={() => {
                                    setTab("3");
                                }}>
                                <span className="d-none d-sm-block">Risk Factors</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tab}>
                        <TabPane tabId="1" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Meditation</div>
                                            <img src={meditation} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>01</h3>Hrs</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Stress</div>
                                            <img src={stress} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>40</h3>Normal</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Exercise</div>
                                            <img src={exercise} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>02</h3>Hrs</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Sleep</div>
                                            <img src={sleep} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>08</h3>Hrs</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Pulse</div>
                                            <img src={pulse} alt="" />
                                            <div className='mt-3'><h3 className='mb-0'>98</h3></div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Goal Reached</div>
                                            <img src={goalreached} alt="" />
                                            <div className='mt-3'><h3 className='mb-0'>48</h3></div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Blood pressure</div>
                                            <img src={bloodpressure} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>130</h3>80</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Blood Sugar</div>
                                            <img src={bloodsugar} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>5.8</h3>Normal</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Weight</div>
                                            <img src={weight} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>80</h3>Kgs</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Pulse</div>
                                            <img src={pulse} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'><h3 className='mb-0'>79</h3></div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                    {/* <div className='my-2'>
                                        <button type="button" className='al_grey_borderbtn me-2'>Schedules</button>
                                        <button type="button" className='al_grey_borderbtn me-2'>Doctors</button>
                                        <button type="button" className='al_grey_borderbtn'>BMI Calculator</button>
                                    </div> */}
                    <div className='mt-3'>
                        <h6 className='mb-0'>Knowledge Bank</h6>
                        <Row className='mt-3 al_knowldgebank'>
                            <Col lg="2" sm="3">
                                <iframe width="100%" height="105" src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                <div className='mt-2'>Text of the printing and typesetting industry.</div>
                            </Col>
                            <Col lg="2" sm="3">
                                <iframe width="100%" height="105" src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                <div className='mt-2'>Text of the printing and typesetting industry.</div>
                            </Col>
                            <Col lg="2" sm="3">
                                <iframe width="100%" height="105" src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                <div className='mt-2'>Text of the printing and typesetting industry.</div>
                            </Col>
                            <Col lg="2" sm="3">
                                <iframe width="100%" height="105" src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                <div className='mt-2'>Text of the printing and typesetting industry.</div>
                            </Col>
                        </Row>
                        <button className='al_grey_borderbtn w-auto mt-3'>More</button>
                    </div>
                </div>
            </div>
        </>
    )
}