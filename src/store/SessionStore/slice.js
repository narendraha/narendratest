import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regActiveForm: "",
    regFormData: "",
    regAccountType: "",
    otpMessage: "",
    otpFormData: "",
    setResetFormData: "",
    createAccountJwt: null,
    isAuthenticated: false,
    authToken: "",
    authRedirectionRoute: "",
    forgotPasswordFormData: "",
};

const sessionStoreSlice = createSlice({
    name: 'sessionStoreSlice',
    initialState,
    reducers: {
        setResetSessionState: (state) => {
            return {
                ...initialState,
                authRedirectionRoute: state.authRedirectionRoute
            }
        },
        setActiveRegistrationForm: (state, action) => {
            state.regActiveForm = action?.payload
        },
        setSelectedAccountType: (state, action) => {
            state.regAccountType = action?.payload
        },
        setPersistActionData: (state, action) => {
            state.regFormData = action?.payload
        },
        // To get Regestration OTP
        getRegistrationOtpRequest: () => { },
        getRegistrationOtpResponse: (state, action) => {
            state.regFormData = action?.payload?.regFormData
            state.regActiveForm = action?.payload?.regActiveForm
            state.otpMessage = action?.payload?.otpMessage
            state.forgotPasswordFormData = action?.payload?.forgotPasswordFormData
        },
        verifyRegistrationOtpRequest: () => { },
        verifyRegistrationOtpResponse: (state, action) => {
            state.otpFormData = action?.payload?.values
            state.regActiveForm = action?.payload?.regActiveForm
        },
        setResetPasswordRequest: () => { },
        setResetPasswordResponse: (state, action) => {
            state.setResetFormData = action?.payload?.setResetFormData
            state.regActiveForm = action?.payload?.regActiveForm
            state.createAccountJwt = action?.payload?.createAccountJwt
        },
        setAccountCreateConfirmationRequest: () => { },

        // login implementation
        loginRequest: () => { },
        loginResponse: (state, action) => {
            state.isAuthenticated = action?.payload?.isAuthenticated
            state.menuData = action?.payload?.menuData
            state.authToken = action?.payload?.authToken
            state.sessionId = action?.payload?.sessionId
        },
        logoutRequest: (state) => {
            state.isAuthenticated = false
            state.authToken = ""
        },
        setAuthRoutes: (state, action) => {
            state.authRedirectionRoute = action?.payload
        },
        updatePasswordFromForgotPasswrodRequest: () => { },
        setNonAuthSessionIdReuqest: (state, action) => {
            state.nonAuthSessionId = action?.payload
        }
    },
});

const { actions, reducer } = sessionStoreSlice;
export const {
    setActiveRegistrationForm,
    setSelectedAccountType,
    setPersistActionData,
    setResetSessionState,
    getRegistrationOtpRequest, getRegistrationOtpResponse,
    verifyRegistrationOtpRequest, verifyRegistrationOtpResponse,
    setResetPasswordRequest, setResetPasswordResponse,
    setAccountCreateConfirmationRequest,
    loginRequest, loginResponse,
    logoutRequest,
    setAuthRoutes,
    updatePasswordFromForgotPasswrodRequest, updatePasswordFromForgotPasswrodResponse,
    setNonAuthSessionIdReuqest
} = actions;

export default reducer;