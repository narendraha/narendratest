import { toast } from "react-toastify";
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI } from "../../_mock/helperIndex";
import { store } from '../store';
import { setLoading } from "../UtilityCallFunction/slice";
import {
    getBehaviouralBotChatResponse,
    getBehaviouralBotQuestionsRequest,
    getBehaviouralBotQuestionsResponse
} from "./slice";

const getRandomQuestion = (index) => {

};

// TO GET BEAVIOURAL BOT QUESTION
function* getBehaviouralBotQuestion() {
    store.dispatch(setLoading(true));

    const { currentQuestionIndex, ischatBotCompleted, chatHistory } = yield select(state => state.behaviouralChatBotSlice);

    let behaviouralBotQuestionSet = [],
        currentQuestion = "",
        updatedHistory = [];

    try {
        const response = yield call(callAPI, {
            url: '/chatbot_questions',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            behaviouralBotQuestionSet = response?.data

            if (behaviouralBotQuestionSet?.length > 0 && !ischatBotCompleted) {
                const questionSet = behaviouralBotQuestionSet[currentQuestionIndex];
                const randomIndex = Math.floor(Math.random() * questionSet?.length);
                currentQuestion = questionSet[randomIndex]
            }
            updatedHistory = [...chatHistory, { Alfred: currentQuestion, question: true }];
        } else {
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
        }
    } catch (error) {
        toast(error?.message, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getBehaviouralBotQuestionsResponse({ behaviouralBotQuestionSet, currentQuestion, updatedHistory }));
}

// TO GET BEHAVIOURAL BOT CHAT RESPONSE
function* getBehaviouralBotChat(payload, prevChatHistory) {
    let updatedHistory = [...prevChatHistory];

    let reqObj = {
        message: payload || ""
    }
    try {
        const response = yield call(callAPI, {
            url: 'https://api.stream.helloalfred.ai/educational_bot',
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
        });
        console.log("fetchInnerEducationalBotResponse=>", response)
        if (response?.status && response?.statuscode === 200) {
            updatedHistory = [...updatedHistory, { content: response?.data?.alfred, role: 'Alfred' }];
            store.dispatch((updatedHistory));
            yield put(getBehaviouralBotChatResponse(updatedHistory));
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
    yield put(getBehaviouralBotChatResponse(updatedHistory));
}

function* watchBehaviouralBotSaga() {
    yield takeLeading(getBehaviouralBotQuestionsRequest.type, getBehaviouralBotQuestion)
    // yield takeLeading(getBehaviouralBotChatRequest.type, getBehaviouralBotChat)
}

export default watchBehaviouralBotSaga;