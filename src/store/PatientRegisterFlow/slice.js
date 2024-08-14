import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes } from "../../_mock/internalJsControl";
const initialState = {
  isLoading: false,
  error: null,
  actionType: getActionTypes.UNSELECT,
  actionData: null,
  activeForm: "",
  message: "",
  flowForm: "",
  isAuthenticated: localStorage.getItem("token") ? true : false,
  createAccountJwt: "",
  registerAccountType: ""
};

const patientRegisterSlice = createSlice({
  name: "patientRegister",
  initialState,
  reducers: {
    getRegisterRequest: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getRegisterResponseData: (state, action) => {
      return {
        ...state,
        isLoading: action?.payload?.isTerm ? "" : action.payload.isLoading,
        actionType: action.payload.actionType,
        actionData: action.payload.actionData,
        activeForm: action.payload.activeForm,
        message: action.payload.message,
      };
    },
    getRegisterBackToForm: (state, action) => {
      console.log("state, action: ", state, action);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterOTPResponseData: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterPasswordResponseData: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
        createAccountJwt: action.payload.createAccountJwt,
        actionData: action.payload.actionData
      };
    },
    getRegisterForwardToForm: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterSubscriptionForm: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterClear: (state, action) => initialState,
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getFlowForm: (state, action) => {
      return {
        activeForm: action.payload.activeForm,
        flowForm: action.payload.flowForm,
        registerAccountType: action?.payload
      };
    },
    getForgorPasswordForm: (state, action) => {
      return {
        ...state,
        flowForm: action.payload.flowForm,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
        message: action.payload.message,
      };
    },
    loginForm: (state, action) => {
      return {
        // isAuthenticated: action.payload.isAuthenticated,
        actionData: action.payload.actionData,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    googleLogin: (state, action) => {
      return {
        isAuthenticated: action.payload.isAuthenticated,
        actionData: action.payload.actionData,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    logoutSlice: (state, action) => {
      return {
        ...initialState,
        isAuthenticated: false,
      }
    },
    setAuthenticationRequest:(state, action)=>{
      state.isAuthenticated = action?.payload
    },
    sendConfirmationMailRegisterRequest: () => { },
  },
});

let { actions, reducer } = patientRegisterSlice;
export const {
  getRegisterRequest,
  getRegisterResponseData,
  getRegisterBackToForm,
  getRegisterOTPResponseData,
  getRegisterPasswordResponseData,
  getRegisterForwardToForm,
  getRegisterSubscriptionForm,
  getRegisterClear,
  getFlowForm,
  getForgorPasswordForm,
  loginForm,
  googleLogin,
  logoutSlice,
  sendConfirmationMailRegisterRequest,
  setAuthenticationRequest
} = actions;

export default reducer;
