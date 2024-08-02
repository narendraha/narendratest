import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import alferdlogo from "../../images/alfredlogowhite.svg";
import {
  getRegisterClear,
  getRegisterForwardToForm
} from "../../store/PatientRegisterFlow/slice";
import Loading from "../InnerApp/LoadingComponent";

export default function RegisterInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, activeForm, actionData } = useSelector(
    (state) => state.patientRegisterSlice
  );

  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);
  const handleFinalSubmit = (values) => {
    dispatch(
      getRegisterForwardToForm({
        activeForm: "/passwordSuccess",
      })
    );
    // dispatch(
    //   getRegisterSubscriptionForm({
    //     actionType: getActionTypes.SELECT,
    //     actionData: values,
    //   })
    // );

    setTimeout(() => dispatch(getRegisterClear()), [2000]);
  };
  const SubscriptionForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        scheduletype: "1",
      }}
      validationSchema={Yup.object().shape({
        // Define validation rules for Subscription form fields
        scheduletype: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => onSubmit({ ...values })}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        setFieldTouched,
        handleSubmit,
        formikProps,
      }) => {
        return (
          <Form className="wflexLayout" onSubmit={handleSubmit}>
            {isLoading && <Loading />}
            <Row className="al_login_section">
              <Col lg="7" sm="6" className="al_left_login h-100">
                <div className="wflexLayout">
                  <img src={alferdlogo} alt="logo" />
                </div>
              </Col>
              <Col lg="5" sm="6" className="al_login-right h-100">
                <div className="wflexLayout al_mx-auto">
                  <div className="wflex-items-center wflexLayout">
                    <h5 className={"mb-0"}>Type of subscription</h5>
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
                      <button type="submit" className="al_login_button">
                        Continue
                      </button>
                      <button
                        type="button"
                        className="al_login_button_back mt-3"
                      >
                        <Link to="/signin">
                          Back to <strong>Sign in</strong>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );

  return (
    <div className="al_login_container">
      <SubscriptionForm onSubmit={handleFinalSubmit} />
    </div>
  );
}
