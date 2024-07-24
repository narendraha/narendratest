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
        setChatHistoryRequest: (state, action) => {
            state = {
                ...state,
                chatHistory: [
                    ...state?.chatHistory,
                    action.payload
                ]
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
        }
    }
});

const { actions, reducer } = educationalChatBotSlice;

export const {
    setChatHistoryRequest,
    setInputDisableRequest,
    updateChatPreferenceRequest, updateChatPreferenceResponse,
    getChatStreamRequest, getChatStreamResponse
} = actions;

export default reducer;