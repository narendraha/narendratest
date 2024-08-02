import moment from "moment";
import { toast } from "react-toastify";
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI, getActivetab, getWeekoptions } from "../../_mock/internalJsControl";
import {
    addSymptomsDetailRequest,
    addSymptomsDetailResponse,
    getActiveTabRequest,
    getActiveTabResponse,
    getHealthDetailsGraphRequest,
    getHealthDetailsGraphResponse,
    getHealthDetailsLastUpdateRequest,
    getHealthDetailsLastUpdateResponse,
    getHealthHubProgressRequest,
    getHealthHubProgressResponse,
    getSymptomsDetailsLastUpdateRequest,
    getSymptomsDetailsLastUpdateResponse,
    getSymptomsDetailsRequest,
    getSymptomsDetailsResponse,
    getVitalDetailsLastUpdateRequest,
    getVitalDetailsLastUpdateResponse,
    getWeekWiseHealthHubContentRequest,
    getWeekWiseHealthHubContentResponse,
    setActiveTabRequest,
    setActiveTabResponse,
    updateHealthDetailsRequest,
    updateHealthDetailsResponse
} from "./slice";

import { setLoading } from "../UtilityCallFunction/slice";
import store from '../store';

// TO SET ACTIVE TAB
function* setHomeActiveTab(action) {
    store.dispatch(setLoading(true))
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
    store.dispatch(setLoading(false))
}

// TO ADD SYMPTOMS DATA
function* addSymptomsData(action) {

    store.dispatch(setLoading(true))
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
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(addSymptomsDetailResponse())
    store.dispatch(setLoading(false))
}


// To get active tab
function* getActiveTabData() {
    store.dispatch(setLoading(true))
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
    store.dispatch(setLoading(false))
}

// To get last updated health details
function* getLastUpdatedHealthDetails() {
    store.dispatch(setLoading(true))
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
    store.dispatch(setLoading(false))
}

// To get Health details graph

function* getHealthDetailsGraph(action) {
    store.dispatch(setLoading(true))
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
    store.dispatch(setLoading(false))
}

// TO UPDATE HEALTH DETAILS
function* updateHealtDetails(action) {
    store.dispatch(setLoading(true))
    let { tdate, weight, pulse, systolic, diastolic } = (action?.payload || "")
    const reqObj = {
        tdate: moment(tdate)?.format("YYYY-MM-DD"),
        weight: weight,
        pulse: pulse,
        bloodp: `${systolic}/${diastolic}`
    }

    try {
        const response = yield call(callAPI, {
            url: '/health_details',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("updateHealtDetails_response=>", response, reqObj)
        if (response?.status === true && response?.statuscode === 200)
            yield call(setHomeActiveTab, { setTab: getActivetab.EXPTMONITORING, nextOrBackTab: getActivetab.SYMPTOMSLIST })
        toast(response?.detail?.[0]?.message || response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(updateHealthDetailsResponse())
    store.dispatch(setLoading(false))
}

// To get symptoms data 

function* getSymptomsDetails() {
    store.dispatch(setLoading(true))
    let symptomsData = "";
    try {
        const response = yield call(callAPI, {
            url: '/get-latest-symptoms',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            symptomsData = response?.data
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
    yield put(getSymptomsDetailsResponse(symptomsData))
    store.dispatch(setLoading(false))
}

// to get last updated symptoms details 
function* getSymptomsDetailsLast() {
    store.dispatch(setLoading(true))
    let lastUpdatedSymptomsDetails = ""
    try {
        const response = yield call(callAPI, {
            url: '/latest-symptoms-record-date',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            lastUpdatedSymptomsDetails = response?.data
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
    yield put(getSymptomsDetailsLastUpdateResponse(lastUpdatedSymptomsDetails))
    store.dispatch(setLoading(false))
}

// TO GET HEALTH HUB PROGRESS
function* getHealthHubProgress() {
    let healthHubProgressDetails = "";
    try {
        const response = yield call(callAPI, {
            url: '/weekly-unlock',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        console.log("getHealthHubProgress_response=>", response)
        if (response?.status && response?.statuscode === 200)
            healthHubProgressDetails = response?.data
        else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }

    let getLastSelectedWeekIndex = (healthHubProgressDetails && Object.keys(healthHubProgressDetails)?.map((x) => healthHubProgressDetails[x] === true ? healthHubProgressDetails[x] : healthHubProgressDetails[x] === null ? 'skip' : '')?.filter((y) => y !== "")?.length);
    let selectedWeekOption = getWeekoptions[getLastSelectedWeekIndex - 1];
    yield call(getWeekWiseHealthContent, selectedWeekOption?.value)
    yield put(getHealthHubProgressResponse({ healthHubProgressDetails, selectedWeekOption }));
}

// TO GET WEEK WISE CONTENT ON HEALH HUB
function* getWeekWiseHealthContent(action) {
    let healthHubWeeklyContent = "";
    let data = action?.payload || action
    let reqParam = data[data?.length - 1]
    try {
        const response = yield call(callAPI, {
            url: ('/getweeklycontent/{week}')?.replace('{week}', reqParam),
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        console.log("getWeekWiseHealthContent_response=>", response)
        if (response?.status && response?.statuscode === 200)
            healthHubWeeklyContent = response?.data
        else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.response?.message, {
            position: "top-right",
            type: "error",
        });
    }

    yield put(getWeekWiseHealthHubContentResponse(healthHubWeeklyContent))
}

// to get last updated vitals details 
function* getVitalDetailsLastUpdate() {
    store.dispatch(setLoading(true))
    let lastUpdatedVitalDetails = ""
    try {
        const response = yield call(callAPI, {
            url: '/',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            lastUpdatedVitalDetails = response?.data
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
    yield put(getVitalDetailsLastUpdateResponse(lastUpdatedVitalDetails))
    store.dispatch(setLoading(false))
}

function* watchHomePageSaga() {
    yield takeLeading(getSymptomsDetailsLastUpdateRequest.type, getSymptomsDetailsLast);
    yield takeLeading(getSymptomsDetailsRequest.type, getSymptomsDetails);
    yield takeLeading(updateHealthDetailsRequest.type, updateHealtDetails);
    yield takeLeading(getHealthDetailsGraphRequest.type, getHealthDetailsGraph);
    yield takeLeading(getHealthDetailsLastUpdateRequest.type, getLastUpdatedHealthDetails);
    yield takeLeading(getActiveTabRequest.type, getActiveTabData);
    yield takeLeading(setActiveTabRequest.type, setHomeActiveTab);
    yield takeLeading(addSymptomsDetailRequest.type, addSymptomsData);
    yield takeLeading(getHealthHubProgressRequest.type, getHealthHubProgress);
    yield takeLeading(getWeekWiseHealthHubContentRequest.type, getWeekWiseHealthContent)
    yield takeLeading(getVitalDetailsLastUpdateRequest.type, getVitalDetailsLastUpdate)
}

export default watchHomePageSaga;