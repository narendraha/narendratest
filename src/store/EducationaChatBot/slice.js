import React from "react";

const initialState = {
    chatHistory: []
}
const educationalChatBotSlice = createSlice({
    getChatHistoryRequest: () => { },
    getChatHistoryResponse: () => { },
    updateChatPreferenceRequest: () => { },
    updateChatPreferenceResponse: () => { }
});


const { actions, reducer } = educationalChatBotSlice;

export const {
    getChatHistoryRequest, getChatHistoryResponse,
    updateChatPreferenceRequest, updateChatPreferenceResponse
} = actions;

export default reducer;