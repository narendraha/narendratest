import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Label } from 'reactstrap';
import alferdlogo from '../../images/alfredlogowhite.svg';
import { useState } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import App1 from './temp';

export default function Signin(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [passowrd, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event, values) => {
        navigate('/home');
    }

    return (
        <div className="al_login_container">
            <AvForm onValidSubmit={handleSubmit} className="wflexLayout">
                <Row className="al_login_section">
                    <Col lg="7" sm="6" className='al_left_login h-100'>
                        <div className='wflexLayout'>
                            <Link to="/"><img src={alferdlogo} alt="logo" width={180} /></Link>
                        </div>
                    </Col>
                    <Col lg="5" sm="6" className='al_login-right h-100'>
                        <div className="wflexLayout al_mx-auto">
                            <div className='wflex-items-center wflexLayout'>
                                <h5>Sign in</h5>

                                <div className="al_login-form wflexScroll">
                                    <div>
                                        <Label>Mobile Number / Email ID</Label>
                                        <AvField name="username" value={userName} placeholder="Enter Mobile Number / Email ID" type="text" required />
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <AvField name="password" value={passowrd} placeholder="Enter Password" type="password" required />
                                    </div>
                                </div>
                                <div className="al_login_footer">
                                    {/* <Link to="/forgot-password" className="al_forgot_pw al_text_link">Forgot password?</Link> */}
                                    <button type="submit" disabled={(isSubmitting) ? true : false} className="al_login_button mt-3">Sign in</button>
                                    <div className='mt-3'>Don’t have an account? <Link to="/registration" className="al_text_link cs_medium">Signup</Link></div>
                                    <div className="alhr-or">OR</div>
                                    {/* <button type="button" className='al_signinbuttons'>
                                        <i className='icon_alfred_google'></i>
                                        <span>Sign in with Google</span>
                                    </button> */}
                                    <GoogleOAuthProvider clientId='127686704222-9h7eguj5fq0ibo9e9tib7d155s9tsjft.apps.googleusercontent.com'>
                                        <App1 />
                                    </GoogleOAuthProvider>
                                    <button type="button" className='al_signinbuttons'>
                                        <i className='icon_alfred_apple'></i>
                                        <span>Continue With Apple</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </AvForm>
        </div>
    );
}