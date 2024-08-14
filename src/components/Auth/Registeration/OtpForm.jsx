import React, { useRef } from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Label, Row } from "reactstrap";
import * as Yup from 'yup';
import { getRegForm } from "../../../_mock/internalJsControl";
import { setActiveRegistrationForm, verifyRegistrationOtpRequest, getRegistrationOtpRequest } from "../../../store/SessionStore/slice";
import ResendOTP from "./ResendOtp";


const OtpForm = () => {
    const dispatch = useDispatch();

    const inputRefs = useRef(Array(4).fill(null));

    const { otpMessage, regActiveForm, regFormData } = useSelector((state) => (state?.sessionStoreSlice));

    // to get otp again
    const resendOtpHandle = () => {
        dispatch(getRegistrationOtpRequest({ values: regFormData, activeForm: regActiveForm }));
    };

    const handleSubmit = (values, activeForm) => {
        if (values)
            dispatch(verifyRegistrationOtpRequest({ values, activeForm }));
        else
            dispatch(setActiveRegistrationForm(activeForm))
    }

    return (
        <React.Fragment>
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
                onSubmit={(values) => {
                    console.log("Submit=>", values)
                    handleSubmit(values, getRegForm.SETPASSWORDFORM)
                }}
            >
                {({ values, handleChange }) => (
                    <>
                        <Form className="wflexLayout">
                            <div className="wflexLayout al_mx-auto">
                                <div className="wflex-items-center wflexLayout">
                                    <h5 className={"mb-0 text-center"}>One Time Password [ 2FA ] Verification</h5>
                                    <div className="al_login-form al_registrationform wflexScroll">
                                        <div className="text-center">
                                            <FormGroup className="mt-3">
                                                <Label>{otpMessage || "One Time Password sent on your mail "}</Label>
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
                                                    {/* To resend otp */}
                                                    <ResendOTP resendOtp={resendOtpHandle} />
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
                                        <button
                                            type="submit"
                                            className="al_login_button"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            type="button"
                                            className="al_login_button_back mt-3 mb-0 py-2"
                                            onClick={() => handleSubmit(null, getRegForm.REGFORM)}
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
                        </Form>
                    </>
                )
                }
            </Formik >
        </React.Fragment >
    )
}

export default OtpForm