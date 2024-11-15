import React from "react";
import { Icon } from "@iconify/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Label } from "reactstrap";
import * as Yup from 'yup';
import { passwordReg } from "../../../_mock/RegularExp";
import { getAuthRoute, getRegForm } from "../../../_mock/helperIndex";
import {
    setActiveRegistrationForm,
    setAuthRoutes,
    setResetAdminPasswordRequest,
    setResetPasswordRequest,
    updatePasswordFromForgotPasswrodRequest
} from "../../../store/SessionStore/slice";

const SetResetPasswordForm = ({ props }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { isForgotPassword } = props || false;

    const { isAdminFirstLogin } = useSelector((state) => (state?.sessionStoreSlice));

    const handleSubmit = (values) => {
        if (isForgotPassword)
            dispatch(updatePasswordFromForgotPasswrodRequest({ values, navigate }))
        else if (isAdminFirstLogin)
            dispatch(setResetAdminPasswordRequest({ values, activeForm: getRegForm.REGTYPESELECTION, navigate }))
        else
            dispatch(setResetPasswordRequest({ values, activeForm: getRegForm.SUBSCRIPTIONFORM }))
    }

    let backToSignInHandle = () => {
        dispatch(setActiveRegistrationForm(""))
        dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    password: "",
                    reenterpassword: "",
                    oldPasswordEyeClose: false,
                    newPasswordEyeClose: false
                }}
                validationSchema={Yup.object().shape({
                    // Define validation rules for Password form fields
                    password: Yup.string()
                        .max(50, "Max 50 characters are allowed")
                        .matches(passwordReg, "Please enter a valid password")
                        .required("Password is required"),
                    reenterpassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Confirm Password is required"),
                })}
                onSubmit={(values) => {
                    console.log("Submit=>", values)
                    handleSubmit(values)
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <Form className="wflexLayout">
                        <div className="wflexLayout al_mx-auto">
                            <div className="wflex-items-center wflexLayout">
                                <h5 className="mb-3">Set Password</h5>
                                <div className="al_login-form al_registrationform wflexScroll">
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <div className="d-flex align-items-end position-relative">
                                            <Field
                                                type={values?.oldPasswordEyeClose ? "text" : "password"}
                                                name="password"
                                                placeholder="e.g.Pass@123"
                                                className="form-control"
                                                onChange={(e) => {
                                                    const trimmedValue = e.target.value.trim();
                                                    setFieldValue("password", trimmedValue);
                                                }}
                                            />
                                            <div
                                                onClick={() => setFieldValue('oldPasswordEyeClose', !values?.oldPasswordEyeClose)}
                                                className="password_icon"
                                            >
                                                <Icon icon={values?.oldPasswordEyeClose ? 'bi:eye' : 'bi:eye-slash'} width="1.2em" height="1.2em" />
                                            </div>
                                        </div>
                                        <div className="al_note mt-2 fw-light">
                                            Password must contain 8 characters, including one
                                            uppercase letter, one lowercase letter, one number,
                                            and one special character
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Re-enter New Password</Label>
                                        <div className="d-flex align-items-end position-relative">
                                            <Field
                                                type={values?.newPasswordEyeClose ? "text" : "password"}
                                                name="reenterpassword"
                                                placeholder="e.g.Pass@123"
                                                className="form-control"
                                                onChange={(e) => {
                                                    const trimmedValue = e.target.value.trim();
                                                    setFieldValue("reenterpassword", trimmedValue);
                                                }}
                                            />
                                            <div
                                                onClick={() => setFieldValue('newPasswordEyeClose', !values?.newPasswordEyeClose)}
                                                className="password_icon"
                                            >
                                                <Icon icon={values?.newPasswordEyeClose ? 'bi:eye' : 'bi:eye-slash'} width="1.2em" height="1.2em" />
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="reenterpassword"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="al_login_footer mt-3">
                                    <button
                                        type="submit"
                                        className="al_login_button"
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
        </React.Fragment>
    )
}

export default SetResetPasswordForm