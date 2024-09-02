import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatHistory: [],
    isInputDisable: false,
    isChatBotLoading: false,
    ischatBotCompleted: false,
    currentQuestionIndex: 0,
    behaviouralBotQuestionSet: [],
    currentQuestion: ""
}

const behaviouralChatBotSlice = createSlice({
    name: "behaviouralChatBotSlice",
    initialState,
    reducers: {
        setResetPendingBehaviouralBotRequest: (state, action) => {
            return {
                ...state,
                chatHistory: undefined,
                isInputDisable: false,
                isChatBotLoading: false
            }
        },
        setBehaviouralBotChatHistoryRequest: (state, action) => {
            state = {
                ...state,
                chatHistory: action.payload === null ? [] : state?.chatHistory?.length > 0 ? [
                    ...state?.chatHistory,
                    action.payload
                ] : [action.payload]
            }
            return state
        },
        getBehaviouralBotChatRequest: (state) => {
            state.isChatBotLoading = true
        },
        getBehaviouralBotChatResponse: (state, action) => {
            state.isChatBotLoading = false
            state.chatHistory = action?.payload
        },
        setBehaviouralBotInputDisableRequest: (state, action) => {
            state.isInputDisable = action.payload
        },
        getBehaviouralBotQuestionsRequest: () => { },
        getBehaviouralBotQuestionsResponse: (state, action) => {
            state.behaviouralBotQuestionSet = action?.payload?.behaviouralBotQuestionSet
            state.currentQuestion = action?.payload?.currentQuestion
            state.chatHistory = action?.payload?.updatedHistory
        }
    }
});

let { actions, reducer } = behaviouralChatBotSlice;

export const {
    setResetPendingBehaviouralBotRequest,
    setBehaviouralBotChatHistoryRequest,
    setBehaviouralBotInputDisableRequest,
    getBehaviouralBotQuestionsRequest, getBehaviouralBotQuestionsResponse,
    getBehaviouralBotChatRequest, getBehaviouralBotChatResponse
} = actions;

export default reducer