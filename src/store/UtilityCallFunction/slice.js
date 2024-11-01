import { createSlice } from '@reduxjs/toolkit';
import { getActionTypes } from '../../_mock/internalJsControl';
import femaleuserImg from "../../images/femaleuserImg.jpg";
import maleuserImg from "../../images/userprofile.jpg";

const initialState = {
    getProfileDetails: "",
    profilePicture: "",
    confirmationData: null,
    isLoading: false,
    actionData: "",
    actionType: getActionTypes.UNSELECT,
    assetUrl: "",
    chatBotLoadingIndex: null,
    mobileFieldValidation: "",
    isProfileImageEnableToDelete: false,
    haTutorialCmp: ""
};

const utilityCallFunctionSlice = createSlice({
    name: 'utilityCallFunctionSlice',
    initialState,
    reducers: {
        setResetUtilityActions: (state, action) => {
            return initialState
        },
        setActionTypeAndActionData: (state, action) => {
            state.actionType = action.payload?.actionType;
            state.actionData = action.payload?.actionData;
        },
        getUsersDetailsRequest: (state) => {
            state.isLoading = true;
        },
        getUsersDetailsResponse: (state, action) => {
            state = {
                ...state,
                getProfileDetails: action.payload,
                profilePicture: ((action.payload?.profile_url === "NA") ? (action.payload.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : action.payload?.profile_url) || maleuserImg,
                isLoading: false,
                isProfileImageEnableToDelete: action.payload?.profile_url !== "NA"
            }
            return state
        },
        setConfirmationOpen: (state, action) => {
            state.confirmationData = action.payload
        },
        setConfirmationClose: (state) => {
            state.confirmationData = null
        },
        setLoading: (state, action) => {
            state.isLoading = action?.payload
        },
        setChatBotLoadingIndex: (state, action) => {
            state.chatBotLoadingIndex = action?.payload
        },
        getAssetsRequest: () => { },
        getAssetsResponse: (state, action) => {
            state.assetUrl = action.payload
        },
        contactUsRequest: () => { },
        getMobileValidationLengthByCountryCodeRequest: () => { },
        getMobileValidationLengthByCountryCodeResponse: (state, action) => {
            state.mobileFieldValidation = action?.payload
        },
        sendEmailPdfRequest: () => { },
        setHATutorialComponent: (state, action) => {
            state.haTutorialCmp = action?.payload
        }
    },
});

const { actions, reducer } = utilityCallFunctionSlice;
export const {
    setLoading,
    setChatBotLoadingIndex,
    setActionTypeAndActionData,
    setConfirmationOpen, setConfirmationClose,
    getUsersDetailsRequest, getUsersDetailsResponse,
    getAssetsRequest, getAssetsResponse,
    contactUsRequest,
    getMobileValidationLengthByCountryCodeRequest, getMobileValidationLengthByCountryCodeResponse,
    sendEmailPdfRequest,
    setResetUtilityActions,
    setHATutorialComponent
} = actions;

export default reducer;