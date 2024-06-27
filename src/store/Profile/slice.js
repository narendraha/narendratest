import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    images: [],
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
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
    getPatientDetails,
    addProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest, profileDetailsAndProfileImageUpdateResponse,

} = profileSlice.actions;

export default profileSlice.reducer;
