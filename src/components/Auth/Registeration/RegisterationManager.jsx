import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegForm, getRole, pageTitle } from "../../../_mock/helperIndex";
import { setActiveRegistrationForm, setResetSessionState } from "../../../store/SessionStore/slice";
import { getMobileValidationLengthByCountryCodeResponse } from "../../../store/UtilityCallFunction/slice";
import { DoctorRegister } from "./DoctorRegister";
import OtpForm from "./OtpForm";
import { PatientRegister } from "./PatientRegister";
import { RegisterTypeSelection } from "./RegisterTypeSelection";
import SetConfirmationForm from "./SetConfirmationForm";
import SetResetPasswordForm from "./SetResetPassword";
import SubscriptionForm from "./SubscriptionForm";

const RegistrationManager = () => {
  pageTitle("Register");

  const dispatch = useDispatch();

  const { regActiveForm, regAccountType } = useSelector((state) => (state?.sessionStoreSlice));

  let isPatientAccount = (regActiveForm === getRegForm.REGFORM) && (regAccountType === getRole.PATIENT);
  let isDoctorAccount = (regActiveForm === getRegForm.REGFORM) && (regAccountType === getRole.PHYSICIAN);

  useEffect(() => {
    if (regActiveForm === "")
      dispatch(setActiveRegistrationForm(getRegForm.REGTYPESELECTION))
    return () => {
      dispatch(setResetSessionState())
      dispatch(getMobileValidationLengthByCountryCodeResponse(null))
    }
  }, []);

  return (
    <React.Fragment>
      {regActiveForm === getRegForm.REGTYPESELECTION && <RegisterTypeSelection />}
      {isPatientAccount && <PatientRegister />}
      {isDoctorAccount && <DoctorRegister />}
      {regActiveForm === getRegForm.OTPFORM && <OtpForm />}
      {regActiveForm === getRegForm.SETPASSWORDFORM && <SetResetPasswordForm />}
      {regActiveForm === getRegForm.SUBSCRIPTIONFORM && <SubscriptionForm />}
      {regActiveForm === getRegForm.CONFIRMATIONFORM && <SetConfirmationForm />}
    </React.Fragment>
  );
}

export default RegistrationManager
