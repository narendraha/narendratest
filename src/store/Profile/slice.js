import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    images: [],
    loading: false,
    error: null,
    patientDetails: ""
};

const profileSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        getPatientDetailsRequest: (state) => {
            state.error = null;
        },
        getPatientDetailsResponse: (state, action) => {
            state.patientDetails = action.payload
        }
        // uploadProfileImageRequest: (state, action) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // uploadProfileImageResponse: (state, action) => {
        //     state.loading = false;
        //     state.images = action.payload;
        // },
    },
});

export const {
    getPatientDetailsRequest, getPatientDetailsResponse,
    addProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest, profileDetailsAndProfileImageUpdateResponse,

} = profileSlice.actions;

export default profileSlice.reducer;
