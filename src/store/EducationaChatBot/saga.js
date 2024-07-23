import { toast } from "react-toastify";
import { call, put, takeLeading } from 'redux-saga/effects';
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

    const botResponse = "";
    const streamingBotResponse = "";
    const apiUrl = 'http://192.168.7.214:3000/education-bot-home';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`
    };

    try {
        const responseStream = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(action)
        });

        if (responseStream) {
            const reader = responseStream.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let tempStr = '';
            let res = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: true });
                tempStr += chunk;
                // Split by newline and parse JSON objects
                const lines = tempStr.split('\n');
                for (let i = 0; i < lines.length - 1; i++) {
                    if (lines[i].trim()) {
                        const json = JSON.parse(lines[i]);
                        const content = json?.delta?.content || '';
                        res += content?.trim() + ' '
                        // setResponseStream(prev => prev + content);
                    }
                }
                // Keep the last line if it is incomplete
                tempStr = lines[lines.length - 1];
            }
            botResponse = { content: res, role: 'Alfred' }
            // setResponseStream('')
        }
    } catch (error) {
        console.error('Error streaming response:', error);
    } finally {
    }

    console.log("botResponsebotResponse", botResponse)
    return { botResponse, streamingBotResponse }
}

// TO GET CHAT STREAM
function* getEducationalBotChatStream(action) {
    store.dispatch(setLoading(true));
    if (action?.payload) {
        let { botResponse, streamingBotResponse } = yield call(fetchChatStream, action?.payload);
        if (botResponse) {
            yield put(setChatHistoryRequest(botResponse))
        }
    }
    store.dispatch(setLoading(false))
}

function* watchHomeEducationalBotSaga() {
    yield takeLeading(updateChatPreferenceRequest.type, updateChatPreference)
    yield takeLeading(getChatStreamRequest.type, getEducationalBotChatStream)
}

export default watchHomeEducationalBotSaga;