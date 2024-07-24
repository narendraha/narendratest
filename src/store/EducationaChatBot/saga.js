import { toast } from "react-toastify";
import { call, select, takeLeading, put } from 'redux-saga/effects';
import { callAPI } from "../../_mock/helperIndex";
import { setLoading } from "../UtilityCallFunction/slice";
import store from '../store';
import { getChatStreamRequest, getChatStreamResponse, setInputDisableRequest, updateChatPreferenceRequest } from "./slice";
import { setChatBotLoadingIndex } from "../UtilityCallFunction/slice";

function* updateChatPreference(action) {
    try {

        const response = yield call(callAPI, {
            url: '/preference_chat',
            method: 'POST',
            data: action?.payload,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            toast(response?.message, {
                position: "top-right",
                type: "success",
            });
        }
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
}


export const fetchChatStream = async (payload, prevChatHistory, isLoading) => {
    let updatedHistory = [...prevChatHistory];

    let chatLoadingIndex = updatedHistory?.length;
    store.dispatch(setChatBotLoadingIndex(chatLoadingIndex))
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
        console.log("responseStream=>", responseStream);

        if (responseStream) {
            const reader = responseStream.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: true });

                console.log("chunk=>", chunk);
                const lastMessage = updatedHistory[updatedHistory.length - 1];

                // Create a new object to avoid mutating the state directly
                if (lastMessage && lastMessage.role === 'Alfred') {
                    updatedHistory = [
                        ...updatedHistory.slice(0, updatedHistory.length - 1),
                        { ...lastMessage, content: lastMessage.content + chunk }
                    ];
                } else {
                    updatedHistory = [...updatedHistory, { content: chunk, role: 'Alfred' }];
                }

                // Dispatch action to update chat history
                store.dispatch(getChatStreamResponse(updatedHistory));
            }
        }
    } catch (error) {
        console.error('Error streaming response:', error);
        throw error;
    }
};


// TO GET CHAT STREAM
function* getEducationalBotChatStream(action) {
    store.dispatch(setLoading(true))
    try {
        const prevChatHistory = yield select(state => state.educationalChatBotSlice?.chatHistory || []);
        const isLoading = yield select(state => state.utilityCallFunctionSlice?.isLoading);

        if (action?.payload) {
            yield call(fetchChatStream, action?.payload, prevChatHistory, isLoading);
        }
    } catch (error) {
        console.error('Error in getEducationalBotChatStream saga:', error);
        toast(error?.message, {
            position: "top-right",
            type: "error",
        });
    } finally {
        yield put(setInputDisableRequest(false))
        store.dispatch(setChatBotLoadingIndex(null))
    }
}



function* watchHomeEducationalBotSaga() {
    yield takeLeading(updateChatPreferenceRequest.type, updateChatPreference)
    yield takeLeading(getChatStreamRequest.type, getEducationalBotChatStream)
}

export default watchHomeEducationalBotSaga;