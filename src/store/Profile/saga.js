import { toast } from 'react-toastify';
import { call, put, select, takeLeading, all } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import {
    getPatientDetailsRequest,
    getPatientDetailsResponse,
    profileDetailsAndProfileImageUpdateRequest,
    profileDetailsAndProfileImageUpdateResponse,
    changeProfilePasswordRequest,
    changeProfilePasswordResponse
} from './slice';

// TO GET PATIENT DETAILS
function* getPatientDetails(action) {
    let profileDetails = ""
    try {
        const response = yield call(callAPI, {
            url: '/userdetails',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status === true && response?.statuscode === 200)
            profileDetails = response?.data
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }

    yield put(getPatientDetailsResponse(profileDetails))
    if (action)
        return profileDetails
}

// TO UPDATE PROFILE DETAILS AND PROFILE IMAGE
function* updateProfileDetailsAndProfileImage(action) {
    let errorMessages = "";
    let profileDetails = "";
    let isUpdated = false;

    const uploadedProfileImageData = (yield select())['profileSlice']?.uploadedProfileImage?.formData || "";

    const reLoadWindow = () => {
        let isWinowLoaded = false
        window.location.reload()
        return isWinowLoaded = true
    }

    let reqObj = { ...action.payload };
    if (uploadedProfileImageData !== "")
        reqObj["profile_url"] = uploadedProfileImageData

    try {
        let uploadProfileImageRequest;
        let updateProfileDatialsRequest = yield call(callAPI, {
            url: '/update_details',
            method: 'PUT',
            data: reqObj,
            contentType: 'application/json',
        });

        if (uploadedProfileImageData !== "") {
            uploadProfileImageRequest = yield call(callAPI, {
                url: '/upload-profile-image',
                method: 'POST',
                data: uploadedProfileImageData,
                contentType: 'multipart/form-data',
            });
        }

        const [updateProfileDetailsResponse, uploadProfileImageResponse] = yield all([
            updateProfileDatialsRequest,
            uploadProfileImageRequest,
        ]);

        console.log("updateProfileDetailsAndProfileImage=>", { updateProfileDetailsResponse, uploadProfileImageResponse })

        let isProfileImageUpdate = !uploadProfileImageResponse ? true : reLoadWindow()?.isWinowLoaded;
        if (isProfileImageUpdate) {
            isUpdated = true
            if (!uploadProfileImageResponse || (uploadProfileImageResponse && uploadProfileImageResponse?.data && uploadProfileImageResponse?.status && uploadProfileImageResponse?.statuscode === 200)) {
                if (updateProfileDetailsResponse && updateProfileDetailsResponse?.status && updateProfileDetailsResponse.statuscode === 200) {
                    if (!uploadProfileImageResponse)
                        profileDetails = yield call(getPatientDetails, true)
                    toast(updateProfileDetailsResponse?.message, {
                        position: "top-right",
                        type: "success",
                    });
                } else {
                    errorMessages = updateProfileDetailsResponse?.message
                    toast(updateProfileDetailsResponse?.message, {
                        position: "top-right",
                        type: "success",
                    });
                }
            } else {
                errorMessages = uploadProfileImageResponse?.message
                toast(uploadProfileImageResponse?.message, {
                    position: "top-right",
                    type: "success",
                });
            }
        }
    } catch (error) {
        isUpdated = true
        errorMessages = error?.response?.data?.detail || error?.response?.data?.detail?.[0]?.message
        toast(errorMessages, {
            position: "top-right",
            type: "error",
        });
    }

    if (isUpdated)
        yield put(profileDetailsAndProfileImageUpdateResponse(profileDetails, errorMessages))
}

// TO CHANGE PROFILE PASSWORD
function* changeProfilePassword(action) {
    let error = ""
    try {
        let response = yield call(callAPI, {
            url: '/change-password',
            method: 'PUT',
            data: action.payload,
            contentType: 'application/json',
        });
        if (response && response.status && response?.statuscode === 200) {
            toast(response?.message, {
                position: "top-right",
                type: "success",
            });
        } else {
            error = response?.message
            // toast(response?.message, {
            //     position: "top-right",
            //     type: "error",
            // });
        }
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    yield put(changeProfilePasswordResponse(error))
}


function* watchProfileSaga() {
    yield takeLeading(changeProfilePasswordRequest.type, changeProfilePassword)
    yield takeLeading(profileDetailsAndProfileImageUpdateRequest.type, updateProfileDetailsAndProfileImage)
    yield takeLeading(getPatientDetailsRequest.type, getPatientDetails);
}

export default watchProfileSaga;
