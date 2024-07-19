import { toast } from "react-toastify";
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI } from "../../_mock/internalJsControl";
import {
    getChatHistoryRequest,
    updateChatPreferenceRequest,
} from "./slice";

import { setLoading } from "../UtilityCallFunction/slice";
import store from '../store';

// GET HISTORY CHAT 
function* getChatHistoryDetails(action) {
    store.dispatch(setLoading(true))
    store.dispatch(setLoading(false))
}

function* updateChatPreference(action) {
    try {
        let reqObj = {
            message: action.payload,
            preference: iconType === "like"
        }
        const response = yield call(callAPI, {
            url: '/preference_chat',
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

function* watchHomePageSaga() {
    yield takeLeading(updateChatPreferenceRequest.type, updateChatPreference)
    yield takeLeading(getChatHistoryRequest.type, getChatHistoryDetails)
}

export default watchHomePageSaga;