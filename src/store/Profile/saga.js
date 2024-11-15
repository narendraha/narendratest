import { toast } from 'react-toastify';
import { all, call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes, loginRoles } from '../../_mock/internalJsControl';
import { getUsersDetailsRequest, setActionTypeAndActionData, setLoading } from '../UtilityCallFunction/slice';
import { store } from '../store';
import {
    changeProfilePasswordRequest,
    changeProfilePasswordResponse,
    deleteProfileImageRequest,
    profileDetailsAndProfileImageUpdateRequest,
    profileDetailsAndProfileImageUpdateResponse
} from './slice';

// To hard reload the web
const reLoadWindow = () => {
    let isWinowLoaded = false
    window.location.reload()
    return isWinowLoaded = true
}

// TO UPDATE PROFILE DETAILS AND PROFILE IMAGE
function* updateProfileDetailsAndProfileImage(action) {
    store.dispatch(setLoading(true))
    let errorMessages = "";
    let isUpdated = false;

    const uploadedProfileImageData = (yield select())['profileSlice']?.uploadedProfileImage?.formData || "";
    let { data, isAdmin } = action?.payload;
    let url = isAdmin ? '/updateadminaccount' : '/update_details';

    let reqObj = data ? { ...data } : action?.payload;
    if (uploadedProfileImageData !== "")
        reqObj["profile_url"] = uploadedProfileImageData

    try {
        let uploadProfileImageRequest;
        let updateProfileDatialsRequest = yield call(callAPI, {
            url: url,
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
                        store.dispatch(getUsersDetailsRequest())
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

    if (isUpdated) {
        yield put(profileDetailsAndProfileImageUpdateResponse(errorMessages))
        store.dispatch(setLoading(false))
        if (!errorMessages)
            store.dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }
}

// TO CHANGE PROFILE PASSWORD
function* changeProfilePassword(action) {
    store.dispatch(setLoading(true));
    const authUserRole = yield select(state => state?.sessionStoreSlice?.authUser);
    const isAdminUser = authUserRole?.role === loginRoles.ADMIN;

    let { currentPassword, newPassword } = action?.payload;

    let patientReqObj = {
        old_password: currentPassword,
        new_password: newPassword
    };

    let adminReqObj = {
        temporary_password: currentPassword,
        new_password: newPassword
    };

    let { url, reqObj } = isAdminUser ?
        { url: "/admin/change_admin_password", reqObj: adminReqObj } :
        { url: "/change-password", reqObj: patientReqObj };

    let errorMessages = "";
    try {
        let response = yield call(callAPI, {
            url: url,
            method: 'PUT',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response && response.status && response?.statuscode === 200) {
            toast(response?.message, {
                position: "top-right",
                type: "success",
            });
        } else {
            errorMessages = response?.message
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
    yield put(changeProfilePasswordResponse(errorMessages));
    store.dispatch(setLoading(false))
    if (!errorMessages) {
        store.dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }
}

// TO DELETE PROFILE IMAGE
function* deleteProfileImage() {
    store.dispatch(setLoading(true))
    let iswindwoLoaded = false;
    try {
        const response = yield call(callAPI, {
            url: '/delete-profile-image',
            method: 'POST',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            iswindwoLoaded = reLoadWindow()?.isWinowLoaded
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.response?.data?.detail, {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false))
}

function* watchProfileSaga() {
    yield takeLeading(changeProfilePasswordRequest.type, changeProfilePassword)
    yield takeLeading(profileDetailsAndProfileImageUpdateRequest.type, updateProfileDetailsAndProfileImage)
    yield takeLeading(deleteProfileImageRequest.type, deleteProfileImage)
}

export default watchProfileSaga;
