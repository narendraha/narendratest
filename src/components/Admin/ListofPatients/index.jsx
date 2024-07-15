import React, { useState } from 'react';
import { Table, Row, Col, Label, TabContent, Nav, NavItem, NavLink, TabPane, FormGroup, Modal, ModalBody } from 'reactstrap';
import Select from "react-select";
import Pagination from '../../Pagination';
import userImg from '../../../images/docimg.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListofPatients() {
    const [tab, setTab] = useState("1");
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [secondaryDoctor, setSecondaryDoctor] = useState(false);
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
                    <Col>
                        <h3 className='bc_main_text mb-0'>List of Patients</h3>
                    </Col>
                    <div className='w-auto px-3'>
                        <div className="al_searchleft px-0">
                            <input type="text" className="form-control" placeholder="Search" />
                            <i className="icon_alfred_search"></i>
                        </div>
                    </div>
                </div>
                <div className="wflexLayout">
                    <Nav tabs className="al_tabs_border mt-0 al-mar">
                        <NavItem>
                            <NavLink className={tab === "1" ? "active" : ""}
                                onClick={() => {
                                    setTab("1");

                                }}>
                                <span className="d-none d-sm-block">Primary Patients</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "2" ? "active" : ""}
                                onClick={() => {
                                    setTab("2");
                                }}>
                                <span className="d-none d-sm-block">Secondary Patients</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tab} className="wflexLayout">
                        <TabPane tabId="1" className="wflexLayout">
                            <div className='wflexLayout'>
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-0 al-pad mb-0 al_patientslisttable'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Patient Name
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
                                                            Age
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
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block' onClick={() => setShowPatientDetails(true)}>Charlotte</div></td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>50</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>
                                                        <div className='d-flex gap-2 align-items-center'>
                                                            <i className='icon_alfred_circle_plus pointer' onClick={() => setSecondaryDoctor(true)}></i>
                                                            <i className='icon_alfred_unmap pointer text-danger' style={{fontSize: "20px"}}></i>
                                                            <div className='al_docavatar'><img src={userImg} className='' onClick={() => setSecondaryDoctor(true)} alt="" /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>55</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>
                                                        <div className='d-flex gap-2 align-items-center'>
                                                            <i className='icon_alfred_circle_plus pointer' onClick={() => setSecondaryDoctor(true)}></i>
                                                            <i className='icon_alfred_unmap pointer text-danger' style={{fontSize: "20px"}}></i>
                                                            <div className='al_docavatar'><img src={userImg} className='' onClick={() => setSecondaryDoctor(true)} alt="" /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>65</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>
                                                        <div className='d-flex gap-2 align-items-center'>
                                                            <i className='icon_alfred_circle_plus pointer' onClick={() => setSecondaryDoctor(true)}></i>
                                                            <i className='icon_alfred_unmap pointer text-danger' style={{fontSize: "20px"}}></i>
                                                            <div className='al_docavatar'><div>N</div><div>A</div></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>42</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                    <td>
                                                        <div className='d-flex gap-2 align-items-center'>
                                                            <i className='icon_alfred_circle_plus pointer' onClick={() => setSecondaryDoctor(true)}></i>
                                                            <i className='icon_alfred_unmap pointer text-danger' style={{fontSize: "20px"}}></i>
                                                            <div className='al_docavatar'><img src={userImg} className='' onClick={() => setSecondaryDoctor(true)} alt="" /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className='px-3 pb-3 mx-auto'>
                                    <Pagination />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="2" className="wflexLayout">
                            <div className='wflexLayout'>
                                <div className='wflexScroll d-flex flex-column mb-2'>
                                    <div className='flex-grow-1'>
                                        <Table borderless responsive className='al_listtable pt-0 al-pad mb-0 al_patientslisttable'>
                                            <thead className='sticky_header'>
                                                <tr>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Patient Name
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
                                                            Age
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div onClick={() => { }}>
                                                            Assigned Date
                                                            {false ? (
                                                                <i className={true ? "icon_alfred_tablesortup" : "icon_alfred_tablesortdown"} />
                                                            ) : <i className="icon_alfred_tablesort" />}
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Charlotte</div></td>
                                                    <td>Male</td>
                                                    <td>Charlotte@test.com</td>
                                                    <td>9855432568</td>
                                                    <td>50</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>55</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>65</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                </tr>
                                                <tr>
                                                    <td><div className='al_text_link d-inline-block'>Richard</div></td>
                                                    <td>Male</td>
                                                    <td>Richard@gmail.com</td>
                                                    <td>2255432568</td>
                                                    <td>42</td>
                                                    <td>27-6-2024, 9:45 am</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>

                    <Modal className='modal-md detailsModal' isOpen={secondaryDoctor} wrapClassName="al_outerparentwp">
                        <div className='d-flex align-items-center justify-content-between p-4'>
                            <h6 className='mb-0'>Secondary Doctor</h6>
                            <i className="icon_alfred_close pointer" title="Close" onClick={() => setSecondaryDoctor(false)}></i>
                        </div>
                        <ModalBody className="wflexLayout p-0">
                            <div className='wflexScroll px-4 mb-4'>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label><span className='requiredLabel'>*</span>Hospital/Group</Label>
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
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                Start Date
                                            </Label>
                                            <DatePicker
                                                className="form-control al_calendarIcon"
                                                name="start_date"
                                                placeholderText="Select start date"
                                                popperPlacement="auto"
                                                popperProps={{
                                                    strategy: "fixed"
                                                }}
                                                popperModifiers={[
                                                    {
                                                        flip: {
                                                            behavior: ["bottom"],
                                                        },
                                                        preventOverflow: {
                                                            enabled: false,
                                                        },
                                                        hide: { enabled: false }
                                                    },
                                                ]}
                                                onChange={() => { }}
                                                dateFormat="yyyy/MM/dd h:mm aa"
                                                maxDate={new Date()}
                                                autoComplete="off"
                                                showMonthDropdown
                                                showTimeSelect
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>
                                                <span className="requiredLabel">*</span>
                                                End Date
                                            </Label>
                                            <DatePicker
                                                className="form-control al_calendarIcon"
                                                name="end_date"
                                                placeholderText="Select end date"
                                                popperPlacement="auto"
                                                popperProps={{
                                                    strategy: "fixed"
                                                }}
                                                popperModifiers={[
                                                    {
                                                        flip: {
                                                            behavior: ["bottom"],
                                                        },
                                                        preventOverflow: {
                                                            enabled: false,
                                                        },
                                                    },
                                                ]}
                                                onChange={() => { }}
                                                dateFormat="yyyy/MM/dd h:mm aa"
                                                maxDate={new Date()}
                                                autoComplete="off"
                                                showTimeSelect
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className='mt-2'>
                                    <button
                                        type="submit"
                                        className="al_button_add"
                                    >Save
                                    </button>
                                    <button
                                        type="button"
                                        className="al_button_cancel al_roundbtn"
                                    ><i className='icon_alfred_trashbin'></i>
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