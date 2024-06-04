import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import Switch from "react-switch";
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label, Row, UncontrolledDropdown } from 'reactstrap';

export default function UserManagement() {
    const [view, setView] = useState("view");
    const roleoptions = [
        { value: "Physician", label: "Physician" },
        { value: "Nurse", label: "Nurse" },
        { value: "Platform Admin", label: "Platform Admin" }
    ];
    return (
        <>
            <div className="wflexLayout">
                <div className='d-flex align-items-center al-pad pb-1'>
                    <h3 className='bc_main_text mb-0 me-4'>Users</h3>
                    <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                        <i className='icon_alfred_plus me-2'></i>
                        Add User
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
                                                <DropdownItem onClick={() => { }}>All</DropdownItem>
                                                <DropdownItem onClick={() => { }}>Active</DropdownItem>
                                                <DropdownItem onClick={() => { }}>InActive</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <div className='al_itemlist'>
                                            <div className='al_singleitem'>Nicholas</div>
                                            <div className='al_singleitem active'>Jonathan</div>
                                            <div className='al_singleitem'>Brandon</div>
                                            <div className='al_singleitem'>Alexander</div>
                                            <div className='al_singleitem'>Raymond</div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="8" sm="7" className='h-100 px-0'>
                        <div className='wflexLayout'>
                            <div className='wflexScroll px-3 d-flex flex-column'>
                                {view === "view" &&
                                    <div className='flex-grow-1'>
                                        <Card className='al_cardview mb-4 h-auto me-0 al_detailsCard'>
                                            <CardBody>
                                                <Row>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Physician</div>
                                                        <Label>Role</Label>
                                                    </Col>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Jonathan</div>
                                                        <Label>User Name</Label>
                                                    </Col>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Jonathan</div>
                                                        <Label>First Name</Label>
                                                    </Col>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Patra</div>
                                                        <Label>Last Name</Label>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Jonathanpgmail.com</div>
                                                        <Label>Email</Label>
                                                    </Col>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>064098765498</div>
                                                        <Label>Mobile Number</Label>
                                                    </Col>
                                                    <Col lg="3" md="6" sm="6">
                                                        <div>Cardiology Surgery</div>
                                                        <Label>Specialization</Label>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <div className='w-auto al_cardactions justify-content-end'>
                                                    <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                    <i className='icon_alfred_edit ms-3'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                }
                                {view === "add" && <>
                                    <div className='flex-grow-1 d-flex flex-column'>
                                        <Formik
                                            initialValues={{}}
                                            validationSchema={() => { }}
                                            onSubmit={() => { }}
                                        >
                                            {() => {
                                                return (
                                                    <Form className='flex-grow-1'>
                                                        <Row>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Select Role</Label>
                                                                    <Select
                                                                        className="inputSelect"
                                                                        options={roleoptions}
                                                                        name="role"
                                                                        onChange={() => { }}
                                                                    />
                                                                    <ErrorMessage
                                                                        name="role"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>User Name</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="Enter User Name"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="username"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>First Name</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="firstname"
                                                                        placeholder="Enter First Name"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="firstname"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Last Name</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="lastname"
                                                                        placeholder="Enter Last Name"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="lastname"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Email</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="email"
                                                                        placeholder="Enter Email"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="email"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="3" md="6" sm="6">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Mobile Number</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="mobilenumber"
                                                                        placeholder="Enter Mobile Number"
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="mobilenumber"
                                                                        component={"div"}
                                                                        className="text-danger"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>
                                        <div className='mt-2'>
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
                                </>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}