import moment from "moment";
import { toast } from "react-toastify";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { callAPI, getAuthRoute, getRole } from "../../_mock/internalJsControl";
import { store } from "../store";
import { setLoading } from "../UtilityCallFunction/slice";
import {
    getRegistrationOtpRequest,
    getRegistrationOtpResponse,
    loginRequest,
    loginResponse,
    setAccountCreateConfirmationRequest,
    setActiveRegistrationForm,
    setAuthRoutes,
    setResetPasswordRequest,
    setResetPasswordResponse,
    verifyRegistrationOtpRequest,
    verifyRegistrationOtpResponse,
    updatePasswordFromForgotPasswrodRequest
} from "./slice";
import { nanoid } from 'nanoid';

const menus = [
    // {
    //   moduleId: '1',
    //   name: 'Dashboard',
    //   link: 'dashboard',
    //   icon: 'icon_alfred_dashboard',
    //   subModules: [
    //     { id: "1", name: "Dashboard", link: 'dashboard', icon: 'icon_alfred_dashboard' }
    //   ]
    // },
    {
        moduleId: "2",
        name: "Home",
        link: "home",
        icon: "icon_alfred_home",
        subModules: [
            { id: "1", name: "Home", link: "home", icon: "icon_alfred_home" },
        ],
    },
    {
        moduleId: "3",
        name: "Behavioral",
        link: "chat",
        icon: "icon_alfred_bot",
        subModules: [
            {
                id: "1",
                name: "Behavioral Chat",
                link: "chat",
                icon: "icon_alfred_bot",
            },
        ],
    },
    {
        moduleId: "4",
        name: "Bot Manager",
        link: "historychat",
        icon: "icon_alfred_botquestionnaire",
        subModules: [
            {
                id: "2",
                name: "History Bot",
                link: "historychat",
                icon: "icon_alfred_botquestionnaire",
            },
            // {
            //   id: "3",
            //   name: "Upload Document",
            //   link: "uploaddocument",
            //   icon: "icon_alfred_uploaddocument",
            // },
            // {
            //   id: "4",
            //   name: "Weekly Curriculum",
            //   link: "healthhubbuilder",
            //   icon: "icon_alfred_healthcurriculum",
            // }
        ],
    },
    {
        moduleId: "5",
        name: "Reports",
        link: "transcriptsummary",
        icon: "icon_alfred_reports",
        subModules: [
            {
                id: "1",
                name: "History Transcript Summary",
                link: "transcriptsummary",
                icon: "icon_alfred_reports",
            },
        ],
    },
    // {
    //   moduleId: '6',
    //   name: 'User Management',
    //   link: 'roles',
    //   icon: 'icon_alfred_roles',
    //   subModules: [
    //     { id: "1", name: "Role Management", link: 'roles', icon: 'icon_alfred_roles' },
    //     { id: "2", name: "Users", link: 'users', icon: 'icon_alfred_menu_client_user' },
    //     { id: "3", name: "List of Patients", link: 'patientslist', icon: 'icon_alfred_patientslist' },
    //     { id: "4", name: "Your Doctors", link: 'doctorslist', icon: 'icon_alfred_doctors' },
    //     { id: "5", name: "Approve Users", link: 'approveusers', icon: 'icon_alfred_approveusers' }
    //   ]
    // },
    // {
    //   moduleId: '5',
    //   name: 'Life Style Goals',
    //   link: 'goals',
    //   icon: 'icon_alfred_L',
    //   subModules: [
    //     { id: "1", name: "Life Style Goals", link: 'goals', icon: 'icon_alfred_L' }
    //   ]
    // },
    // {
    //   moduleId: '6',
    //   name: 'Optimal Risk Management',
    //   link: 'riskmanagement',
    //   icon: 'icon_alfred_O',
    //   subModules: [
    //     { id: "1", name: "Optimal Risk Management", link: 'riskmanagement', icon: 'icon_alfred_O' }
    //   ]
    // },
    // {
    //   moduleId: '7',
    //   pid: 1000,
    //   name: 'Doctors',
    //   link: 'doctors',
    //   icon: 'icon_alfred_doctor',
    //   subModules: [
    //     { id: "1", name: "Doctors", link: 'doctors', icon: 'icon_alfred_doctor' }
    //   ]
    // },
    // {
    //   moduleId: '8',
    //   name: 'Schedules',
    //   link: 'schedules',
    //   icon: 'icon_alfred_schedules',
    //   subModules: [
    //     { id: "1", name: "Schedules", link: 'schedules', icon: 'icon_alfred_schedules' },
    //   ]
    // },
    // {
    //   moduleId: '9',
    //   name: 'Knowledge Bank',
    //   link: 'knowledgebank',
    //   icon: 'icon_alfred_knowledgebank',
    //   subModules: [
    //     { id: "1", name: "Knowledge Bank", link: 'knowledgebank', icon: 'icon_alfred_knowledgebank' },
    //   ]
    // }
];

// TO GET OTP
function* getRegistrationOtp(action) {
    store.dispatch(setLoading(true));
    let { values, activeForm } = action?.payload;
    const prevActiveForm = yield select(state => state.sessionStoreSlice?.regActiveForm);
    const { authRedirectionRoute } = yield select(state => state.sessionStoreSlice);
    let regFormData, forgotPasswordFormData;

    if (authRedirectionRoute === getAuthRoute.FORGOTPASSWORDFROM)
        forgotPasswordFormData = values
    else
        regFormData = values;

    let regActiveForm = prevActiveForm
    let otpMessage = "";

    let reqObj = {
        email: values?.email,
        mobile: values?.mobile,
        username: (values?.username || values?.firstName?.concat(" ").concat(values?.lastName))
    }

    try {
        const response = yield call(callAPI, {
            url: '/generate_otp',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            regActiveForm = activeForm
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
        otpMessage = response?.message
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getRegistrationOtpResponse({ regFormData, forgotPasswordFormData, regActiveForm, otpMessage }))
    store.dispatch(setLoading(false));
}

// TO VERIFY OTP
function* veriyRegistrationOtp(action) {
    store.dispatch(setLoading(true));
    let { values, activeForm } = action?.payload;
    const prevActiveForm = yield select(state => state.sessionStoreSlice?.regActiveForm);
    const { regFormData, forgotPasswordFormData } = yield select(state => state.sessionStoreSlice);
    let regActiveForm = prevActiveForm

    let reqObj = {
        email: regFormData?.email || forgotPasswordFormData?.email || "",
        otp: values?.otp
    }
    try {
        const response = yield call(callAPI, {
            url: '/verify_otp',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            regActiveForm = activeForm
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(verifyRegistrationOtpResponse({ values, regActiveForm }))
    store.dispatch(setLoading(false));
}

// TO SET RESET PASSWORD AND CREATE ACCOUNT
function* setResetPasswordAndCreateAccount(action) {
    store.dispatch(setLoading(true));
    let { values, activeForm } = action?.payload;
    const prevActiveForm = yield select(state => state.sessionStoreSlice?.regActiveForm);
    const { regFormData, regAccountType } = yield select(state => state.sessionStoreSlice);

    let regActiveForm = prevActiveForm
    let createAccountJwt = "";

    let url = regAccountType === getRole.PATIENT ? '/create_account' : '/create-doctor-account';

    let reqObj = regAccountType === getRole.PATIENT ? {
        email: regFormData?.email,
        dob: regFormData?.dob && moment(regFormData?.dob).format("YYYY-MM-DD"),
        gender: regFormData?.gender,
        mobile: regFormData?.mobile,
        rtype: regFormData?.rtype || "",
        education: regFormData?.education || "",
        ssn: regFormData?.ssn || "",
        insuranceurl: regFormData?.licenseNo || "",
        password: values?.password,
        username: regFormData?.firstName.concat(" ").concat(regFormData?.lastName),
        nationality: regFormData?.nationality || "",
    } : {
        username: regFormData?.username,
        email: regFormData?.email,
        mobile: regFormData?.mobile,
        highest_grade: regFormData?.education,
        state_of_practice: regFormData?.specialization,
        national_provider_id: regFormData?.nationalID,
        medical_license_number: regFormData?.licenseNo,
        country: regFormData?.country,
        state: regFormData?.state,
        name_of_hospital: regFormData?.hospital,
        referral_code: "NA",
        password: values?.password,
        city: "NA",
    }

    try {
        const response = yield call(callAPI, {
            url: url,
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("setResetPasswordAndCreateAccount", { reqObj, response })
        if (response?.status && response?.statuscode === 200) {
            regActiveForm = activeForm
            createAccountJwt = response?.data?.token
        } else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(setResetPasswordResponse({ values, regActiveForm, createAccountJwt }))
    store.dispatch(setLoading(false));
}

// TO SEND ACCOUNT CREATION CONFIRMATION
function* setAccountCreateConfirmation(action) {
    store.dispatch(setLoading(true));
    const { createAccountJwt } = yield select(state => state.sessionStoreSlice);

    try {
        const response = yield call(callAPI, {
            url: '/send-confirmation-email',
            method: 'POST',
            data: null,
            contentType: 'application/json',
            intenalToken: createAccountJwt
        });
        if (response?.status && response?.statuscode === 200) {
            action?.payload?.navigate("/signin")
            yield put(setActiveRegistrationForm(""))
            yield put(setAuthRoutes(getAuthRoute.SIGNIN))
        }
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false));
}

// TO LOGIN USER 
function* userLoginRequest(action) {
    let { values, navigate, isGoogleLogin } = action?.payload;
    store.dispatch(setLoading(true));

    let url = isGoogleLogin ? "googleauth" : "login_account";

    let isAuthenticated = false,
        menuData = [],
        authToken = "",
        sessionId = "";

    let reqObj = isGoogleLogin ? {
        username: values?.displayName,
        email: values?.email
    } : {
        username: values?.username,
        password: values?.password,
    }

    try {
        const response = yield call(callAPI, {
            url: url,
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("userLoginRequest=>", { response, reqObj })
        if (response?.status && response?.statuscode === 200) {
            isAuthenticated = true
            menuData = menus
            navigate(`/${menuData?.[0]?.link}`)
            authToken = response?.data?.token
            localStorage.setItem("token", authToken)
            sessionId = nanoid();
        }
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(loginResponse({ isAuthenticated, menuData, authToken, sessionId }))
    store.dispatch(setLoading(false));
}

// TO UPDATE PASSWORD THROUGH FORGOT PASSWORD 
function* updatePassword(action) {
    store.dispatch(setLoading(true));
    let { values, navigate } = action?.payload
    const { forgotPasswordFormData } = yield select(state => state.sessionStoreSlice);

    let reqObj = {
        email: forgotPasswordFormData?.email,
        password: values?.password
    }
    try {
        const response = yield call(callAPI, {
            url: '/update_password',
            method: 'PUT',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("updatePassword=>", response);
        if (response?.status && response?.statuscode === 200) {
            yield put(setAuthRoutes(getAuthRoute.SIGNIN)) //not using this as of now
            navigate("/signin")
        } toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false))
}

function* watchSessionStateSaga() {
    yield takeLeading(getRegistrationOtpRequest.type, getRegistrationOtp);
    yield takeLeading(verifyRegistrationOtpRequest.type, veriyRegistrationOtp);
    yield takeLeading(setResetPasswordRequest.type, setResetPasswordAndCreateAccount);
    yield takeLeading(setAccountCreateConfirmationRequest.type, setAccountCreateConfirmation);
    yield takeLeading(loginRequest.type, userLoginRequest)
    yield takeLeading(updatePasswordFromForgotPasswrodRequest.type, updatePassword)
}

export default watchSessionStateSaga;