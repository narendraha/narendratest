import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes, getActivetab } from "../../_mock/internalJsControl";

const initialState = {
    actionType: getActionTypes.UNSELECT,
    isLoading: false,
    activeTab: getActivetab.HEALTHHUB,
    getCurrentTab: "",
}

const homePageSlice = createSlice({
    name: "homePageSlice",
    initialState,
    reducers: {
        setActionTypeAndActionData: (state, action) => {
            state.actionType = action.payload?.actionType;
            state.actionData = action.payload?.actionData

        },
        addSymptomsDetailRequest: (state) => {
            state.isLoading = true;
            state.actionType = getActionTypes.UNSELECT;
        },
        addSymptomsDetailResponse: (state) => {
            state.isLoading = false
        },
        setActiveTabRequest: (state) => {
            state.isLoading = true
        },
        setActiveTabResponse: (state, action) => {
            state.isLoading = false;
            state.activeTab = action.payload
        },
        getActiveTabRequest: (state) => {
            state.isLoading = true
        },
        getActiveTabResponse: (state, action) => {
            state.isLoading = false;
            state.activeTab = action.payload
        }
    }
});


export const {

    setActionTypeAndActionData,
    addSymptomsDetailRequest, addSymptomsDetailResponse,
    getSymptomsDetailsRequest, getSymptomsDetailsResponse,
    setActiveTabRequest, setActiveTabResponse,
    getActiveTabRequest, getActiveTabResponse

} = homePageSlice.actions;

export default homePageSlice.reducer;