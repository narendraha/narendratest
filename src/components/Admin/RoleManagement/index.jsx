import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Label, Input, FormGroup } from 'reactstrap';

export default function RoleManagement() {
    const [view, setView] = useState("view");
    return (
        <>

            <div className="wflexLayout">
                <div className='d-flex align-items-center al-pad pb-1'>
                    <h3 className='bc_main_text mb-0 me-4'>Role Management</h3>
                    <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                        <i className='icon_alfred_plus me-2'></i>
                        Create Role
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
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <div className='al_itemlist'>
                                            <div className='al_singleitem active'>Physician</div>
                                            <div className='al_singleitem'>Nurse</div>
                                            <div className='al_singleitem'>Platform Admin</div>
                                        </div>
                                        {/* <div className='al_nodata'>
                                            No records found for your search
                                        </div> */}
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
                                        <Card className='al_cardview mb-4 h-auto me-0'>
                                            <CardBody>
                                                <Row>
                                                    <Col>
                                                        <div>Physician</div>
                                                        <Label>Role Name</Label>
                                                    </Col>
                                                    <div className='w-auto al_cardactions'>
                                                        <i className='icon_alfred_edit'></i>
                                                        <i className='icon_alfred_trashbin'></i>
                                                    </div>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                        <Row>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>Dashboard</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>Admin Dashboard</div>
                                                        <div className='al_roleitem'>Physician Dashboard</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>Bot Manager</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>Upload Documents</div>
                                                        <div className='al_roleitem'>Bot Questionnaire</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>User Management</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>Role Management</div>
                                                        <div className='al_roleitem'>Users</div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {view === "add" && <>
                                    <div className='flex-grow-1'>
                                        <Row>
                                            <Col lg="4" sm="6">
                                                <FormGroup>
                                                    <Label><span className='requiredLabel'>*</span>Role Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="rolename"
                                                        placeholder="Enter Role"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>Dashboard</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Admin Dashboard</span>
                                                            </Label>
                                                        </div>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Physician Dashboard</span>
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>Bot Manager</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Upload Documents</span>
                                                            </Label>
                                                        </div>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Bot Questionnaire</span>
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="4" md="6" sm="12">
                                                <div className='al_rolesView mb-3'>
                                                    <div className='al_roleheader'>User Management</div>
                                                    <div className='wflexScroll al_roleslistitems'>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Role Management</span>
                                                            </Label>
                                                        </div>
                                                        <div className='al_roleitem'>
                                                            <Label
                                                                check
                                                                className="d-flex align-items-center"
                                                            >
                                                                <input type="checkbox" name="exercise" />
                                                                <span>Users</span>
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
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