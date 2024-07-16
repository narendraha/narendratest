import { toast } from "react-toastify";
import { all, call, put, select, takeLeading } from "redux-saga/effects";
import { callAPI } from "../../_mock/internalJsControl";
import {
  getRegisterClear,
  getRegisterOTPResponseData,
  getRegisterPasswordResponseData,
  getRegisterRequest,
  getRegisterResponseData,
  getRegisterSubscriptionForm,
} from "./slice";
import moment from "moment";
import { setLoading } from "../UtilityCallFunction/slice";
import store from '../store'
// import { useNavigate } from "react-router";


function* RegisterUser({ payload }) {
  // const navigate= useNavigate()
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
    console.log("response: ", response);

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
    yield put(getRegisterResponseData({ ...payload, activeForm: '', isLoading: false }));

    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      // navigate('patient/OTP')
      yield put(getRegisterResponseData({ ...payload, activeForm: '/patient/OTP', isLoading: false }));
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
    yield put(getRegisterResponseData({ ...payload, activeForm: '', isLoading: false }));
  }

}

function* OTPRegister({ payload }) {
  console.log("payload: otp", payload);
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
    console.log("response: ", response);

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
    yield put(getRegisterOTPResponseData({ ...payload, activeForm: '', isLoading: false }));

    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(getRegisterOTPResponseData({ ...payload, activeForm: "/passwordReset", isLoading: false }));
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
  }
}

function* PasswordRegister({ payload }) {
  console.log("payload: password", payload);
  yield put(getRegisterPasswordResponseData({ ...payload, isLoading: true }));

  let response;
  try {
    response = yield call(callAPI, {
      url: "/create_account",
      method: "POST",
      data: {
        ...payload.actionData,
        dob: moment(payload?.actionData?.dob).format("YYYY-MM-DD"),
        password: payload?.actionData?.password,
      },
      contentType: "application/json",
    });
    console.log("response: ", response);

    if (!response?.status && response?.status !== 200) {
      toast(response?.message, {
        position: "top-right",
        type: "error",
      });
  yield put(getRegisterPasswordResponseData({ ...payload, isLoading: false }));

    } else {
      toast(response?.message, {
        position: "top-right",
        type: "success",
      });
      yield put(getRegisterPasswordResponseData({ ...payload, activeForm: "/passwordSuccess", isLoading: false }));
    }
  } catch (error) {
    toast(error?.response?.data?.detail, {
      position: "top-right",
      type: "error",
    });
  yield put(getRegisterPasswordResponseData({ ...payload, isLoading: false }));

  }
}
function* subscriptions({ payload }) {
  yield put(getRegisterSubscriptionForm({ ...payload, activeForm: "/signin"}));
}
function* watchRegisterUserSaga() {
  yield takeLeading(getRegisterResponseData.type, RegisterUser);
  yield takeLeading(getRegisterOTPResponseData.type, OTPRegister);
  yield takeLeading(getRegisterPasswordResponseData.type, PasswordRegister);
  yield takeLeading(getRegisterSubscriptionForm.type, subscriptions);
}

export default watchRegisterUserSaga;
