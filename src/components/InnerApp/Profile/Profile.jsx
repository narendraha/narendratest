import React from 'react';
import { useState } from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import userImg from '../../../images/userprofileImg.png';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Profile() {
    const [isEdit, setIsEdit] = useState(false);
    const usersDetails = {
        plan: "Basic", height: "5ft", weight: "120lbs", bloodType: "B3 HR+", name:"Alfred User", email: "richard99@gmail.com", residenceType: "Cohabitant", education: "University degree", dob: "08/19/1993", age: 30, gender: "Male", ssn: "********1874", mobile: "+1 6654896547", nationality: "USA",
        insurancename: "USA Insurance", insurancenumber: "437890689576"
    }
    const genderoptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ]

    const residenceoptions = [
        { value: 'Cohabitant', label: 'Cohabitant' },
        { value: 'Non-Resident', label: 'Non-Resident' }
    ]
    return (
        <>
            <div className="wflexLayout">
                <div className='wflexScroll al-pad'>
                    <h3 className='bc_main_text mb-3'>Profile</h3>
                    <Row className='al_profile_manage'>
                        <Col xl="3" lg="3" sm="4">
                            <div className={'al_profile_photo '}>
                                <img src={userImg} alt='profilePhoto' />

                                {isEdit && <>
                                    <input type='file' id="uploadPicture" name="uploadProfilePic" onChange={e => { }} hidden accept=".jpg,.jpeg,.png" />
                                    <Label for="uploadPicture" onClick={() => setIsEdit(true)}>
                                        <div className="al_profile-edit-icon">
                                            <i className="icon_alfred_edit"></i>
                                        </div>
                                    </Label>
                                </>}
                            </div>
                        </Col>
                        <Col xl="6" lg="8" md="8" sm="8" className='px-5'>
                            {!isEdit && <>
                                <h2 className='cs_semibold mb-1'>{usersDetails.name}</h2>
                                <h6 className='al_profile_role mb-2'>{usersDetails.email}</h6>
                                <div className='al_pointsearned mb-4'>Points Earned: 89</div>
                                <Row>
                                    <Col>
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.plan || "N/A"}</div>
                                            <Label>Your Subscription Plan</Label>
                                        </div>
                                    </Col>
                                    <div className='px-3 w-auto'>
                                        <button type="button" className="al_upgrade_btn al_basic">Upgrade Plan</button>
                                    </div>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.height || "N/A"}</div>
                                            <Label>Height</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.weight || "N/A"}</div>
                                            <Label>Weight</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.bloodType || "N/A"}</div>
                                            <Label>Blood Type</Label>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.residenceType || "N/A"}</div>
                                            <Label>Residence Type</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.education || "N/A"}</div>
                                            <Label>Education</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.dob || "N/A"}</div>
                                            <Label>Date of Birth</Label>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.age || "N/A"}</div>
                                            <Label>Age</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.gender || "N/A"}</div>
                                            <Label>Gender</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.ssn || "N/A"}</div>
                                            <Label>SSN</Label>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.mobile || "N/A"}</div>
                                            <Label>Mobile</Label>
                                        </div>
                                    </Col>
                                    <Col md="4" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.nationality || "N/A"}</div>
                                            <Label>Nationality</Label>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <h6>KYC Information</h6>
                                <div className='al_profiledata'>
                                    <Label>PIV ID</Label>
                                    <div className='d-flex wrap my-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className='icon_alfred_image me-2' style={{ fontSize: "16px", color: "#939BA7" }}></i>
                                            <span style={{ color: "#939BA7" }}>PIV-idfrontside.jpg</span>
                                        </div>
                                        <a href="#">
                                            View
                                        </a>
                                    </div>

                                    <div className='d-flex wrap my-2'>
                                        <div className='d-flex align-items-center'>
                                            <i className='icon_alfred_image me-2' style={{ fontSize: "16px", color: "#939BA7" }}></i>
                                            <span style={{ color: "#939BA7" }}>PIV-idbackside.jpg</span>
                                        </div>
                                        <a href="#">
                                            View
                                        </a>
                                    </div>
                                </div>
                                <hr />
                                <Row>
                                    <Col md="6" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.insurancename || "N/A"}</div>
                                            <Label>Name of Insurance Provider</Label>
                                        </div>
                                    </Col>
                                    <Col md="6" sm="12">
                                        <div className='al_profiledata'>
                                            <div>{usersDetails?.insurancenumber || "N/A"}</div>
                                            <Label>Insurance Policy / Card Number</Label>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <div className='al_profilebtns'>
                                    <button type="button" className='mb-3'><i className="icon_alfred_password"></i>Change Password</button>
                                    <button type="button" className='mb-3'><i className="icon_alfred_bankcard"></i>Bank Card</button>
                                    <button type="button" className='mb-3'><i className="icon_alfred_menu_settings"></i>Settings</button>
                                </div>
                            </>}
                            {isEdit && <>
                                <Formik
                                    initialValues={{}}
                                    validationSchema={Yup.object().shape({})}
                                    onSubmit={() => { }}
                                >
                                    {
                                        ({ values, setFieldValue, errors, touched, setFieldTouched }) => {
                                            return <Form>
                                                <Row>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Height</Label>
                                                            <Field type="text" name='height' value={usersDetails.height} placeholder="Enter Height" className='form-control' />
                                                            <ErrorMessage name='Height' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Weight</Label>
                                                            <Field type="text" name='weight' value={usersDetails.weight} placeholder="Enter Weight" className='form-control' />
                                                            <ErrorMessage name='weight' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Blood Type</Label>
                                                            <Field type="text" name='bloodtype' value={usersDetails.bloodType} placeholder="Enter Blood Type" className='form-control' />
                                                            <ErrorMessage name='bloodtype' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>

                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Full Name</Label>
                                                            <Field type="text" name='name' value={usersDetails.name} placeholder="Enter Name" className='form-control' />
                                                            <ErrorMessage name='name' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Age</Label>
                                                            <Field type="text" name='age' value={usersDetails.age} placeholder="Enter Age" className='form-control' />
                                                            <ErrorMessage name='age' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Gender</Label>
                                                            <Select options={genderoptions} name="gender" className="inputSelect" />
                                                            <ErrorMessage name='gender' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Date of Birth</Label>
                                                            <DatePicker className='form-control al_calendarIcon'
                                                                name="dob"
                                                                placeholderText="Select DOB"
                                                                popperPlacement="auto"
                                                                popperModifiers={{
                                                                    flip: {
                                                                        behavior: ["bottom"]
                                                                    },
                                                                    preventOverflow: {
                                                                        enabled: false
                                                                    }
                                                                }}
                                                                selected={new Date()}
                                                                onChange={(e) => { setFieldValue('dob', e) }}
                                                                dateFormat={'MM/dd/yyyy'}
                                                                maxDate={new Date()}
                                                                onBlur={() => setFieldTouched('dob', true)}
                                                                autoComplete="off"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                            />
                                                            <ErrorMessage name='dob' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Mobile</Label>
                                                            <Field type="text" name='mobile' value={usersDetails.mobile} placeholder="Enter Mobile" className='form-control' />
                                                            <ErrorMessage name='mobile' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>SSN</Label>
                                                            <Field type="text" name='ssn' value={usersDetails.ssn} placeholder="Enter SSN" className='form-control' />
                                                            <ErrorMessage name='ssn' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Resident Type</Label>
                                                            <Select options={residenceoptions} name="residenttype" className="inputSelect" />
                                                            <ErrorMessage name='residenttype' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Education</Label>
                                                            <Field type="text" name='education' value={usersDetails.education} placeholder="Enter Education" className='form-control' />
                                                            <ErrorMessage name='education' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="4" sm="12">
                                                        <FormGroup>
                                                            <Label>Email</Label>
                                                            <Field type="text" name='email' value={usersDetails.email} placeholder="Enter Email" className='form-control' />
                                                            <ErrorMessage name='email' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6" sm="12">
                                                        <FormGroup>
                                                            <Label>Name of Insurance Provider</Label>
                                                            <Field type="text" name='insuranceprovider' value={usersDetails.insurancename} placeholder="Enter Name of Insurance Provider" className='form-control' />
                                                            <ErrorMessage name='insuranceprovider' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6" sm="12">
                                                        <FormGroup>
                                                            <Label>Insurance Policy / Card Number</Label>
                                                            <Field type="text" name='insuranceno' value={usersDetails.insurancenumber} placeholder="Enter Insurance Policy / Card Number" className='form-control' />
                                                            <ErrorMessage name='insuranceno' component={'div'} className="text-danger" />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        }
                                    }
                                </Formik>
                            </>}
                            <div className='mt-3'>
                                <button type="button" className='al_greybgbutton' onClick={() => setIsEdit(!isEdit)}>{!isEdit ? "Edit" : "Save"}</button>
                                {isEdit && <button type="button" className='al_cancelbgbutton mx-3' onClick={() => setIsEdit(!isEdit)}>Cancel</button>}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}