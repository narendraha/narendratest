import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedPromptsList: [],
    searchKey: ""
};

const promptChangesSlice = createSlice({
    name: 'promptChangesSlice',
    initialState,
    reducers: {
        setResetPromptChangesPendingRequest: () => {
            return initialState
        },
        getAllPromptsRequest: () => { },
        getAllPromptsResponse: (state, action) => {
            state.savedPromptsList = action.payload
        },
        updatePromptContentRequest: () => { },
        deleteSavedPromptRequest: () => { },
        setPromptChangesSearchKey: (state, action) => {
            state.searchKey = action?.payload
        }
    },
});

export const {
    getAllPromptsRequest, getAllPromptsResponse,
    updatePromptContentRequest,
    deleteSavedPromptRequest,
    setPromptChangesSearchKey,
    setResetPromptChangesPendingRequest
} = promptChangesSlice.actions;

export default promptChangesSlice.reducer;
