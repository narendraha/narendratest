import { toast } from "react-toastify";
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI, getActivetab } from "../../_mock/internalJsControl";
import {
    addSymptomsDetailRequest,
    addSymptomsDetailResponse,
    getActiveTabRequest,
    getActiveTabResponse,
    getHealthDetailsGraphRequest,
    getHealthDetailsGraphResponse,
    getHealthDetailsLastUpdateRequest,
    getHealthDetailsLastUpdateResponse,
    setActiveTabRequest,
    setActiveTabResponse
} from "./slice";

// TO SET ACTIVE TAB
function* setHomeActiveTab(action) {
    let { setTab, nextOrBackTab } = action?.payload || action;

    if (setTab) {
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
            if (!response?.status && response?.status !== 200) {
                toast(response?.message, {
                    position: "top-right",
                    type: "error",
                });
            }
        } catch (error) {
            toast(error?.response?.data?.detail, {
                position: "top-right",
                type: "error",
            });
        }
    }
    yield put(setActiveTabResponse(nextOrBackTab));
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


// To get active tab
function* getActiveTabData() {

    let activeTab = [];
    try {
        const response = yield call(callAPI, {
            url: '/getstatus',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        console.log("getActiveTabDataResponse=>", response)
        if (response?.status && response?.statuscode === 200) {
            let tabStack = response?.data;
            const tabStackData = {
                "health_hub": tabStack?.health_hub,
                "expert_monitoring": tabStack?.expert_monitoring,
                "list_your_symptoms": tabStack?.list_your_symptoms,
                "lifestyle_goals": tabStack?.lifestyle_goals,
                "optimal_risk_managemment": tabStack?.optimal_risk_managemment
            }
            Object?.keys(tabStackData)?.map((key, index) => tabStackData[key] === 0 ? activeTab?.push(key) : "")
        } else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }

    let updatedActiveTab = activeTab?.length === 0 ? getActivetab.HEALTHHUB : activeTab?.[0];
    yield put(getActiveTabResponse(updatedActiveTab))
}

// To get last updated health details
function* getLastUpdatedHealthDetails() {
    let lastUpdatedHealthDetails = "";
    try {
        const response = yield call(callAPI, {
            url: '/healthdetails_lastupdate',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            lastUpdatedHealthDetails = response?.data
        else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getHealthDetailsLastUpdateResponse(lastUpdatedHealthDetails))
}

// To get Health details graph

function* getHealthDetailsGraph(action) {
    let getVitalsForHealthDetailGraph = ""
    try {
        const response = yield call(callAPI, {
            url: '/health_details_graph',
            method: 'POST',
            data: action?.payload || {},
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            getVitalsForHealthDetailGraph = response?.data
        else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getHealthDetailsGraphResponse(getVitalsForHealthDetailGraph));
}

function* watchHomePageSaga() {
    yield takeLeading(getHealthDetailsGraphRequest.type, getHealthDetailsGraph)
    yield takeLeading(getHealthDetailsLastUpdateRequest.type, getLastUpdatedHealthDetails)
    yield takeLeading(getActiveTabRequest.type, getActiveTabData)
    yield takeLeading(setActiveTabRequest.type, setHomeActiveTab)
    yield takeLeading(addSymptomsDetailRequest.type, addSymptomsData)
}

export default watchHomePageSaga;