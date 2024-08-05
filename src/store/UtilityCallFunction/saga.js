import { toast } from 'react-toastify';
import { call, put, take, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import store from '../store';
import {
    getAssetsRequest,
    getAssetsResponse,
    getPatientDetailsRequest,
    getPatientDetailsResponse,
    setLoading,
    contactUsRequest
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

function* watchUtilityCallFunctionSaga() {
    yield takeLeading(getPatientDetailsRequest.type, getPatientDetails);
    yield takeLeading(getAssetsRequest.type, getAssetsFile);
    yield takeLeading(contactUsRequest.type, contactUsFormRequest)
}

export default watchUtilityCallFunctionSaga;