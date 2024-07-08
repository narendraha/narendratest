import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes, getActivetab } from "../../_mock/internalJsControl";

const initialState = {
    actionType: getActionTypes.UNSELECT,
    isLoading: false,
    activeTab: getActivetab.HEALTHHUB,
    isNavRedirection: false,
    lastUpdatedHealthDetails: "",
    getVitalsForHealthDetailGraph: ""
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
        setActiveTabRequest: (state, action) => {
            state.isLoading = true
            state.isNavRedirection = action.payload?.isNavRedirection
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
        },
        getHealthDetailsLastUpdateRequest: (state) => {
            state.isLoading = true
        },
        getHealthDetailsLastUpdateResponse: (state, action) => {
            state.isLoading = false
            state.lastUpdatedHealthDetails = action?.payload
        },
        getHealthDetailsGraphRequest: (state) => {
            state.isLoading = true
        },
        getHealthDetailsGraphResponse: (state, action) => {
            state.isLoading = false
            state.getVitalsForHealthDetailGraph = action?.payload
        }
    }
});


export const {

    setActionTypeAndActionData,
    addSymptomsDetailRequest, addSymptomsDetailResponse,
    getSymptomsDetailsRequest, getSymptomsDetailsResponse,
    setActiveTabRequest, setActiveTabResponse,
    getActiveTabRequest, getActiveTabResponse,
    getHealthDetailsLastUpdateRequest, getHealthDetailsLastUpdateResponse,
    getHealthDetailsGraphRequest, getHealthDetailsGraphResponse

} = homePageSlice.actions;

export default homePageSlice.reducer;