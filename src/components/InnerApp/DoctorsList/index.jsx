import React, { useState } from 'react';
import Switch from "react-switch";
import { Card, CardBody, Col, Label, Row } from 'reactstrap';
import doctorImg from '../../../images/docimg.png';

export default function DoctorsList() {
    const [view, setView] = useState("view");

    return (
        <>
            <div className="wflexLayout">
                <div className='al-pad d-flex align-items-center pb-1'>
                    <Col>
                        <h3 className='bc_main_text mb-0'>Your Doctors</h3>
                    </Col>
                    <div className='w-auto'>
                        <div className="al_searchleft px-0">
                            <input type="text" className="form-control" placeholder="Search" />
                            <i className="icon_alfred_search"></i>
                        </div>
                    </div>
                </div>
                <Row className='wflexLayout h-100'>
                    <Col lg="8" sm="7" className='h-100'>
                        <div className='wflexLayout'>
                            <div className='wflexScroll d-flex flex-column al-pad pe-3'>
                                <div className='flex-grow-1'>
                                    <Row className='al_doctorwidth'>
                                        <Col lg="6" md="12" sm="12" className='mb-3'>
                                            <Card className='al_cardview active'>
                                                <CardBody className='d-flex flex-column'>
                                                    <div className='flex-grow-1'>
                                                        <Row className='mx-0 align-items-center'>
                                                            <div className='al_useravatarimg px-0'>
                                                                <img src={doctorImg} alt="" />
                                                            </div>
                                                            <Col>
                                                                <div className='fw-medium'>Dr. George</div>
                                                                <small className='text-muted'>Cardiology, MD,DM</small>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <hr />
                                                    <Row>
                                                        <Col>
                                                            <Label>Doctor Type</Label>
                                                            <div className='fw-medium'>Primary Doctor</div>
                                                        </Col>
                                                        <Col className='w-auto'>
                                                            <Label>From</Label>
                                                            <div className='fw-medium'>09-06-2024</div>
                                                        </Col>
                                                        <div className='w-auto al_cardactions'>
                                                            <i className='icon_alfred_trashbin'></i>
                                                            <button type="button" className='al_roundbtn al_roundbtn_sm'><i className='icon_alfred_right_arrow'></i></button>
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="6" md="12" sm="12" className='mb-3'>
                                            <Card className='al_cardview'>
                                                <CardBody className='d-flex flex-column'>
                                                    <div className='flex-grow-1'>
                                                        <Row className='mx-0 align-items-center'>
                                                            <div className='al_useravatarimg px-0'>
                                                                <img src={doctorImg} alt="" />
                                                            </div>
                                                            <Col>
                                                                <div className='fw-medium'>Dr. Nicholas</div>
                                                                <small className='text-muted'>Cardiology, MD,DM</small>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <hr />
                                                    <Row>
                                                        <Col>
                                                            <Label>Doctor Type</Label>
                                                            <div className='fw-medium'>Primary Doctor</div>
                                                        </Col>
                                                        <Col className='w-auto'>
                                                            <Label>From</Label>
                                                            <div className='fw-medium'>09-06-2024</div>
                                                        </Col>
                                                        <div className='w-auto al_cardactions'>
                                                            <i className='icon_alfred_trashbin'></i>
                                                            <button type="button" className='al_roundbtn al_roundbtn_sm'><i className='icon_alfred_right_arrow'></i></button>
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="6" md="12" sm="12" className='mb-3'>
                                            <Card className='al_cardview'>
                                                <CardBody className='d-flex flex-column'>
                                                    <div className='flex-grow-1'>
                                                        <Row className='mx-0 align-items-center'>
                                                            <div className='al_useravatarimg px-0'>
                                                                <img src={doctorImg} alt="" />
                                                            </div>
                                                            <Col>
                                                                <div className='fw-medium'>Dr. Ali Razzak</div>
                                                                <small className='text-muted'>Cardiology, MD,DM</small>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <hr />
                                                    <Row>
                                                        <Col>
                                                            <Label>Doctor Type</Label>
                                                            <div className='fw-medium'>Primary Doctor</div>
                                                        </Col>
                                                        <Col className='w-auto'>
                                                            <Label>From</Label>
                                                            <div className='fw-medium'>09-06-2024</div>
                                                        </Col>
                                                        <div className='w-auto al_cardactions'>
                                                            <i className='icon_alfred_trashbin'></i>
                                                            <button type="button" className='al_roundbtn al_roundbtn_sm'><i className='icon_alfred_right_arrow'></i></button>
                                                        </div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg="4" sm="5" className='h-100 al-pad px-3'>
                        <Card className='wflexLayout al_cardview'>
                            <CardBody className='wflexLayout pe-0'>
                                <div className='wflexScroll d-flex flex-column pe-3'>
                                    <div className='flex-grow-1'>
                                        <Row className='mx-0 align-items-center mb-3'>
                                            <div className='al_useravatarimg px-0'>
                                                <img src={doctorImg} alt="" />
                                            </div>
                                            <Col>
                                                <div className='fw-medium'>Dr. George</div>
                                                <small className='text-muted'>Cardiology, MD,DM</small><br />
                                                <span><Label>Experience :&nbsp;</Label><span className='fw-medium'>12 years</span></span>
                                            </Col>
                                        </Row>
                                        <Card className='al_cardview me-0 h-auto mb-3' style={{ boxShadow: "none" }}>
                                            <CardBody className='p-0'>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4617200764287!2d-88.10325522596554!3d30.705417730829833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x889a5205955f57b3%3A0xcd2148b401d93681!2s2451%20Fillingim%20St%2C%20Mobile%2C%20AL%2036617%2C%20USA!5e0!3m2!1sen!2sin!4v1720676496161!5m2!1sen!2sin" width="100" height="100" style={{ border: 0, width: "100%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                                <Row className='p-3'>
                                                    <Col>USA Health University Hospital 2451 Fillingim Street Mobile</Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                        <div className='mb-3'>
                                            <h6 className='mb-1'>Info</h6>
                                            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                                        </div>
                                        <Row>
                                            <Col>
                                                <Label>From</Label>
                                                <div className='fw-medium'>09-06-2024</div>
                                            </Col>
                                            <Col>
                                                <Label>To</Label>
                                                <div className='fw-medium'>09-07-2024</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}