import React from 'react';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthRoute, getRegForm, getRole } from "../../../_mock/helperIndex";
import { setActiveRegistrationForm, setAuthRoutes, setSelectedAccountType } from "../../../store/SessionStore/slice";

export const RegisterTypeSelection = () => {
    const dispatch = useDispatch();

    const initialFormSubmitHandle = (e, setFieldValue) => {
        setFieldValue('registerAccountType', e)
        dispatch(setActiveRegistrationForm(getRegForm.REGFORM))
        dispatch(setSelectedAccountType(e))
    }

    let getActiveClass = (roleType, values) => {
        return values?.registerAccountType === roleType ? "selected" : ""
    }

    let backToSignInHandle = () => {
        dispatch(setActiveRegistrationForm(""))
        dispatch(setAuthRoutes(getAuthRoute.SIGNIN))
    }

    return (
        <React.Fragment>
            <Formik
                enableReinitialize
                initialValues={{
                    registerAccountType: ""
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <div className="wflex-items-center wflexLayout">
                        <div className=" mx-auto wflexLayout wflex-items-center">
                            <h5 className="mb-2 w-80">What would you like to register as</h5>
                            <label className="mb-3">Select one option</label>
                            <div className="al_login-form al_registrationform wflexScroll">
                                <div
                                    className={`al_accounttype mb-3 ${getActiveClass(getRole.PATIENT, values)}}`}
                                    onClick={() => initialFormSubmitHandle(getRole.PATIENT, setFieldValue)}
                                >
                                    <h6 className="mb-0 fw-medium">I am a</h6>
                                    <h5 className="mb-0 lh-normal pe-4" style={{ lineHeight: 1.25 }}>
                                        Patient
                                    </h5>
                                    <small className="text-muted mb-0 me-4 pe-5 mt-1">Your health journey starts here.</small>
                                </div>
                                <div
                                    className={`al_accounttype ${getActiveClass(getRole.PHYSICIAN, values)}`}
                                    onClick={() => initialFormSubmitHandle(getRole.PHYSICIAN, setFieldValue)}
                                >
                                    <h6 className="mb-0 fw-medium">I am a</h6>
                                    <h5 className="mb-0 pe-4" style={{ lineHeight: 1.25 }}>
                                        Healthcare Provider
                                    </h5>
                                    <small className="text-muted mb-0 me-4 pe-5 mt-1">Joining hands for well-being.</small>
                                </div>
                            </div>
                            <div className="mt-3 text-medium" onClick={backToSignInHandle}>
                                Already have an account?{" "}
                                <Link to="/signin" className="al_text_link cs_medium">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
            </Formik>
        </React.Fragment>
    )
}
