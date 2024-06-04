import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import Switch from "react-switch";
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label, Modal, ModalBody, Row, UncontrolledDropdown } from 'reactstrap';

export default function BotQuestionnaire() {
    const [view, setView] = useState("view");
    const botoptions = [
        { value: "History", label: "History" },
        { value: "Behavior", label: "Behavior" },
        { value: "Education", label: "Education" },
    ];

    const datatypeoptions = [
        { value: "String", label: "String" },
        { value: "Boolean", label: "Boolean" },
        { value: "Number", label: "Number" },
        { value: "Date", label: "Date" }
    ]

    return (
        <>
            {(view === "view" || view === "details") &&
                <div className="wflexLayout">
                    <div className='d-flex align-items-center al-pad pb-1'>
                        <h3 className='bc_main_text mb-0 me-4'>Bot Questionnaire</h3>
                        <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                            <i className='icon_alfred_plus me-2'></i>
                            Add Question
                        </button>
                    </div>
                    <Row className='wflexLayout al-pad pe-3 mx-0 h-100'>
                        <Col lg="4" sm="5" className='h-100 px-0'>
                            <Card className='wflexLayout al_cardview'>
                                <CardBody className='wflexLayout'>
                                    <Row className='align-items-center mb-3'>
                                        <Col>
                                            <div className="al_searchleft px-0">
                                                <input type="text" className="form-control" placeholder="Search" />
                                                <i className="icon_alfred_search"></i>
                                            </div>
                                        </Col>
                                        <div className='w-auto'>
                                            <UncontrolledDropdown className='al_filterdropdown' direction="left">
                                                <DropdownToggle id="filter">
                                                    <i className="icon_alfred_filter"></i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => { }}>History</DropdownItem>
                                                    <DropdownItem onClick={() => { }}>Behavior</DropdownItem>
                                                    <DropdownItem onClick={() => { }}>Education</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </Row>
                                    <div className='wflexScroll d-flex flex-column'>
                                        <div className='flex-grow-1'>
                                            <div className='al_itemlist'>
                                                <div className='al_singleitem active'>Stroke management</div>
                                                <div className='al_singleitem'>Risk of bleeding assessment</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="8" sm="7" className='h-100 px-0'>
                            <div className='wflexLayout'>
                                <div className='wflexScroll px-3 d-flex flex-column'>
                                    <Label className='mb-2'>Questions</Label>
                                    <div className='flex-grow-1'>
                                        <Row>
                                            <Col lg="6" md="12" className='mb-3'>
                                                <Card className='al_cardview'>
                                                    <CardBody className='d-flex flex-column'>
                                                        <div className='flex-grow-1'>Congestive heart failure case?</div>
                                                        <hr />
                                                        <Row>
                                                            <Col>
                                                                <span><Label>Bot Type:</Label> History</span>
                                                            </Col>
                                                            <div className='w-auto al_cardactions'>
                                                                <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                <i className='icon_alfred_details ms-3' onClick={() => setView("details")}></i>
                                                                <i className='icon_alfred_edit'></i>
                                                                <i className='icon_alfred_trashbin'></i>
                                                            </div>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg="6" md="12" className='mb-3'>
                                                <Card className='al_cardview'>
                                                    <CardBody className='d-flex flex-column'>
                                                        <div className='flex-grow-1'>Hypertension ( elevated blood pressure)  and or on blood pressure medications for history of hypertension?</div>
                                                        <hr />
                                                        <Row>
                                                            <Col>
                                                                <span><Label>Bot Type:</Label> History, Behavior</span>
                                                            </Col>
                                                            <div className='w-auto al_cardactions'>
                                                                <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={false} onColor="#35C792" width={40} height={18} />
                                                                <i className='icon_alfred_details ms-3'></i>
                                                                <i className='icon_alfred_edit'></i>
                                                                <i className='icon_alfred_trashbin'></i>
                                                            </div>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg="6" md="12" className='mb-3'>
                                                <Card className='al_cardview'>
                                                    <CardBody className='d-flex flex-column'>
                                                        <div className='flex-grow-1'>Age older than 75?</div>
                                                        <hr />
                                                        <Row>
                                                            <Col>
                                                                <span><Label>Bot Type:</Label> History</span>
                                                            </Col>
                                                            <div className='w-auto al_cardactions'>
                                                                <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                <i className='icon_alfred_details ms-3'></i>
                                                                <i className='icon_alfred_edit'></i>
                                                                <i className='icon_alfred_trashbin'></i>
                                                            </div>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                            <Col lg="6" md="12" className='mb-3'>
                                                <Card className='al_cardview'>
                                                    <CardBody className='d-flex flex-column'>
                                                        <div className='flex-grow-1'>Diabetes Mellitus and on treatment with medications or insulin?</div>
                                                        <hr />
                                                        <Row>
                                                            <Col>
                                                                <span><Label>Bot Type:</Label> History</span>
                                                            </Col>
                                                            <div className='w-auto al_cardactions'>
                                                                <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                <i className='icon_alfred_details ms-3'></i>
                                                                <i className='icon_alfred_edit'></i>
                                                                <i className='icon_alfred_trashbin'></i>
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
                    </Row>
                    <Modal className='modal-lg detailsModal' isOpen={view === "details" ? true : false}>
                        <div className='d-flex align-items-center justify-content-between p-4'>
                            <h6 className='mb-0'>Question Details</h6>
                            <i className="icon_alfred_close pointer" title="Close" onClick={() => setView("view")}></i>
                        </div>
                        <ModalBody className="wflexLayout p-0">
                            <div className='wflexScroll px-4 mb-4'>
                                <Row className='mb-3'>
                                    <Col sm="7">
                                        <Label>Question</Label>
                                        <div>Chronic obstructive pulmonary disease ( lung disease)</div>
                                    </Col>
                                    <Col sm="5">
                                        <Label>Bot Type</Label>
                                        <div>History</div>
                                    </Col>
                                </Row>
                                <div className='mb-3'>
                                    <Label>Chatbot Prompts</Label>
                                    <ol type="1" className='mb-0'>
                                        <li>Are you feeling any congestion?</li>
                                        <li>Do you experience congestive heart failure symptom?</li>
                                    </ol>
                                </div>
                                <Row className='mb-3'>
                                    <Col sm="5">
                                        <Label>Data Type</Label>
                                        <div>String</div>
                                    </Col>
                                    <Col sm="7">
                                        <Label>Reference Data Options</Label>
                                        <div>Yes, No</div>
                                    </Col>
                                </Row>
                                <div>
                                    <Label>Comments</Label>
                                    <div>-</div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            }

            {
                view === "add" &&
                <div className="wflexLayout al-pad">
                    <Formik
                        initialValues={{}}
                        validationSchema={() => { }}
                        onSubmit={() => { }}
                    >
                        {() => {
                            return (
                                <Form className='h-100'>
                                    <Row className='h-100'>
                                        <Col sm="6" className='h-100 px-0'>
                                            <div className='wflexLayout'>
                                                <div className='wflexScroll d-flex flex-column px-3'>
                                                    <div className='flex-grow-1'>
                                                        <Row className='mx-0'>
                                                            <Col xl="5" lg="6" md="12" className='ps-0'>
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Type of Bot</Label>
                                                                    <Select
                                                                        className="inputSelect"
                                                                        options={botoptions}
                                                                        isMulti
                                                                        name="bottype"
                                                                        onChange={() => { }}
                                                                    />
                                                                    <ErrorMessage
                                                                        name="bottype"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col xl="4" lg="6" md="12">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Category</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="questioncategory"
                                                                        placeholder="Enter Category"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="questioncategory"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Card className='al_cardview h-auto mb-3'>
                                                            <CardBody>
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Question</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="question"
                                                                        placeholder="Enter Question"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="question"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                                <Row className='align-items-center'>
                                                                    <Col>
                                                                        <FormGroup>
                                                                            <Label><span className='requiredLabel'>*</span>Chatbot Prompts</Label>
                                                                            <Field
                                                                                type="text"
                                                                                name="chatprompts"
                                                                                placeholder="Enter Prompt"
                                                                                className="form-control"
                                                                            />
                                                                            <ErrorMessage
                                                                                name="chatprompts"
                                                                                component={"div"}
                                                                                className="text-danger"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <div className='w-auto px-3'>
                                                                        <div className='al_buttonaddplus'>
                                                                            <i className='icon_alfred_plus'></i>
                                                                        </div>
                                                                    </div>
                                                                </Row>
                                                                <Row>
                                                                    <Col lg="6" md="12" className='mb-3'>
                                                                        <Card className='al_cardview'>
                                                                            <CardBody className='p-3'>
                                                                                <Row className='align-items-center h-100'>
                                                                                    <Col className='pe-0 text-small'>
                                                                                        Are you feeling any congestion?
                                                                                    </Col>
                                                                                    <div className='w-auto px-3 lh-0'>
                                                                                        <i className='icon_alfred_closecircle'></i>
                                                                                    </div>
                                                                                </Row>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col lg="6" md="12" className='mb-3'>
                                                                        <Card className='al_cardview'>
                                                                            <CardBody className='p-3'>
                                                                                <Row className='align-items-center h-100'>
                                                                                    <Col className='pe-0 text-small'>
                                                                                        Do you experience congestive heart failure symptom?
                                                                                    </Col>
                                                                                    <div className='w-auto px-3 lh-0'>
                                                                                        <i className='icon_alfred_closecircle'></i>
                                                                                    </div>
                                                                                </Row>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                                <FormGroup>
                                                                    <Label>Comments(If any)</Label>
                                                                    <Field
                                                                        as='textarea'
                                                                        rows={2}
                                                                        name="comments"
                                                                        placeholder="Enter Comments"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="comments"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                                <Row>
                                                                    <Col lg="4" md="12">
                                                                        <FormGroup>
                                                                            <Label><span className='requiredLabel'>*</span>Data Type</Label>
                                                                            <Select
                                                                                className="inputSelect"
                                                                                options={datatypeoptions}
                                                                                isMulti
                                                                                name="datatype"
                                                                                onChange={() => { }}
                                                                            />
                                                                            <ErrorMessage
                                                                                name="datatype"
                                                                                component={"div"}
                                                                                className="text-danger"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg="8" md="12">
                                                                        <FormGroup>
                                                                            <Label>Reference Data Options</Label>
                                                                            <Field
                                                                                type="text"
                                                                                name="referencedata"
                                                                                placeholder="Enter Options"
                                                                                className="form-control"
                                                                            />
                                                                            <ErrorMessage
                                                                                name="referencedata"
                                                                                component={"div"}
                                                                                className="text-danger"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                        <button
                                                            type="button"
                                                            className="al_greybgbutton"
                                                        >
                                                            <i className="icon_alfred_plus me-2"></i>Add Question
                                                        </button>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <button
                                                            type="button"
                                                            className="al_cancelbgbutton me-3"
                                                            onClick={() => setView("view")}
                                                        >Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="al_savebtn"
                                                            onClick={() => setView("view")}
                                                        >Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="6" className='h-100 px-0'>
                                            <div className='wflexLayout'>
                                                <div className='wflexScroll d-flex flex-column px-3'>
                                                    <Card className='al_cardbg mb-3'>
                                                        <CardBody>
                                                            <Row>
                                                                <Col lg="4" sm="6">
                                                                    <Label>Question</Label>
                                                                    <div>Chronic obstructive pulmonary disease ( lung disease)</div>
                                                                </Col>
                                                                <Col lg sm="6">
                                                                    <Label>Data Type</Label>
                                                                    <div>String</div>
                                                                </Col>
                                                                <Col lg="4" sm="6">
                                                                    <Label>Reference Data Options</Label>
                                                                    <div>Yes, No</div>
                                                                </Col>
                                                                <div className='w-auto pe-3'>
                                                                    <Label>Actions</Label>
                                                                    <div className='al_cardactions'>
                                                                        <i className='icon_alfred_edit'></i>
                                                                        <i className='icon_alfred_trashbin'></i>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                            <hr />
                                                            <Row>
                                                                <Col lg="7" md="12">
                                                                    <Label>Chatbot Prompts</Label>
                                                                    <ol type="1" className='mb-0'>
                                                                        <li>Are you feeling any congestion?</li>
                                                                        <li>Do you experience congestive heart failure symptom?</li>
                                                                    </ol>
                                                                </Col>
                                                                <Col lg="5" md="12">
                                                                    <Label>Comments</Label>
                                                                    <div>-</div>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                    <Card className='al_cardbg mb-3'>
                                                        <CardBody>
                                                            <Row>
                                                                <Col lg="4" sm="6">
                                                                    <Label>Question</Label>
                                                                    <div>Chronic obstructive pulmonary disease ( lung disease)</div>
                                                                </Col>
                                                                <Col lg sm="6">
                                                                    <Label>Data Type</Label>
                                                                    <div>Number</div>
                                                                </Col>
                                                                <Col lg="4" sm="6">
                                                                    <Label>Reference Data Options</Label>
                                                                    <div>1, 2</div>
                                                                </Col>
                                                                <div className='w-auto pe-3'>
                                                                    <Label>Actions</Label>
                                                                    <div className='al_cardactions'>
                                                                        <i className='icon_alfred_edit'></i>
                                                                        <i className='icon_alfred_trashbin'></i>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                            <hr />
                                                            <Row>
                                                                <Col lg="7" md="12">
                                                                    <Label>Chatbot Prompts</Label>
                                                                    <ol type="1" className='mb-0'>
                                                                        <li>Are you feeling any congestion?</li>
                                                                        <li>Do you experience congestive heart failure symptom?</li>
                                                                    </ol>
                                                                </Col>
                                                                <Col lg="5" md="12">
                                                                    <Label>Comments</Label>
                                                                    <div>-</div>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            }
        </>
    )
}