import { toast } from "react-toastify";
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI } from "../../_mock/helperIndex";
import {
    getChatStreamRequest,
    setChatHistoryRequest,
    updateChatPreferenceRequest
} from "./slice";

import { setLoading } from "../UtilityCallFunction/slice";
import store from '../store';

function* updateChatPreference(action) {
    try {
        let reqObj = {
            message: action.payload,
            // preference: iconType === "like"
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

const fetchChatStream = async (action) => {
    let { payload, prevChatHistory } = action;

    const updatedChatHistory = [];

    const data = {
        id: '1234-9876-54321',
        message: payload || "",
    };
    const apiUrl = 'http://4.246.143.7:3001/education_bot_home';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const responseStream = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        console.log("responseStream=>", responseStream)

        if (responseStream) {
            const reader = responseStream.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let tempStr = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: true });

                console.log("chunk=>", chunk)
                tempStr += chunk;

                updatedChatHistory = [...prevChatHistory];
                const lastMessage = updatedChatHistory[updatedChatHistory.length - 1];
                // Check if the last message is from 'Alfred' and update it
                if (lastMessage && lastMessage.role === 'Alfred') {
                    updatedChatHistory[updatedChatHistory.length - 1].content += chunk;
                } else {
                    updatedChatHistory.push({ content: chunk, role: 'Alfred' });
                }
                return updatedChatHistory
            }
        }
    } catch (error) {
        console.error('Error streaming response:', error);
    } finally {
    }
}

// TO GET CHAT STREAM
function* getEducationalBotChatStream(action) {
    store.dispatch(setLoading(true));
    const prevChatHistory = (yield select())['educationalChatBotSlice']?.chatHistory || "";

    if (action?.payload) {
        let { updatedChatHistory } = yield call(fetchChatStream, { payload: action?.payload, prevChatHistory: prevChatHistory });
        if (updatedChatHistory) {
            yield put(setChatHistoryRequest(updatedChatHistory))
        }
    }
    store.dispatch(setLoading(false))
}

function* watchHomeEducationalBotSaga() {
    yield takeLeading(updateChatPreferenceRequest.type, updateChatPreference)
    yield takeLeading(getChatStreamRequest.type, getEducationalBotChatStream)
}

export default watchHomeEducationalBotSaga;