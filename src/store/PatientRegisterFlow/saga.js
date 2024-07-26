import { toast } from "react-toastify";
import { all, call, put, select, takeLeading } from "redux-saga/effects";
import { callAPI } from "../../_mock/internalJsControl";
import {
  getRegisterOTPResponseData,
  getRegisterPasswordResponseData,
  getRegisterRequest,
  getRegisterResponseData,
  getRegisterSubscriptionForm,
} from "./slice";
import moment from "moment";
import { setLoading } from "../UtilityCallFunction/slice";
import store from "../store";
import { getForgorPasswordForm } from "./slice";
import { loginForm } from "./slice";
import { googleLogin } from "./slice";

function* RegisterUser({ payload }) {
  console.log("payload: ", payload);
  // store.dispatch(setLoading(true))
  yield put(getRegisterResponseData({ ...payload, isLoading: true }));

  let response;
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
          message:response?.message,
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

  let response;
  let URL = payload.flowForm === "doctor" ? "/create-doctor-account" :"/create_account" 

  let Payload =  {
    ...payload.actionData,
    ...(payload.flowForm !== "doctor" &&
    {dob: moment(payload?.actionData?.dob).format("YYYY-MM-DD")}),
    password: payload?.actionData?.password,
  }
delete Payload.reenterpassword
  try {
    response = yield call(callAPI, {
      url: URL,
      method: "POST",
      data: Payload,
      contentType: "application/json",
    });

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
      yield put(
        getRegisterPasswordResponseData({ ...payload, isLoading: false })
      );
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(
        getRegisterPasswordResponseData({
          ...payload,
          activeForm: "/passwordSuccess",
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
      getRegisterPasswordResponseData({ ...payload, isLoading: false })
    );
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
          message:response?.message,
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
  yield put(loginForm({  ...payload, isLoading: true }));

  let response;
  try {
    response = yield call(callAPI, {
      url: "/login_account",
      method: "POST",
      data: {
        username: payload?.actionData?.username,
        password: payload?.actionData?.password,
      },
      contentType: "application/json",
    });
    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
      yield put(loginForm({ ...payload, isLoading: false }));
    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(loginForm({ ...payload, isAuthenticated: true, actionData:null,  activeForm: "/home", isLoading: false }));
      localStorage.setItem("token", response.data?.token);
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
    yield put(loginForm({ ...payload, isLoading: false }));
  }
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
function* watchRegisterUserSaga() {
  yield takeLeading(getRegisterResponseData.type, RegisterUser);
  yield takeLeading(getRegisterOTPResponseData.type, OTPRegister);
  yield takeLeading(getRegisterPasswordResponseData.type, PasswordRegister);
  yield takeLeading(getRegisterSubscriptionForm.type, subscriptions);
  yield takeLeading(getForgorPasswordForm.type, updateForgotPassword);
  yield takeLeading(loginForm.type, loginReducer);
  yield takeLeading(googleLogin.type, googleLoginReducer);

}

export default watchRegisterUserSaga;
