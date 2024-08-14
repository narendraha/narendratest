import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import { store } from '../store';
import {
    contactUsRequest,
    getAssetsRequest,
    getAssetsResponse,
    getMobileValidationLengthByCountryCodeRequest,
    getMobileValidationLengthByCountryCodeResponse,
    getPatientDetailsRequest,
    getPatientDetailsResponse,
    sendEmailPdfRequest,
    setLoading
} from './slice';

// TO GET PATIENT DETAILS
function* getPatientDetails(action) {
    let profileDetails = ""
    try {
        const response = yield call(callAPI, {
            url: '/userdetails',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            profileDetails = response?.data
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }

    yield put(getPatientDetailsResponse(profileDetails))
}

// TO GET THE ASSETS
function* getAssetsFile(action) {
    store.dispatch(setLoading(true))
    let key = action?.payload?.split(".")?.[0];
    let asset;

    let reqObj = {
        filename: action?.payload
    }
    try {
        const response = yield call(callAPI, {
            url: '/get-asset-url',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log(`getAssetsFile=>`, response)
        if (response?.status && response?.statuscode === 200 && response?.data) {
            asset = {
                [key]: response?.data?.asset_url
            }
        }
    } catch (error) {
    }

    yield put(getAssetsResponse(asset))
    setTimeout(() => {
        store.dispatch(setLoading(false))
    }, 1000)
}

// CONTACT US FORM REQUEST
function* contactUsFormRequest(action) {
    yield put(setLoading(true));
    let { values, resetForm } = action?.payload;

    try {
        const response = yield call(callAPI, {
            url: '/support-email',
            method: 'POST',
            data: values,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            resetForm();
        toast("Thanks for reaching out to HelloAlfred.ai, We will get back to you soon!", {
            position: "top-right",
            type: `${response?.status && response?.statuscode === 200 ? "success" : "error"}`,
        });
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(setLoading(false));
}

// TO GET MOBILE VALIDATION L
function* getMobileValidationLengthByCountryCode(action) {
    let mobileFieldValidation = null;
    let reqObj = {
        country_code: action?.payload?.countryCode
    }
    try {
        const response = yield call(callAPI, {
            url: '/get-country-code',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("getMobileValidationLengthByCountryCode=>", response);
        if (response?.status && response?.statuscode === 200)
            mobileFieldValidation = response?.data?.max_len
        else
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(getMobileValidationLengthByCountryCodeResponse(mobileFieldValidation));
}

// TO SEND EMAIL WIT PDF 
function* sendPdfOnEmailRequest(action) {
    store.dispatch(setLoading(true));
    let reqObj = {
        email: action.payload
    }
    try {
        const response = yield call(callAPI, {
            url: '/send_tnc',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("sendEmailPdfRequest=>", { response, reqObj })

        if (response?.status && response?.statuscode === 200)
            toast(response?.message, {
                position: "top-right",
                type: "success",
            });
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false));
}

function* watchUtilityCallFunctionSaga() {
    yield takeLeading(getPatientDetailsRequest.type, getPatientDetails);
    yield takeLeading(getAssetsRequest.type, getAssetsFile);
    yield takeLeading(contactUsRequest.type, contactUsFormRequest)
    yield takeLeading(getMobileValidationLengthByCountryCodeRequest.type, getMobileValidationLengthByCountryCode)
    yield takeLeading(sendEmailPdfRequest.type, sendPdfOnEmailRequest)
}

export default watchUtilityCallFunctionSaga;