import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import alferdlogomobile from "../../images/alfredlogo.svg";
import alferdlogo from "../../images/alfredlogowhite.svg";
import Loading from "../InnerApp/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterClear,
  getRegisterResponseData,
} from "../../store/PatientRegisterFlow/slice";
import { getActionTypes } from "../../_mock/internalJsControl";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const { isLoading, activeForm, actionData } = useSelector(
    (state) => state.patientRegisterSlice
  );
  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);

  const handleFirstFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    dispatch(
      getRegisterResponseData({
        actionType: getActionTypes.SELECT,
        actionData: values,
      })
    );
  };
  return (
    <div className="al_login_container">
      <Formik
        enableReinitialize
        initialValues={{
          email: formData?.email || actionData?.email || "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Mobile Number / Email-ID field is required")
            .matches(
              /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
              "Invalid email or phone number"
            ),
        })}
        onSubmit={(values) => handleFirstFormSubmit({ ...values })}
      >
        {({ values, errors, setFieldValue }) => {
          return (
            <Form className="wflexLayout">
              {isLoading && <Loading />}
              <Row className="al_login_section">
                <Col lg="7" sm="6" className="al_left_login h-100">
                  <div className="wflexLayout">
                    <img
                      src={alferdlogo}
                      className="login_logodesktop"
                      alt="logo"
                    />
                    <img
                      src={alferdlogomobile}
                      className="login_logomobile"
                      alt="logo_mobile"
                    />
                  </div>
                </Col>
                <Col lg="5" sm="6" className="al_login-right h-100">
                  <div className="wflexLayout al_mx-auto">
                    <div className="wflex-items-center wflexLayout">
                      <h5>Forgot Password</h5>

                      <div className="al_login-form wflexScroll">
                        <FormGroup>
                          <Label>Mobile Number / Email ID</Label>
                          <Field
                            type="text"
                            name="email"
                            placeholder="e.g. abc@email.com"
                            className="form-control"
                            onChange={(e) => {
                              const trimmedValue = e.target.value.trim();
                              setFieldValue("email", trimmedValue);
                            }}
                          />
                          <ErrorMessage
                            name="email"
                            component={"div"}
                            className="text-danger"
                          />
                        </FormGroup>
                      </div>
                      <div className="al_login_footer mt-3">
                        <button type="submit" className="al_login_button">
                          Verify
                        </button>
                        <button
                          type="button"
                          className="al_login_button_back mt-3"
                          onClick={() => dispatch(getRegisterClear())}
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
    </div>
  );
}
