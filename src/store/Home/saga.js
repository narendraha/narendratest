import { addSymptomsDetailRequest } from "./slice";
import { call, put, select, takeLeading, all } from 'redux-saga/effects';
import { callAPI } from "../../_mock/internalJsControl";
import { toast } from "react-toastify";

function* addSymptomsData(action) {

    const reqObj = action.payload?.ListOfSymptomsCapturingData?.reduce((acc, symptom) => {
        acc[symptom.key] = {
            severity: symptom.serverity.toString(),
            frequency: symptom.frequency,
            quality_of_life: symptom.isAffectingLife
        };
        return acc;
    }, {})

    try {
        const response = yield call(callAPI, {
            url: '/add_symptoms',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        toast(response?.message, {
            position: "top-right",
            type: response?.status === true && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(addSymptomsDetailResponse)
}

function* watchHomePageSaga() {
    yield takeLeading(addSymptomsDetailRequest.type, addSymptomsData)
}

export default watchHomePageSaga;