import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { getAuthRoute, getRegForm } from "../../../_mock/helperIndex";
import { setActiveRegistrationForm, setAuthRoutes } from "../../../store/SessionStore/slice";

const SubscriptionForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(setActiveRegistrationForm(getRegForm.CONFIRMATIONFORM))
    }

    let backToSignInHandle = () => {
        dispatch(setActiveRegistrationForm(""))
        dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    }
    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    scheduletype: ""
                }}
                validationSchema={Yup.object().shape({
                    scheduletype: Yup.string().required('You must select a subscription type.'),
                })}
                onSubmit={(values) => {
                    console.log("Submit=>", values)
                }}
            >{({ values, errors }) => (
                <>
                    <Form className="wflexLayout">
                        <div className="wflexLayout al_mx-auto">
                            <div className="wflex-items-center wflexLayout">
                                <h5 className="mb-0">Type of subscription</h5>
                                <div className="al_login-form al_registrationform wflexScroll">
                                    <Row className="planscard mt-2">
                                        <Col sm="10">
                                            <Card>
                                                <CardBody>
                                                    <FormGroup
                                                        check
                                                        inline
                                                        className="d-flex me-0 ps-0 flex-wrap"
                                                    >
                                                        <Label check className="d-flex align-center">
                                                            <div className="me-3">
                                                                <h5 className="mb-0">Basic</h5>
                                                                <span>
                                                                    It is a long established fact that a
                                                                    reader.
                                                                </span>
                                                            </div>
                                                            <Field
                                                                type="radio"
                                                                name="scheduletype"
                                                                value="1"
                                                                checked={values.scheduletype === "1"}
                                                            />
                                                        </Label>
                                                    </FormGroup>
                                                    <h6 className="my-2">Features</h6>
                                                    <ul className="standardPlans">
                                                        <li>
                                                            Patient Registration
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Avatar Customization
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Chat
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Connect with wearables
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Access Knowledge base
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Referral Option
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Real-time sentiment capture
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Ambient listening
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Goal setting
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Goal tracking
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Dashboards
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Widgets
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Physician Consultation
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Journey Enhancements
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Third party vendor interfaces
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="10">
                                            <Card>
                                                <CardBody>
                                                    <FormGroup
                                                        check
                                                        inline
                                                        className="d-flex me-0 ps-0 flex-wrap"
                                                    >
                                                        <Label check className="d-flex align-center">
                                                            <div className="me-3">
                                                                <h5 className="mb-0">Standard</h5>
                                                                <span>
                                                                    It is a long established fact that a
                                                                    reader.
                                                                </span>
                                                            </div>
                                                            <Field
                                                                type="radio"
                                                                name="scheduletype"
                                                                value="2"
                                                                checked={values.scheduletype === "2"}
                                                            />
                                                        </Label>
                                                    </FormGroup>
                                                    <h6 className="my-2">Features</h6>
                                                    <ul className="standardPlans">
                                                        <li>
                                                            Patient Registration
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Avatar Customization
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Chat
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Connect with wearables
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Access Knowledge base
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Referral Option
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Real-time sentiment capture
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Ambient listening
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Goal setting
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Goal tracking
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Dashboards
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Widgets
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Physician Consultation
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Journey Enhancements
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                        <li>
                                                            Third party vendor interfaces
                                                            <i className="icon_alfred_circle_xmark_solid"></i>
                                                        </li>
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="10">
                                            <Card>
                                                <CardBody>
                                                    <FormGroup
                                                        check
                                                        inline
                                                        className="d-flex me-0 ps-0 flex-wrap"
                                                    >
                                                        <Label check className="d-flex align-center">
                                                            <div className="me-3">
                                                                <h5 className="mb-0">Premium</h5>
                                                                <span>
                                                                    It is a long established fact that a
                                                                    reader.
                                                                </span>
                                                            </div>
                                                            <Field
                                                                type="radio"
                                                                name="scheduletype"
                                                                value="3"
                                                                checked={values.scheduletype === "3"}
                                                            />
                                                        </Label>
                                                    </FormGroup>
                                                    <h6 className="my-2">Features</h6>
                                                    <ul className="standardPlans">
                                                        <li>
                                                            Patient Registration
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Avatar Customization
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Chat
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Connect with wearables
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Access Knowledge base
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Referral Option
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Real-time sentiment capture
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Ambient listening
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Goal setting
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Goal tracking
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Dashboards
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Widgets
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Physician Consultation
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Journey Enhancements
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                        <li>
                                                            Third party vendor interfaces
                                                            <i className="icon_alfred_circle_check_solid text-success"></i>
                                                        </li>
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <ErrorMessage
                                    name="scheduletype"
                                    component={"div"}
                                    className="text-danger"
                                />
                                <div className="al_login_footer mt-3">
                                    <button
                                        type="submit"
                                        className="al_login_button"
                                        onClick={handleSubmit}
                                        disabled={!values?.scheduletype}
                                    >
                                        Continue
                                    </button>
                                    <button
                                        type="button"
                                        className="al_login_button_back mt-3"
                                    >
                                        <Link to="/signin" onClick={backToSignInHandle}>
                                            Back to <strong>Sign in</strong>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </>
            )}
            </Formik>
        </React.Fragment >
    )
}

export default SubscriptionForm