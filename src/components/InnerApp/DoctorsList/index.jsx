import React, { useState } from 'react';
import { Card, CardBody, Col, Label, Row, FormGroup, Modal, ModalBody } from 'reactstrap';
import doctorImg from '../../../images/docimg.png';
import Select from "react-select";

export default function DoctorsList() {
    const [view, setView] = useState(false);
    const hospitalsList = [
        { value: "Hospital1", label: "Hospital1" },
        { value: "Hospital2", label: "Hospital2" },
        { value: "Hospital3", label: "Hospital3" },
        { value: "Hospital4", label: "Hospital4" }
    ];
    const doctorsList = [
        { value: "Dr. George", label: "Dr. George" },
        { value: "Dr. Ali Razaq", label: "Dr. Ali Razaq" },
        { value: "Dr. James", label: "Dr. James" },
        { value: "Dr. Adem", label: "Dr. Adem" }
    ];
    return (
        <>
            <div className="wflexLayout">
                <div className='al-pad d-flex align-items-center pb-1'>
                    <Col className='d-flex align-items-center'>
                        <h3 className='bc_main_text mb-0 me-4'>Your Doctors</h3>
                        <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                            <i className='icon_alfred_plus me-2'></i>
                            Add Doctor
                        </button>
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
                                                            <div className='fw-medium'>Secondary Doctor</div>
                                                        </Col>
                                                        <Col className='w-auto'>
                                                            <Label>From</Label>
                                                            <div className='fw-medium'>09-06-2024</div>
                                                        </Col>
                                                        <div className='w-auto al_cardactions'>
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
                                                            <div className='fw-medium'>Secondary Doctor</div>
                                                        </Col>
                                                        <Col className='w-auto'>
                                                            <Label>From</Label>
                                                            <div className='fw-medium'>09-06-2024</div>
                                                        </Col>
                                                        <div className='w-auto al_cardactions'>
                                                            {/* <i className='icon_alfred_trashbin'></i> */}
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

                <Modal className='modal-sm detailsModal' isOpen={view} wrapClassName="al_outerparentwp">
                    <div className='d-flex align-items-center justify-content-between p-4'>
                        <h6 className='mb-0'>Add Primary Doctor</h6>
                        <i className="icon_alfred_close pointer" title="Close" onClick={() => setView(false)}></i>
                    </div>
                    <ModalBody className="wflexLayout p-0">
                        <div className='wflexScroll px-4 mb-4'>
                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label><span className='requiredLabel'>*</span>Hospital/Group</Label>
                                        <Select
                                            className="inputSelect"
                                            options={hospitalsList}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menu: styles => ({ ...styles, zIndex: "3", boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);", marginTop: 0 }),
                                                menuList: styles => ({
                                                    ...styles, maxHeight: '180px', msOverflowStyle: "auto", wordBreak: "break-word", border: "1px solid #efefef", borderRadius: "4px",
                                                    color: "#333333", fontSize: "0.8em", padding: 0, margin: 0,
                                                }),
                                                menuPortal: styles => ({
                                                    ...styles,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                            name="hospitalsList"
                                            onChange={() => { }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label><span className='requiredLabel'>*</span>Doctor</Label>
                                        <Select
                                            className="inputSelect"
                                            options={doctorsList}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menu: styles => ({ ...styles, zIndex: "3", boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);", marginTop: 0 }),
                                                menuList: styles => ({
                                                    ...styles, maxHeight: '180px', msOverflowStyle: "auto", wordBreak: "break-word", border: "1px solid #efefef", borderRadius: "4px",
                                                    color: "#333333", fontSize: "0.8em", padding: 0, margin: 0,
                                                }),
                                                menuPortal: styles => ({
                                                    ...styles,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                            name="doctorsList"
                                            onChange={() => { }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className='mt-2'>
                                <button
                                    type="button"
                                    className="al_button_cancel me-3"
                                    onClick={() => setView(false)}
                                >Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="al_button_add"
                                >Save
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </>
    )
}