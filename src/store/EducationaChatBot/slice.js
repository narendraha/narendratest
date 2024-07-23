import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatHistory: []
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
        getChatStreamRequest: () => { },
        getChatStreamResponse: () => { },
    }
});

const { actions, reducer } = educationalChatBotSlice;

export const {
    setChatHistoryRequest,
    updateChatPreferenceRequest, updateChatPreferenceResponse,
    getChatStreamRequest, getChatStreamResponse
} = actions;

export default reducer;