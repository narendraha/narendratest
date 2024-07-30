import { toast } from "react-toastify";
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI } from "../../_mock/helperIndex";
import { setChatBotLoadingIndex } from "../UtilityCallFunction/slice";
import store from '../store';
import { getChatStreamRequest, getChatStreamResponse, setInputDisableRequest, updateChatPreferenceRequest } from "./slice";

function* updateChatPreference(action) {
    try {

        const response = yield call(callAPI, {
            url: '/preference_chat',
            method: 'POST',
            data: action?.payload,
            contentType: 'application/json',
        });
        if (!response?.status && response?.statuscode !== 200) {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        // toast(error?.response?.data?.detail, {
        //     position: "top-right",
        //     type: "error",
        // });
    }
}


export const fetchChatStream = async (payload, prevChatHistory) => {

    let updatedHistory = [...prevChatHistory];
    const data = {
        id: '1234-9876-54321',
        message: payload || "",
    };
    const apiUrl = 'http://192.168.7.214:3000/educational_bot';
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

function* fetchInnerEducationalBotResponse(payload, prevChatHistory) {
    let updatedHistory = [...prevChatHistory];

    let reqObj = {
        message: payload || ""
    }
    try {
        const response = yield call(callAPI, {
            url: '/educational_bot',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("fetchInnerEducationalBotResponse=>", response)
        if (response?.status && response?.statuscode === 200) {
            updatedHistory = [...updatedHistory, { content: response?.data, role: 'Alfred' }];
            store.dispatch(getChatStreamResponse(updatedHistory));
        } else if (response.statuscode === 500) {
            updatedHistory = [...updatedHistory, { content: "Sorry Unable to reach server at that moment can you please try again!", role: 'Alfred' }];
        } else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        console.error('Error streaming response:', error);
        throw error;
    }
    yield put(getChatStreamResponse(updatedHistory))
}


// TO GET CHAT STREAM
function* getEducationalBotChatStream(action) {
    let { inputValue, innerBot } = action?.payload;

    try {
        const prevChatHistory = yield select(state => state.educationalChatBotSlice?.chatHistory || []);
        let chatLoadingIndex = prevChatHistory?.length;
        store.dispatch(setChatBotLoadingIndex(chatLoadingIndex))

        if (inputValue && innerBot)
            yield call(fetchInnerEducationalBotResponse, inputValue, prevChatHistory)
        else
            yield call(fetchChatStream, inputValue, prevChatHistory);

    } catch (error) {
        console.error('Error in getEducationalBotChatStream saga:', error);
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