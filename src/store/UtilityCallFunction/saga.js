
import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import { getPatientDetailsRequest, getPatientDetailsResponse } from './slice';


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

function* watchUtilityCallFunctionSaga() {
    yield takeLeading(getPatientDetailsRequest.type, getPatientDetails);
}

export default watchUtilityCallFunctionSaga;