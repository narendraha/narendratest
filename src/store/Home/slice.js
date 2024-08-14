import { createSlice } from "@reduxjs/toolkit";
import { getActivetab } from "../../_mock/internalJsControl";

const initialState = {
    activeTab: getActivetab.HEALTHHUB,
    isNavRedirection: false,
    lastUpdatedHealthDetails: "",
    getVitalsForHealthDetailGraph: "",
    symptomsData: "",
    lastUpdatedSymptomsDetails: "",
    selectedHealthHubWeek: "",
    currentProgressWeek: "",
    healthHubWeeklyContent: "",
    lastUpdatedVitalDetails: ""
}

const homePageSlice = createSlice({
    name: "homePageSlice",
    initialState,
    reducers: {
        addSymptomsDetailRequest: () => { },
        addSymptomsDetailResponse: () => { },
        setActiveTabRequest: (state, action) => {
            state.isNavRedirection = action.payload?.isNavRedirection
        },
        setActiveTabResponse: (state, action) => {
            state.activeTab = action.payload
        },
        getActiveTabRequest: () => { },
        getActiveTabResponse: (state, action) => {
            state.activeTab = action.payload?.updatedActiveTab
            state.completedActiveHomeTab = action.payload?.completedActiveHomeTab
        },
        getHealthDetailsLastUpdateRequest: () => { },
        getHealthDetailsLastUpdateResponse: (state, action) => {
            state.lastUpdatedHealthDetails = action?.payload
        },
        getHealthDetailsGraphRequest: () => { },
        getHealthDetailsGraphResponse: (state, action) => {
            state.getVitalsForHealthDetailGraph = action?.payload
        },
        updateHealthDetailsRequest: () => { },
        updateHealthDetailsResponse: () => { },
        getSymptomsDetailsRequest: () => { },
        getSymptomsDetailsResponse: (state, action) => {
            state.symptomsData = action?.payload
        },
        getSymptomsDetailsLastUpdateRequest: () => { },
        getSymptomsDetailsLastUpdateResponse: (state, action) => {
            state.lastUpdatedSymptomsDetails = action?.payload
        },
        setSelectedHealthHubWeekValues: (state, action) => {
            state.selectedHealthHubWeek = action?.payload
        },
        getHealthHubProgressRequest: () => { },
        getHealthHubProgressResponse: (state, action) => {
            state.healthHubProgressDetails = action?.payload?.healthHubProgressDetails
            state.currentProgressWeek = action?.payload?.selectedWeekOption
            state.selectedHealthHubWeek = action?.payload?.selectedWeekOption
        },
        getWeekWiseHealthHubContentRequest: () => { },
        getWeekWiseHealthHubContentResponse: (state, action) => {
            state.healthHubWeeklyContent = action?.payload
        },
        getVitalDetailsLastUpdateRequest: () => { },
        getVitalDetailsLastUpdateResponse: (state, action) => {
            state.lastUpdatedVitalDetails = action?.payload
        },
        setHealthHubSkippedWeekRequest: () => { }
    }
});


export const { actions, reducer } = homePageSlice;
export const {

    addSymptomsDetailRequest, addSymptomsDetailResponse,
    getSymptomsDetailsRequest, getSymptomsDetailsResponse,
    setActiveTabRequest, setActiveTabResponse,
    getActiveTabRequest, getActiveTabResponse,
    getHealthDetailsLastUpdateRequest, getHealthDetailsLastUpdateResponse,
    updateHealthDetailsRequest, updateHealthDetailsResponse,
    getHealthDetailsGraphRequest, getHealthDetailsGraphResponse,
    getSymptomsDetailsLastUpdateRequest, getSymptomsDetailsLastUpdateResponse,
    setSelectedHealthHubWeekValues,
    getHealthHubProgressRequest, getHealthHubProgressResponse,
    getWeekWiseHealthHubContentRequest, getWeekWiseHealthHubContentResponse,
    getVitalDetailsLastUpdateRequest, getVitalDetailsLastUpdateResponse,
    setHealthHubSkippedWeekRequest

} = actions;

export default reducer;