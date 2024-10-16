import React, { useState } from 'react';
import Select from "react-select";
import { Card, CardBody, Col, FormGroup, Label, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, Modal, ModalBody } from 'reactstrap';
import Pagination from '../../Utilities/Pagination';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function UserFeedback() {
    const [tab, setTab] = useState("1");

    return (
        <>
            <div className="wflexLayout">
                <div className='al-pad pb-1'>
                    <h3 className='bc_main_text mb-0'>List of Questions</h3>
                </div>
                <div className="wflexLayout">
                    <Nav tabs className="al_tabs_border mt-0 al-mar">
                        <NavItem>
                            <NavLink className={tab === "1" ? "active" : ""}
                                onClick={() => {
                                    setTab("1");

                                }}>
                                <span className="d-none d-sm-block">Pending</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "2" ? "active" : ""}
                                onClick={() => {
                                    setTab("2");
                                }}>
                                <span className="d-none d-sm-block">Completed</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tab} className="wflexLayout">
                        <TabPane tabId="1" className="wflexLayout">
                            <div className='wflexLayout'>
                                <div className='wflexScroll px-4'>
                                    <Row>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Jonathan</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div className='text-decoration-underline text-primary pointer'>View</div>
                                                        <i className='icon_alfred_menu_sms pointer mx-3' style={{ fontSize: "18px" }}></i>
                                                        <button type="button" className='al_button_sm al_savebtn'>Done</button>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Joseph</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div>
                                                            <a href="#" className='text-decoration-underline'>View</a>
                                                            <i className='icon_alfred_menu_sms pointer mx-3' style={{ fontSize: "18px" }}></i>
                                                            <button type="button" className='al_button_sm al_savebtn'>Done</button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Amar</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div>
                                                            <a href="#" className='text-decoration-underline'>View</a>
                                                            <i className='icon_alfred_menu_sms pointer mx-3' style={{ fontSize: "18px" }}></i>
                                                            <button type="button" className='al_button_sm al_savebtn'>Done</button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Alexander</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex align-items-center justify-content-end'>
                                                        <div>
                                                            <a href="#" className='text-decoration-underline'>View</a>
                                                            <i className='icon_alfred_menu_sms pointer mx-3' style={{ fontSize: "18px" }}></i>
                                                            <button type="button" className='al_button_sm al_savebtn'>Done</button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <Modal className='modal-sm detailsModal' isOpen={false} wrapClassName="al_outerparentwp">
                                <div className='d-flex align-items-center justify-content-between p-4'>
                                    <h6 className='mb-0'>Add your comments</h6>
                                    <i className="icon_alfred_close pointer" title="Close" onClick={() => { }}></i>
                                </div>
                                <ModalBody className="wflexLayout p-0">
                                    <div className='wflexScroll px-4 my-4'>
                                        <Formik
                                            initialValues={{
                                                comment: ""
                                            }}
                                            onSubmit={(values) => {

                                            }}
                                        >{({ values, setFieldValue }) => (<Form>
                                            <FormGroup>
                                                <Field
                                                    as="textarea"
                                                    name="comment"
                                                    value={""}
                                                    placeholder='Enter Comment'
                                                    className='form-control'
                                                    rows="4"
                                                    onChange={(e) => { }}
                                                />
                                                {/* <ErrorMessage
                                                    name="comment"
                                                    component={"div"}
                                                    className="text-danger"
                                                /> */}
                                            </FormGroup>
                                            <div className='mt-4'>
                                                <button
                                                    type="submit"
                                                    className="al_button_add me-3"
                                                >Submit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="al_button_cancel"
                                                >Cancel
                                                </button>
                                            </div>
                                        </Form>)}
                                        </Formik>
                                    </div>
                                </ModalBody>
                            </Modal>
                        </TabPane>
                        <TabPane tabId="2" className="wflexLayout">
                            <div className='wflexLayout'>
                                <div className='wflexScroll px-4'>
                                    <Row>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Jonathan</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>George</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Alex</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className='mb-3'>
                                            <Card className='al_cardview details_card'>
                                                <CardBody className='d-flex flex-column p-3'>
                                                    <div className='flex-grow-1'>
                                                        <h6 className='mb-2'><span><i className='icon_alfred_agentnode me-2'></i></span>Alexander</h6>
                                                        <Row className='mb-2 mx-0'><strong className='w-auto px-0'>Question :</strong>&nbsp;<Col className='px-0'>What is Artial Fibrillation?</Col></Row>
                                                        <Row className='mx-0'><strong className='w-auto px-0'>Comment :</strong>&nbsp;<Col className='px-0'>Not factually correct</Col></Row>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </>
    )
}
