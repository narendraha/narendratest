import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes } from "../../_mock/internalJsControl";
const initialState = {
  isLoading: false,
  error: null,
  actionType: getActionTypes.UNSELECT,
  actionData: null,
  activeForm: "",
  message: "",
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
      console.log("state, action: ", state, action);
      return {
        ...state,
        isLoading: action.payload.isLoading,
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
      console.log("state, action: ", state, action);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterPasswordResponseData: (state, action) => {
      console.log("state, action: ", state, action);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterForwardToForm: (state, action) => {
      console.log("state, action: ", state, action);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        activeForm: action.payload.activeForm,
      };
    },
    getRegisterSubscriptionForm: (state, action) => {
      console.log("state, action: ", state, action);
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
  getRegisterClear
} = actions;

export default reducer;
