import { toast } from "react-toastify";
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI, getActivetab } from "../../_mock/internalJsControl";
import {
    addSymptomsDetailRequest,
    addSymptomsDetailResponse,
    setActiveTabRequest,
    setActiveTabResponse
} from "./slice";

// TO SET ACTIVE TAB
function* setHomeActiveTab(action) {

    let { setTab, nextOrBackTab } = action?.payload || action
    let reqObj = {
        [setTab]: 1
    }
    try {
        const response = yield call(callAPI, {
            url: '/setstatus',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        // toast(response?.message, {
        //     position: "top-right",
        //     type: response?.status === true && response?.statuscode === 200 ? "success" : "error",
        // });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(setActiveTabResponse(nextOrBackTab))
}

// TO ADD SYMPTOMS DATA
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
        if (response?.status === true && response?.statuscode === 200)
            yield call(setHomeActiveTab, { setTab: getActivetab.SYMPTOMSLIST, nextOrBackTab: getActivetab.LIFEGOAL })
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
    yield put(addSymptomsDetailResponse())
}

function* watchHomePageSaga() {
    yield takeLeading(setActiveTabRequest.type, setHomeActiveTab)
    yield takeLeading(addSymptomsDetailRequest.type, addSymptomsData)
}

export default watchHomePageSaga;