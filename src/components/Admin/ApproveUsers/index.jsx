import React, { useState } from 'react';
import { Table, Row, Col, Label, TabContent, Nav, NavItem, NavLink, TabPane, FormGroup, Modal, ModalBody } from 'reactstrap';
import Select from "react-select";
import Pagination from '../../Pagination';
import nodata from '../../../images/nodata.svg';

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
                <div className='al-pad pb-1'>
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
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            User Name
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Gender
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Email
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Mobile
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Date of Birth
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Residence Type
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Insurance
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Requested Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                        {/* Doctor List */}
                                        {/* <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Doctor Name
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Email
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Mobile
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Education
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Area of Specialization
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Provider ID Number
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Medical license number
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Country
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            State
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Requested Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Charlotte</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>MD, DM</td>
                                                    <td>Cardiology</td>
                                                    <td>457896543456</td>
                                                    <td>656HGFHKJ647879</td>
                                                    <td>USA</td>
                                                    <td>Texas</td>
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>Richard@gmail.com</td>
                                                    <td>9855432568</td>
                                                    <td>MD, DM</td>
                                                    <td>Cardiology</td>
                                                    <td>457896543456</td>
                                                    <td>656HGFHKJ647879</td>
                                                    <td>USA</td>
                                                    <td>Texas</td>
                                                    <td>27-6-2024, 9:45 am</td>
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
                                                    <td>Richard@gmail.com</td>
                                                    <td>9855432568</td>
                                                    <td>MD, DM</td>
                                                    <td>Cardiology</td>
                                                    <td>457896543456</td>
                                                    <td>656HGFHKJ647879</td>
                                                    <td>USA</td>
                                                    <td>Texas</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>
                                                        <div className='d-flex gap-2'>
                                                            <button type="button" className='al_button_sm al_savebtn'>Approve</button>
                                                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setShowHoldModal(true)}>Hold</button>
                                                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table> */}
                                        {/* No Records */}
                                        {/* <div className="d-flex flex-column align-items-center pt-5">
                                            <img src={nodata} width={220} alt="" />
                                            <h6 className="mt-3 mb-0">No data found!</h6>
                                        </div> */}
                                    </div>
                                </div>
                                <div className='px-3 pb-3 mx-auto'>
                                    <Pagination />
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
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            User Name
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Gender
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Email
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Mobile
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Date of Birth
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Residence Type
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Insurance
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Approved By
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Approved Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Remarks
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
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
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>-</td>
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
                                                    <td>27-6-2024, 9:45 am</td>
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
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            User Name
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Gender
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Email
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Mobile
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Date of Birth
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Residence Type
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Insurance
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Hold By
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Hold Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
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
                                                    <td>Andrew</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td><button type="button" className='al_button_sm al_testbtn'>Undo</button></td>
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
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td><button type="button" className='al_button_sm al_testbtn'>Undo</button></td>
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
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            User Name
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Gender
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Email
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Mobile
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Date of Birth
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Residence Type
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Insurance
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Rejected By
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Rejected Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
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
                                                    <td>James</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td><button type="button" className='al_button_sm al_testbtn'>Undo</button></td>
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
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td><button type="button" className='al_button_sm al_testbtn'>Undo</button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>

                    <Modal className='modal-sm detailsModal' isOpen={showHoldModal} wrapClassName="al_outerparentwp">
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
                                <div className='mt-2'>
                                    <button
                                        type="submit"
                                        className="al_button_add"
                                    >Submit
                                    </button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </>
    )
}