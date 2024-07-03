import { createSlice } from "@reduxjs/toolkit";
import { getActionTypes } from "../../_mock/internalJsControl";

const initialState = {
    actionType: getActionTypes.UNSELECT,
    isLoading: false
}

const homePageSlice = createSlice({
    name: "homePageSlice",
    initialState,
    reducers: {
        setActionTypeAndActionData: (state, action) => {
            state.actionType = action.payload
        },
        addSymptomsDetailRequest: (state, action) => {
            state.isLoading = true
        }
    }
});


export const {

    setActionTypeAndActionData,
    getPatientDetailsRequest, getPatientDetailsResponse,
    addSymptomsDetailRequest, addSymptomsDetailResponse,

} = homePageSlice.actions;

export default homePageSlice.reducer;