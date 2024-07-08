import { createSlice } from '@reduxjs/toolkit';
import { getActionTypes } from '../../_mock/internalJsControl';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import maleuserImg from "../../images/userprofile.jpg";

const initialState = {
    isLoading: false,
    error: null,
    getProfileDetails: "",
    actionType: getActionTypes.UNSELECT,
    profilePicture: "",
    uploadedProfileImage: "",
    isConfirmModel: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setResetProfileState: (state, action) => {
            state = {
                ...state,
                isLoading: false,
                error: null,
                getProfileDetails: "",
                actionType: getActionTypes.UNSELECT,
                profilePicture: "",
                uploadedProfileImage: "",
                isConfirmModel: false
            }
            return state;
        },
        setActionTypeAndActionData: (state, action) => {
            state = {
                ...state,
                actionType: action?.payload?.actionType,
                // actionType: action?.payload?.actionType && action?.payload?.actionType,
                actionData: action?.payload?.actionData || "",
                isConfirmModel: action?.payload?.isConfirmModel,
                uploadedProfileImage: action?.payload?.actionType === getActionTypes.UNSELECT ? "" : state?.uploadedProfileImage
            }
            return state;
        },
        getPatientDetailsRequest: (state) => {
            state.isLoading = true;
        },
        getPatientDetailsResponse: (state, action) => {
            state = {
                ...state,
                getProfileDetails: action.payload,
                profilePicture: ((action.payload?.profile_url === "NA") ? (action.payload.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : action.payload?.profile_url),
                isLoading: false
            }
            return state
        },
        addProfileImageRequest: (state, action) => {
            state.uploadedProfileImage = action.payload
        },
        profileDetailsAndProfileImageUpdateRequest: (state, action) => {
            state.isConfirmModel = false
            state.isLoading = true
            state.actionData = action.payload
        },
        profileDetailsAndProfileImageUpdateResponse: (state, action) => {
            let { profileDetails, errorMessages } = action.payload;
            state = {
                ...state,
                isLoading: false,
                actionType: !errorMessages && getActionTypes.UNSELECT,
                uploadedProfileImage: !errorMessages && "",
                getProfileDetails: profileDetails || state?.getProfileDetails,
            }
            return state;
        },
        changeProfilePasswordRequest: (state, action) => {
            state.isLoading = true
        },
        changeProfilePasswordResponse: (state, action) => {
            state = {
                ...state,
                isLoading: false,
                actionType: action?.payload ? state.actionType : getActionTypes.UNSELECT,
                error: action?.payload
            }
            return state
        }
    },
});

export const {
    setResetProfileState,
    getPatientDetailsRequest, getPatientDetailsResponse,
    setActionTypeAndActionData,
    addProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest, profileDetailsAndProfileImageUpdateResponse,
    changeProfilePasswordRequest, changeProfilePasswordResponse

} = profileSlice.actions;

export default profileSlice.reducer;
