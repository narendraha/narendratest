import React, { useState } from 'react';
import { Table, Row, Col, Label, TabContent, Nav, NavItem, NavLink, TabPane, FormGroup, Modal, ModalBody } from 'reactstrap';
import Select from "react-select";

export default function ApproveUsers() {
    const [tab, setTab] = useState("1");
    const [showHoldModal, setShowHoldModal] = useState(false);
    const rejectreasons = [
        { value: "Insurance not verified", label: "Insurance not verified" },
        { value: "Your insurance date expired", label: "Your insurance date expired" },
        { value: "Email ID not valid", label: "Email ID not valid" },
        { value: "Phone number not valid", label: "Phone number not valid" },
        { value: "Other", label: "Other" }
    ];

    return (
        <>
            <div className="wflexLayout">
                <div className='al-pad'>
                    <h3 className='bc_main_text mb-0'>User Requests</h3>
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
                                <span className="d-none d-sm-block">Approved</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "3" ? "active" : ""}
                                onClick={() => {
                                    setTab("3");
                                }}>
                                <span className="d-none d-sm-block">Hold</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "4" ? "active" : ""}
                                onClick={() => {
                                    setTab("4");
                                }}>
                                <span className="d-none d-sm-block">Rejected</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tab} className="wflexLayout">
                        <TabPane tabId="1" className="wflexLayout">
                            <div className='wflexLayout'>
                                <Row className='d-flex align-items-center al-pad py-1 flex-xs-column'>
                                    <Col className='d-flex align-items-center'>
                                        <FormGroup
                                            check
                                            inline
                                            className="d-flex me-0 ps-0 flex-wrap"
                                        >
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Patient
                                            </Label>
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Doctor
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <div className='w-auto px-3'>
                                        <div className="al_searchleft px-0">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <i className="icon_alfred_search"></i>
                                        </div>
                                    </div>
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Gender</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Date of Birth</th>
                                                    <th>Residence Type</th>
                                                    <th>Insurance</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Charlotte</td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>19-04-1985</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="2" className="wflexLayout">
                            <div className='wflexLayout'>
                                <Row className='d-flex align-items-center al-pad py-1 flex-xs-column'>
                                    <Col className='d-flex align-items-center'>
                                        <FormGroup
                                            check
                                            inline
                                            className="d-flex me-0 ps-0 flex-wrap"
                                        >
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Patient
                                            </Label>
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Doctor
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <div className='w-auto px-3'>
                                        <div className="al_searchleft px-0">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <i className="icon_alfred_search"></i>
                                        </div>
                                    </div>
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Gender</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Date of Birth</th>
                                                    <th>Residence Type</th>
                                                    <th>Insurance</th>
                                                    <th>Approved By</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Charlotte</td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>19-04-1985</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance.jpg</a></td>
                                                    <td>Anthony</td>
                                                    <td>Insurance not verified</td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>Anthony</td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="3" className="wflexLayout">
                            <div className='wflexLayout'>
                                <Row className='d-flex align-items-center al-pad py-1 flex-xs-column'>
                                    <Col className='d-flex align-items-center'>
                                        <FormGroup
                                            check
                                            inline
                                            className="d-flex me-0 ps-0 flex-wrap"
                                        >
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Patient
                                            </Label>
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Doctor
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <div className='w-auto px-3'>
                                        <div className="al_searchleft px-0">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <i className="icon_alfred_search"></i>
                                        </div>
                                    </div>
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Gender</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Date of Birth</th>
                                                    <th>Residence Type</th>
                                                    <th>Insurance</th>
                                                    <th>Hold By</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Charlotte</td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>19-04-1985</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance.jpg</a></td>
                                                    <td>Andrew</td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>Andrew</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="4" className="wflexLayout">
                            <div className='wflexLayout'>
                                <Row className='d-flex align-items-center al-pad py-1 flex-xs-column'>
                                    <Col className='d-flex align-items-center'>
                                        <FormGroup
                                            check
                                            inline
                                            className="d-flex me-0 ps-0 flex-wrap"
                                        >
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Patient
                                            </Label>
                                            <Label
                                                className="d-flex align-center me-3"
                                            >
                                                <input
                                                    type="radio"
                                                    name="usertype"
                                                    className="me-2"
                                                    onChange={(e) => { }} />
                                                Doctor
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <div className='w-auto px-3'>
                                        <div className="al_searchleft px-0">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <i className="icon_alfred_search"></i>
                                        </div>
                                    </div>
                                </Row>
                                <div className='wflexScroll d-flex flex-column'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Gender</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Date of Birth</th>
                                                    <th>Residence Type</th>
                                                    <th>Insurance</th>
                                                    <th>Rejected By</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Charlotte</td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>19-04-1985</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance.jpg</a></td>
                                                    <td>James</td>
                                                </tr>
                                                <tr>
                                                    <td>Richard</td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>10-09-1955</td>
                                                    <td>Cohabitant</td>
                                                    <td><a href="#">Insurance2.jpg</a></td>
                                                    <td>James</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>

                    <Modal className='modal-sm detailsModal' isOpen={showHoldModal}>
                        <div className='d-flex align-items-center justify-content-between p-4'>
                            <h6 className='mb-0'>Hold Reason</h6>
                            <i className="icon_alfred_close pointer" title="Close" onClick={() => setShowHoldModal(false)}></i>
                        </div>
                        <ModalBody className="wflexLayout p-0">
                            <div className='wflexScroll px-4 mb-4'>
                                <FormGroup>
                                    <Label>Reason</Label>
                                    <Select
                                        className="inputSelect"
                                        options={rejectreasons}
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
                                        name="reasontype"
                                        onChange={() => { }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Enter Remarks</Label>
                                    <textarea
                                        type="text"
                                        name="remarks"
                                        className='form-control'
                                    />
                                </FormGroup>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </>
    )
}