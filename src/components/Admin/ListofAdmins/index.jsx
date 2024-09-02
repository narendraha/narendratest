import React, { useState } from 'react';
import { Table, Row, Col, Label, FormGroup } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function ListofAdmins() {
    const [view, setView] = useState("view");

    return (
        <>
            {view === "view" &&
                <div className="wflexLayout">
                    <Row className='d-flex align-items-center al-pad pb-1'>
                        <Col className='d-flex align-items-center'>
                            <h3 className='bc_main_text mb-0 me-4'>List of Admins</h3>
                            <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                                <i className='icon_alfred_plus me-2'></i>
                                Add New Admin
                            </button>
                        </Col>
                        <div className='w-auto px-3'>
                            <div className="al_searchleft px-0">
                                <input type="text" className="form-control" placeholder="Search" />
                                <i className="icon_alfred_search"></i>
                            </div>
                        </div>
                    </Row>
                    <div className="wflexLayout">
                        <div className='wflexScroll d-flex flex-column'>
                            <div className='flex-grow-1'>
                                <Table borderless responsive className='al_listtable al-pad mb-0 al_adminslisttable'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile Number</th>
                                            <th>Designation</th>
                                            <th>Assigned Date</th>
                                            <th>Expiry Date</th>
                                            <th>Assigned By</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>rejoke</td>
                                            <td>rejoke22@email.com</td>
                                            <td>9853299980</td>
                                            <td>Backend Lead</td>
                                            <td>22/8/2024</td>
                                            <td>22/8/2026</td>
                                            <td>John</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>johney</td>
                                            <td>johney@email.com</td>
                                            <td>8676453544</td>
                                            <td>Frontend Lead</td>
                                            <td>12/9/2024</td>
                                            <td>12/9/2026</td>
                                            <td>Michael</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>roserbroght</td>
                                            <td>roserbroght@email.com</td>
                                            <td>976554444</td>
                                            <td>Technical Manager</td>
                                            <td>23/8/2024</td>
                                            <td>23/8/2026</td>
                                            <td>John</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {view === "add" &&
                <div className="wflexLayout">
                    <div className='wflexScroll d-flex flex-column'>
                        <div className='flex-grow-1'>
                            <Row className='mx-0'>
                                <Col lg="8" md="12" className='px-0'>
                                    <div className='al-pad pb-0'>
                                        <h3 className='bc_main_text mb-2 me-4'>Add New Admin</h3>
                                    </div>
                                    <div className='al-pad'>
                                        <Formik
                                            initialValues={{}}
                                            validationSchema={() => { }}
                                            onSubmit={() => { }}
                                        >
                                            {() => {
                                                return (
                                                    <Form>
                                                        <Row>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Name</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="username"
                                                                        placeholder="Enter Name"
                                                                        className="form-control"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Email</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="email"
                                                                        placeholder="Enter Email"
                                                                        className="form-control"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Mobile</Label>
                                                                    {/* <Field
                                                                        type="text"
                                                                        name="Mobile"
                                                                        placeholder="Enter Mobile Number"
                                                                        className="form-control"
                                                                    /> */}
                                                                    <div className="input-group">
                                                                        <PhoneInput
                                                                            country={values?.countryCode}
                                                                            value={values.mobile}
                                                                            onChange={() => { }} />
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Designation</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="designation"
                                                                        placeholder="Enter Designation"
                                                                        className="form-control"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Account expiry</Label>
                                                                    <DatePicker
                                                                        className="form-control al_calendarIcon"
                                                                        name="expiry_date"
                                                                        placeholderText="Select expiry date"
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
                                                            <Col sm="4">
                                                                <FormGroup>
                                                                    <Label><span className='requiredLabel'>*</span>Unique Identification Code</Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="uic"
                                                                        placeholder="Enter Unique Identification Code"
                                                                        className="form-control"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='mt-2 al-pad pt-0'>
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
            }
        </>
    )
}