import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    uploadedProfileImage: "",
    isConfirmModel: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setResetProfileSliceData: () => {
            return initialState
        },
        addProfileImageRequest: (state, action) => {
            state.uploadedProfileImage = action.payload
        },
        profileDetailsAndProfileImageUpdateRequest: () => { },
        profileDetailsAndProfileImageUpdateResponse: (state, action) => {
            let { errorMessages } = action.payload;
            state.uploadedProfileImage = !errorMessages && ""
        },
        changeProfilePasswordRequest: () => { },
        changeProfilePasswordResponse: (state, action) => {
            state.error = action?.payload
        },
        deleteProfileImageRequest: () => { }
    },
});

export const {
    addProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest, profileDetailsAndProfileImageUpdateResponse,
    changeProfilePasswordRequest, changeProfilePasswordResponse,
    deleteProfileImageRequest,
    setResetProfileSliceData,

} = profileSlice.actions;

export default profileSlice.reducer;
