import moment from "moment";
import { toast } from "react-toastify";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { callAPI, getRole } from "../../_mock/internalJsControl";
import { setLoading } from "../UtilityCallFunction/slice";
import store from "../store";
import {
  getForgorPasswordForm,
  getRegisterOTPResponseData,
  getRegisterPasswordResponseData,
  getRegisterResponseData,
  getRegisterSubscriptionForm,
  googleLogin,
  loginForm,
  sendConfirmationMailRegisterRequest
} from "./slice";

function* RegisterUser({ payload }) {
  console.log("payload: ", payload);
  // store.dispatch(setLoading(true))
  yield put(getRegisterResponseData({ ...payload, isLoading: true }));

  let response;
  if (!payload?.isTerm) {
    try {
      response = yield call(callAPI, {
        url: "/generate_otp",
        method: "POST",
        data: {
          email: payload?.actionData?.email,
          username: payload?.actionData?.username,
          mobile: payload?.actionData?.mobile,
        },
        contentType: "application/json",
      });

      if (!response?.status && response?.status !== 200) {
        toast(response?.message, {
          position: "top-right",
          type: "error",
        });
        yield put(
          getRegisterResponseData({
            ...payload,
            activeForm: "",
            isLoading: false,
          })
        );
      } else {
        toast(response?.message, {
          position: "top-right",
          type: "success",
        });
        yield put(
          getRegisterResponseData({
            ...payload,
            message: response?.message,
            activeForm: "/patient/OTP",
            isLoading: false,
          })
        );
      }
    } catch (error) {
      toast(error?.response?.data?.detail, {
        position: "top-right",
        type: "error",
      });
      yield put(
        getRegisterResponseData({ ...payload, activeForm: "", isLoading: false })
      );
    }
  }
}

function* OTPRegister({ payload }) {
  yield put(getRegisterOTPResponseData({ ...payload, isLoading: true }));

  let response;
  try {
    response = yield call(callAPI, {
      url: "/verify_otp",
      method: "POST",
      data: {
        email: payload?.actionData?.email,
        otp: payload?.actionData?.otp,
      },
      contentType: "application/json",
    });

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
      yield put(
        getRegisterOTPResponseData({
          ...payload,
          activeForm: "",
          isLoading: false,
        })
      );
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(
        getRegisterOTPResponseData({
          ...payload,
          activeForm: "/passwordReset",
          isLoading: false,
        })
      );
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
  }
}

function* PasswordRegister({ payload }) {
  console.log('payload: ', payload);
  yield put(getRegisterPasswordResponseData({ ...payload, isLoading: true }));

  const { flowForm } = yield select(state => state.patientRegisterSlice);
  let url = flowForm === getRole.PATIENT ? '/create_account' : '/create-doctor-account'
  let reqObj = flowForm === getRole.PATIENT ? {
    email: payload?.actionData?.email,
    dob: moment(payload?.actionData?.dob).format("YYYY-MM-DD"),
    gender: payload?.actionData?.gender,
    mobile: payload?.actionData?.mobile,
    rtype: payload?.actionData?.rtype,
    education: payload?.actionData?.education,
    ssn: payload?.actionData?.ssn,
    insuranceurl: payload?.actionData?.licenseNo,
    password: payload?.actionData?.password,
    username: payload?.actionData?.username,
    insuranceurl: ""
  } : {
    username: payload?.actionData?.username,
    email: payload?.actionData?.email,
    mobile: payload?.actionData?.mobile,
    highest_grade: payload?.actionData?.education,
    state_of_practice: payload?.actionData?.specialization,
    national_provider_id: payload?.actionData?.nationalID,
    medical_license_number: payload?.actionData?.licenseNo,
    country: payload?.actionData?.country,
    state: payload?.actionData?.state,
    name_of_hospital: payload?.actionData?.hospital,
    referral_code: "NA",
    password: payload?.actionData?.password,
    city: "NA"
  }
  console.log("PasswordRegister=>", reqObj, payload)
  let activeForm = "";
  let createAccountJwt = "";
  let response;

  try {
    response = yield call(callAPI, {
      url: url,
      method: "POST",
      data: reqObj,
      contentType: "application/json",
    });

    if (response?.status && response?.statuscode === 200) {
      activeForm = "/subscription"
      createAccountJwt = response?.data?.token
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
    }
    yield put(
      getRegisterPasswordResponseData({ ...payload, activeForm, createAccountJwt, isLoading: false })
    );
  } catch (error) {

  }
}
function* subscriptions({ payload }) {
  yield put(getRegisterSubscriptionForm({ ...payload, activeForm: "/signin" }));
}
function* updateForgotPassword({ payload }) {
  console.log("payload: ", payload);
  // store.dispatch(setLoading(true))
  yield put(getForgorPasswordForm({ ...payload, isLoading: true }));

  let response;
  try {
    response = yield call(callAPI, {
      url: "/update_password",
      method: "PUT",
      data: {
        email: payload?.actionData?.email,
        password: payload?.actionData?.password,
      },
      contentType: "application/json",
    });

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
      yield put(
        getForgorPasswordForm({ ...payload, activeForm: "", isLoading: false })
      );
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(
        getForgorPasswordForm({
          ...payload,
          message: response?.message,
          activeForm: "/signin",
          flowForm: "",
          isLoading: false,
        })
      );
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
    yield put(
      getForgorPasswordForm({
        ...payload,
        activeForm: "",
        flowForm: "",
        isLoading: false,
      })
    );
  }
}

function* loginReducer({ payload }) {
  // store.dispatch(setLoading(true))
  let { actionData, navigate } = payload
  yield put(loginForm({ ...actionData, isLoading: true }));
  let isAuthenticated = false;
  let activeForm = ""
  let response;
  try {
    response = yield call(callAPI, {
      url: "/login_account",
      method: "POST",
      data: {
        username: actionData?.username,
        password: actionData?.password,
      },
      contentType: "application/json",
    });
    if (response?.status && response?.statuscode === 200) {
      isAuthenticated = true
      activeForm = "/home"
      // navigate("/home")
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
  }
  yield put(loginForm({ ...actionData, isAuthenticated, actionData: null, activeForm: activeForm, isLoading: false }));
  localStorage.setItem("token", response.data?.token);
}

function* googleLoginReducer({ payload }) {
  // store.dispatch(setLoading(true))
  yield put(googleLogin({ isLoading: true }));

  let response;
  try {
    response = yield call(callAPI, {
      url: "/googleauth",
      method: "POST",
      data: {
        username: payload?.actionData?.displayName,
        email: payload?.actionData?.email,
      },
      contentType: "application/json",
    });
    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
      yield put(googleLogin({ ...payload, isLoading: false }));
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      localStorage.setItem("token", response.data?.token);
      yield put(googleLogin({ ...payload, isAuthenticated: true, activeForm: "/home", isLoading: false }));
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
    yield put(googleLogin({ ...payload, isLoading: false }));
  }
}

export const fetchConfirmationEmail = async (token, navigate) => {
  const url = "https://api.helloalfred.ai/send-confirmation-email";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: null
    });
    if (response?.status)
      navigate("/signin")
    else
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
  } catch (error) {

  }
}

function* sendConfirmationMailForRegister(action) {
  store.dispatch(setLoading(true));
  const { createAccountJwt } = yield select(state => state?.patientRegisterSlice);
  const token = createAccountJwt;

  try {
    // const response = yield call(callAPI, {
    //   url: '/send-confirmation-email',
    //   method: 'POST',
    //   data: null,
    //   contentType: 'application/json',
    // });
    yield call(fetchConfirmationEmail, token, action.payload);
  } catch (error) {

  }
  store.dispatch(setLoading(false))
}

function* watchRegisterUserSaga() {
  yield takeLeading(getRegisterResponseData.type, RegisterUser);
  yield takeLeading(getRegisterOTPResponseData.type, OTPRegister);
  yield takeLeading(getRegisterPasswordResponseData.type, PasswordRegister);
  yield takeLeading(getRegisterSubscriptionForm.type, subscriptions);
  yield takeLeading(getForgorPasswordForm.type, updateForgotPassword);
  yield takeLeading(loginForm.type, loginReducer);
  yield takeLeading(googleLogin.type, googleLoginReducer);
  yield takeLeading(sendConfirmationMailRegisterRequest.type, sendConfirmationMailForRegister)
}

export default watchRegisterUserSaga;
