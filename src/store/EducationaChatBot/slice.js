import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatHistory: [],
    isInputDisable: false,
    isChatBotLoading: false
}
const educationalChatBotSlice = createSlice({
    name: 'educationalChatBotSlice',
    initialState,
    reducers: {
        setResetPendingEducationalBotRequest: (state, action) => {
            return {
                ...state,
                chatHistory: undefined,
                isInputDisable: false,
                isChatBotLoading: false
            }
        },
        setChatHistoryRequest: (state, action) => {
            state = {
                ...state,
                chatHistory: action.payload === null ? [] : state?.chatHistory?.length > 0 ? [
                    ...state?.chatHistory,
                    action.payload
                ] : [action.payload]
            }
            return state
        },
        updateChatPreferenceRequest: () => { },
        updateChatPreferenceResponse: () => { },
        getChatStreamRequest: (state) => {
            state.isChatBotLoading = true
        },
        getChatStreamResponse: (state, action) => {
            state.isChatBotLoading = false
            state.chatHistory = action?.payload
        },
        setInputDisableRequest: (state, action) => {
            state.isInputDisable = action.payload
        },
        setChatFeedBackCommentRequest: () => { }
    }
});

const { actions, reducer } = educationalChatBotSlice;

export const {
    setResetPendingEducationalBotRequest,
    setChatHistoryRequest,
    setInputDisableRequest,
    updateChatPreferenceRequest, updateChatPreferenceResponse,
    getChatStreamRequest, getChatStreamResponse,
    setChatFeedBackCommentRequest
} = actions;

export default reducer;