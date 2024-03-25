import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Label, FormGroup, Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import alferdlogo from '../../images/alfredlogowhite.svg';
import successImg from '../../images/sucessimg.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState();
    const inputRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

    const genderoptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ]

    const residenceoptions = [
        { value: 'Cohabitant', label: 'Cohabitant' },
        { value: 'Non-Resident', label: 'Non-Resident' }
    ]

    const handleFileChange = (event) => {
        setFileName({ fileName: event.target.files[0].name })
    }

    const focusInput = (index) => {
        if (index >= 0 && index < inputRefs.length) {
            inputRefs[index]?.current?.focus();
        }
    };

    const handleInputChange = (e, index, setFieldValue, values) => {
        const value = e.target.value;
        const isNumber = Number(value)
        setFieldValue(`otp.${index}`, value === '0' ? +value : (isNumber ? value : ""))
        if ((value.length === 1 && isNumber) || (value.length === 1 && value === '0')) {
            focusInput(index + 1);
        }
        else if (value.length === 0) {
            focusInput(index - 1);
        }
    };

    return (
        <div className="al_login_container">
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    dob: "",
                    gender: "",
                    mobile: "",
                    residence: "",
                    education: "",
                    ssn: "",
                    otp: [],
                    formType: 'Register',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("This field is required"),
                    email: Yup.string().required("This field is required"),
                    dob: Yup.string().required("This field is required"),
                    // gender: Yup.string().required("This field is required"),
                    mobile: Yup.string().required("This field is required"),
                    //  residence: Yup.string().required("This field is required"),
                    education: Yup.string().required("This field is required"),
                    ssn: Yup.string().required("This field is required")
                })}
                onSubmit={(values, { setFieldValue }) => {
                    if (values.formType === 'Register') {
                        setFieldValue('formType', "OTP")
                    }
                    else if (values.formType === 'OTP') {
                        setFieldValue('formType', "Password")
                    }
                    else if (values.formType === 'Password') {
                        setFieldValue('formType', "Subscription")
                    }
                    else {

                    }
                }}
            >
                {
                    ({ values, setFieldValue, errors, touched, setFieldTouched }) => {
                        return <Form className='wflexLayout'>
                            <Row className="al_login_section">
                                <Col lg="7" sm="6" className='al_left_login h-100'>
                                    <div className='wflexLayout'>
                                        <Link to="/"><img src={alferdlogo} alt="logo" width={180} /></Link>
                                    </div>
                                </Col>
                                <Col lg="5" sm="6" className='al_login-right h-100'>
                                    <div className="wflexLayout al_mx-auto">
                                        <div className='wflex-items-center wflexLayout'>
                                            <h5 className={'mb-0' + (values.formType === 'OTP' ? " text-center" : "")}>{(values.formType === 'Register') ? "Enter your Details" : (values.formType === 'Password') ? "Set Password" : (values.formType === 'Subscription') ? "Type of subscription" : "OTP Verification"}</h5>
                                            <div className="al_login-form al_registrationform wflexScroll">
                                                {(values.formType === 'Register') && <>
                                                    <FormGroup>
                                                        <Label>Full Name</Label>
                                                        <Field type="text" name='name' placeholder="Enter Full Name" className='form-control' />
                                                        <ErrorMessage name='name' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Email ID</Label>
                                                        <Field type="text" name='email' placeholder="Enter Email ID" className='form-control' />
                                                        <ErrorMessage name='email' component={'div'} className="text-danger" />
                                                    </FormGroup>
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
                                                            selected={values.dob}
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
                                                    <FormGroup>
                                                        <Label>Gender</Label>
                                                        <Select options={genderoptions} name="gender" className="inputSelect" />
                                                        <ErrorMessage name='gender' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Mobile</Label>
                                                        <Field type="text" name='mobile' placeholder="Enter Mobile Number" className='form-control' />
                                                        <ErrorMessage name='mobile' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Residence Type</Label>
                                                        <Select options={residenceoptions} name="residence" className="inputSelect" />
                                                        <ErrorMessage name='residence' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Education</Label>
                                                        <Field type="text" name="education" placeholder="Enter Education" className="form-control" />
                                                        <ErrorMessage name='education' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>SSN</Label>
                                                        <Field type="text" name='ssn' placeholder="Enter SSN" className='form-control' />
                                                        <ErrorMessage name='ssn' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Upload Insurance</Label>
                                                        <input type="file" id="insurance" hidden onChange={(e) => handleFileChange(e)} />
                                                        <div>{fileName}</div>
                                                        <div id="al_blockele">
                                                            <label htmlFor="insurance" className="al_choose">Upload File</label>
                                                        </div>
                                                        {/* <div className="al_fileuplod-note">* jpg, jpeg, png File only</div> */}
                                                        <ErrorMessage name='insurance' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                </>}
                                                {(values.formType === 'OTP') && <>
                                                    <div className='text-center'>
                                                        <FormGroup className='mt-3'>
                                                            <Label>Enter otp sent to ******2987</Label>
                                                            <Row className='mx-0 al_otpfields'>
                                                                <FieldArray
                                                                    name='otp'
                                                                >
                                                                    {({ }) => {
                                                                        return <React.Fragment>
                                                                            {inputRefs.map((ref, index) => (
                                                                                <Col className='px-1'>
                                                                                    <Field
                                                                                        key={index}
                                                                                        innerRef={ref}
                                                                                        type="text"
                                                                                        name={`otp.${index}`}
                                                                                        className="form-control text-center"
                                                                                        maxLength="1"
                                                                                        onChange={(e) => handleInputChange(e, index, setFieldValue, values)}
                                                                                    />
                                                                                </Col>
                                                                            ))}
                                                                        </React.Fragment>
                                                                    }}
                                                                </FieldArray>
                                                            </Row>
                                                            {touched.otp && errors.otp && <div className='text-danger'>
                                                                {Array.isArray(errors.otp) ? [...new Set(errors.otp)] : errors.otp}
                                                            </div>}
                                                        </FormGroup>
                                                    </div>
                                                </>}
                                                {(values.formType === 'Password') && <>
                                                    <FormGroup>
                                                        <Label>New Password</Label>
                                                        <Field type="text" name='password' placeholder="Enter password" className='form-control' />
                                                        <ErrorMessage name='password' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Re-enter New Password</Label>
                                                        <Field type="text" name='reenterpassword' placeholder="Re-enter New Password" className='form-control' />
                                                        <ErrorMessage name='reenterpassword' component={'div'} className="text-danger" />
                                                    </FormGroup>
                                                    <div className='text-center mb-4'>
                                                        <img src={successImg} alt="success" height={85} />
                                                        <div className='mt-4'>Password set</div>
                                                        <h4 className='text-success'>successfully</h4>
                                                        <p className='mb-0 textLight'>Login to your account with new password</p>
                                                    </div>
                                                </>}
                                                {(values.formType === 'Subscription') && <>
                                                    <Row className='planscard mt-3'>
                                                        <Col sm="10">
                                                            <Card>
                                                                <CardBody>
                                                                    <FormGroup check inline className='d-flex me-0 ps-0 flex-wrap'>
                                                                        <Label check className="d-flex align-center">
                                                                            <div className='me-3'>
                                                                                <h5 className='mb-0'>Basic</h5>
                                                                                <span>It is a long established fact that a reader.</span>
                                                                            </div>
                                                                            <Field type="radio" name="scheduletype" value="0" />
                                                                        </Label>
                                                                    </FormGroup>
                                                                    <h6 className='my-3'>Features</h6>
                                                                    <ul className='standardPlans'>
                                                                        <li>Patient Registration<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Avatar Customization<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Chat<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Connect with wearables<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Access Knowledge base<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Referral Option<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Real-time sentiment capture<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Ambient listening<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Goal setting<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Goal tracking<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Dashboards<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Widgets<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Physician Consultation<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Journey Enhancements<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Third party vendor interfaces<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                    </ul>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        <Col sm="10">
                                                            <Card>
                                                                <CardBody>
                                                                    <FormGroup check inline className='d-flex me-0 ps-0 flex-wrap'>
                                                                        <Label check className="d-flex align-center">
                                                                            <div className='me-3'>
                                                                                <h5 className='mb-0'>Standard</h5>
                                                                                <span>It is a long established fact that a reader.</span>
                                                                            </div>
                                                                            <Field type="radio" name="scheduletype" value="0" />
                                                                        </Label>
                                                                    </FormGroup>
                                                                    <h6 className='my-3'>Features</h6>
                                                                    <ul className='standardPlans'>
                                                                        <li>Patient Registration<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Avatar Customization<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Chat<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Connect with wearables<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Access Knowledge base<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Referral Option<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Real-time sentiment capture<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Ambient listening<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Goal setting<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Goal tracking<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Dashboards<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Widgets<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Physician Consultation<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Journey Enhancements<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                        <li>Third party vendor interfaces<i className="icon_alfred_circle_xmark_solid"></i></li>
                                                                    </ul>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        <Col sm="10">
                                                            <Card>
                                                                <CardBody>
                                                                    <FormGroup check inline className='d-flex me-0 ps-0 flex-wrap'>
                                                                        <Label check className="d-flex align-center">
                                                                            <div className='me-3'>
                                                                                <h5 className='mb-0'>Premium</h5>
                                                                                <span>It is a long established fact that a reader.</span>
                                                                            </div>
                                                                            <Field type="radio" name="scheduletype" value="0" />
                                                                        </Label>
                                                                    </FormGroup>
                                                                    <h6 className='my-3'>Features</h6>
                                                                    <ul className='standardPlans'>
                                                                        <li>Patient Registration<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Avatar Customization<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Chat<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Connect with wearables<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Access Knowledge base<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Referral Option<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Real-time sentiment capture<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Ambient listening<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Goal setting<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Goal tracking<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Dashboards<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Widgets<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Physician Consultation<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Journey Enhancements<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                        <li>Third party vendor interfaces<i className="icon_alfred_circle_check_solid text-success"></i></li>
                                                                    </ul>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </>
                                                }
                                            </div>
                                            <div className="al_login_footer mt-3">
                                                <button type='submit' className="al_login_button">{values.formType !== 'OTP' ? "Continue" : "Verify"}</button>

                                                {/* {(values.formType === 'OTP') && <button type='button' className="al_login_button_back mt-3" onClick={() => { setFieldValue('formType', 'Register'); setFieldValue('otp', []) }}>
                                                    Back
                                                </button>} */}
                                                {(values.formType !== 'OTP') && <button type='button' className="al_login_button_back mt-3"><Link to="/signin">Back to <strong>Sign in</strong></Link></button>}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    }
                }
            </Formik>
        </div >
    );
}