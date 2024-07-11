import { createSlice } from "@reduxjs/toolkit";
import { getActivetab } from "../../_mock/internalJsControl";

const initialState = {
    activeTab: getActivetab.HEALTHHUB,
    isNavRedirection: false,
    lastUpdatedHealthDetails: "",
    getVitalsForHealthDetailGraph: "",
    symptomsData: "",
    lastUpdatedSymptomsDetails: "",
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
            state.activeTab = action.payload
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
        getSymptomsDetailsLastUpdateRequest: (state, action) => {
            state.lastUpdatedSymptomsDetails = action?.payload
        },
        getSymptomsDetailsLastUpdateResponse: () => { }
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

} = actions;

export default reducer;
