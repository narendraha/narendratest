import React, { useEffect, useRef, useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../InnerApp/LoadingComponent";
import alferdlogo from "../../images/alfredlogowhite.svg";
import OTPComponent from "../ForgotPassword/OTP";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterBackToForm,
  getRegisterOTPResponseData,
  getRegisterResponseData,
} from "../../store/PatientRegisterFlow/slice";
import { getActionTypes } from "../../_mock/internalJsControl";

export default function RegisterInfo() {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, activeForm, message, actionData } = useSelector(
    (state) => state.patientRegisterSlice
  );
  useEffect(() => {
    if (activeForm) {
      navigate(activeForm);
    }
  }, [activeForm]);
  const inputRefs = useRef(Array(4).fill(null));
  const handleSecondFormSubmit = (values) => {
    dispatch(
      getRegisterOTPResponseData({
        actionType: getActionTypes.SELECT,
        actionData: { ...actionData, ...values },
      })
    );
  };
  const resendOtp = (data) => {
    dispatch(
      getRegisterResponseData({
        actionType: getActionTypes.SELECT,
        actionData: actionData,
      })
    );
  };
  const SecondForm = ({ onSubmit }) => (
    <Formik
      initialValues={{
        otp: "",
      }}
      validationSchema={Yup.object().shape({
        otp: Yup.string()
          .length(4, "OTP must be exactly 4 characters")
          .matches(/^\d{4}$/, "OTP must contain only digits")
          .required("OTP is required"),
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
        setFieldError,
        handleChange,
      }) => {
        return (
          <Form className="wflexLayout">
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
                    <h5 className={"mb-0 text-center"}>OTP Verification</h5>
                    <div className="al_login-form al_registrationform wflexScroll">
                      <div className="text-center">
                        <FormGroup className="mt-3">
                          <Label>{message ? message : null}</Label>
                          {/* <div className="al_text_link text-small" style={{textDecoration: "underline"}}>Change Mobile Number/Email ID</div> */}
                          <Row className="mx-0 al_otpfields">
                            <Field name="otp">
                              {({ field }) => (
                                <OtpInput
                                  {...field}
                                  numInputs={4}
                                  // separator={<span>-</span>}
                                  isInputNum
                                  containerStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  inputStyle={{
                                    margin: "5px",
                                    width: "5vw",
                                    height: "5vw",
                                    textAlign: "center",
                                    border: "1px solid #B9C4D2",
                                    borderRadius: "12px",
                                  }}
                                  ref={(ref) => {
                                    if (ref) inputRefs.current[0] = ref;
                                  }}
                                  renderInput={(inputProps, index) => (
                                    <React.Fragment key={index}>
                                      <input
                                        {...inputProps}
                                        value={values.otp[index] || ""}
                                        onChange={(e) => {
                                          const updatedValue =
                                            e.target.value.replace(/\D/g, "");
                                          handleChange({
                                            target: {
                                              name: "otp",
                                              value:
                                                index === 0
                                                  ? updatedValue
                                                  : values.otp.substring(
                                                      0,
                                                      index
                                                    ) +
                                                    updatedValue +
                                                    values.otp.substring(
                                                      index + 1
                                                    ),
                                            },
                                          });
                                          if (
                                            index < 3 &&
                                            updatedValue.length === 1
                                          ) {
                                            inputRefs.current[
                                              index + 1
                                            ]?.focus();
                                          }
                                        }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Backspace" ||
                                            values.otp[index] === ""
                                          ) {
                                            // Handle backspace to remove the last character
                                            e.preventDefault();
                                            const updatedValue =
                                              values.otp.substring(0, index) +
                                              "" +
                                              values.otp.substring(index + 1);
                                            handleChange({
                                              target: {
                                                name: "otp",
                                                value: updatedValue,
                                              },
                                            });
                                            if (index > 0) {
                                              const newRefs = [
                                                ...inputRefs.current,
                                              ];
                                              newRefs[index - 1]?.focus();
                                              inputRefs.current = newRefs;
                                            }
                                          }
                                        }}
                                        name={`otp.${index}`}
                                        ref={(ref) => {
                                          if (ref)
                                            inputRefs.current[index] = ref;
                                        }}
                                      />
                                      {index < 3}
                                    </React.Fragment>
                                  )}
                                />
                              )}
                            </Field>
                            {!isFormLoading && (
                              <OTPComponent
                                resendOtp={resendOtp}
                                data={actionData}
                              />
                            )}
                          </Row>
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-danger"
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="al_login_footer mt-3">
                      <button type="submit" className="al_login_button">
                        Verify
                      </button>
                      <button
                        type="button"
                        className="al_login_button_back mt-3 py-2"
                        onClick={() =>
                          dispatch(
                            getRegisterBackToForm({
                              activeForm: "/patient/registration",
                            })
                          )
                        }
                      >
                        <i
                          className="icon_alfred_back-arrow me-2"
                          style={{ verticalAlign: "middle" }}
                        ></i>
                        Back
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
      <SecondForm onSubmit={handleSecondFormSubmit} />
    </div>
  );
}
