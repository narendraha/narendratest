import { createSlice } from '@reduxjs/toolkit';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import maleuserImg from "../../images/userprofile.jpg";

const initialState = {
    getProfileDetails: "",
    profilePicture: "",
    isUtilityLoading: false
};

const utilityCallFunctionSlice = createSlice({
    name: 'utilityCallFunctionSlice',
    initialState,
    reducers: {
        getPatientDetailsRequest: (state) => {
            state.isUtilityLoading = true;
        },
        getPatientDetailsResponse: (state, action) => {
            state = {
                ...state,
                getProfileDetails: action.payload,
                profilePicture: ((action.payload?.profile_url === "NA") ? (action.payload.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : action.payload?.profile_url),
                isUtilityLoading: false
            }
            console.log("statestate", state)
            return state
        },
    },
});

export const {
    getPatientDetailsRequest, getPatientDetailsResponse,
} = utilityCallFunctionSlice.actions;

export default utilityCallFunctionSlice.reducer;
