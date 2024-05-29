import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Label, FormGroup } from "reactstrap";
import alferdlogo from "../../images/alfredlogowhite.svg";
import alferdlogomobile from "../../images/alfredlogo.svg";
import OtpInput from "react-otp-input";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [activeForm, setActiveForm] = useState(1);
    const [formData, setFormData] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    const inputRefs = useRef(Array(4).fill(null));

    const FirstForm = ({ onSubmit }) => (
        <Formik
            initialValues={{
                username: "",
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required("This field is required")
                    .matches(
                        /^(?:[0-9]{10}|\w+[.-]*\w+@\w+\.[A-Za-z]{2,3})$/,
                        "Invalid email or phone number"
                    )
            })}
            onSubmit={(values) => onSubmit({ ...values })}
        >
            {({ values, errors }) => {
                return (
                    <Form className="wflexLayout">
                        <Row className="al_login_section">
                            <Col lg="7" sm="6" className="al_left_login h-100">
                                <div className="wflexLayout">
                                    <Link to="/">
                                        <img src={alferdlogo} className="login_logodesktop" alt="logo" width={180} />
                                        <img src={alferdlogomobile} className="login_logomobile" alt="logo_mobile" width={180} />
                                    </Link>
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
                                                    name="username"
                                                    placeholder="Enter Mobile Number / Email ID"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="username"
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
                        <Row className="al_login_section">
                            <Col lg="7" sm="6" className="al_left_login h-100">
                                <div className="wflexLayout">
                                    <Link to="/">
                                        <img src={alferdlogo} alt="logo" width={180} />
                                    </Link>
                                </div>
                            </Col>
                            <Col lg="5" sm="6" className="al_login-right h-100">
                                <div className="wflexLayout al_mx-auto">
                                    <div className="wflex-items-center wflexLayout">
                                        <h5 className={"mb-0 text-center"}>
                                            OTP Verification
                                        </h5>
                                        <div className="al_login-form al_registrationform wflexScroll">
                                            <div className="text-center">
                                                <FormGroup className="mt-3">
                                                    <Label>Enter otp sent to ******2987</Label>
                                                    <Row className="mx-0 al_otpfields">
                                                        <Field name="otp">
                                                            {({ field }) => (
                                                                <OtpInput
                                                                    {...field}
                                                                    numInputs={4}
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

    const ThirdForm = ({ onSubmit }) => (
        <Formik
            initialValues={{
                password: "",
                // reenterpassword: "",
            }}
            validationSchema={Yup.object().shape({
                // Define validation rules for Password form fields
                password: Yup.string()
                    .min(8, "Password must be at least 8 characters")
                    .required("Password is required"),
                reenterpassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required"),
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
                        <Row className="al_login_section">
                            <Col lg="7" sm="6" className="al_left_login h-100">
                                <div className="wflexLayout">
                                    <Link to="/">
                                        <img src={alferdlogo} alt="logo" width={180} />
                                    </Link>
                                </div>
                            </Col>
                            <Col lg="5" sm="6" className="al_login-right h-100">
                                <div className="wflexLayout al_mx-auto">
                                    <div className="wflex-items-center wflexLayout">
                                        <h5 className="mb-3">Set Password</h5>
                                        <div className="al_login-form al_registrationform wflexScroll">
                                            <FormGroup>
                                                <Label>New Password</Label>
                                                <Field
                                                    type={isShowPassword ? "password" : "text"}
                                                    name="password"
                                                    placeholder="Enter password"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Re-enter New Password</Label>
                                                <Field
                                                    type={isShowConfirmPassword ? "password" : "text"}
                                                    name="reenterpassword"
                                                    placeholder="Re-enter New Password"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="reenterpassword"
                                                    component={"div"}
                                                    className="text-danger"
                                                />
                                            </FormGroup>
                                            {/* <div className="text-center mb-4">
                            <img src={successImg} alt="success" height={85} />
                            <div className="mt-4">Password set</div>
                            <h4 className="text-success">successfully</h4>
                            <p className="mb-0 textLight">
                              Login to your account with new password
                            </p>
                          </div> */}
                                        </div>
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

    const handleFirstFormSubmit = (values) => {
        setActiveForm(2); // Switch to the second form after submitting the first form
        setFormData({ ...formData, ...values });
    };

    const handleSecondFormSubmit = (values) => {
        setActiveForm(3); // Switch back to the first form after submitting the second form
        setFormData({ ...formData, ...values });
    };

    const handleThirdFormSubmit = (values) => {
        navigate('/signin');
        setFormData({ ...formData, ...values });
    };

    return (
        <div className="al_login_container">
            {activeForm === 1 ? (
                <FirstForm onSubmit={handleFirstFormSubmit} />
            ) : activeForm === 2 ? (
                <SecondForm onSubmit={handleSecondFormSubmit} />
            ) : (
                <ThirdForm onSubmit={handleThirdFormSubmit} />
            )}
        </div>
    );
}