import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes } from "../../_mock/internalJsControl";

const initialState = {
    actionType: getActionTypes.UNSELECT,
    isLoading: false,
}

const homePageSlice = createSlice({
    name: "homePageSlice",
    initialState,
    reducers: {
        setActionTypeAndActionData: (state, action) => {
            state.actionType = action.payload?.actionType;
            state.actionData = action.payload?.actionData

        },
        addSymptomsDetailRequest: (state, action) => {
            state.isLoading = true;
            state.actionType = getActionTypes.UNSELECT;
        },
        addSymptomsDetailResponse: (state, action) => {
            state.isLoading = false
        },
    }
});


export const {

    setActionTypeAndActionData,
    getPatientDetailsRequest, getPatientDetailsResponse,
    addSymptomsDetailRequest, addSymptomsDetailResponse,
    getSymptomsDetailsRequest, getSymptomsDetailsResponse

} = homePageSlice.actions;

export default homePageSlice.reducer;