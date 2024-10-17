import { toast } from 'react-toastify';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import { store } from '../store';
import { setLoading } from '../UtilityCallFunction/slice';
import {
    getUsersListWithStatusRequest,
    getUsersListWithStatusResponse,
    setRemarkOpenModel,
    setUserStatusRequest
} from './slice';

// TO GET ADMINS LIST
function* getUsersListWithStatus(action) {
    store.dispatch(setLoading(true));
    let usersListWithStatus = [];
    let status = action?.payload ? action?.payload : (action?.activeTab || 0);

    let url = ("/admin/get_users_with_state/{status}")?.replace("{status}", status);

    try {
        const response = yield call(callAPI, {
            url: url,
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        console.log("getUsersListWithStatus_response=>", response)
        if (response?.status && response?.statuscode === 200)
            usersListWithStatus = response?.data
        else
            toast(response?.message, {
                position: "top-right",
                type: !action?.activeTab && response?.status && response?.statuscode === 204 ? "success" : "error",
            });
    } catch (error) {
        toast(error?.message || "Unable to reach server", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getUsersListWithStatusResponse(usersListWithStatus));
    store.dispatch(setLoading(false));
}

// To set Users status
function* userStatusUpdate(action) {
    store.dispatch(setLoading(true));
    const activeTab = yield select(state => state.approveUsersSlice?.approveUsersActiveTab);

    let { patient_id, status, remark, setFieldValue } = action?.payload;

    let reqObj = {
        patient_id: patient_id,
        status: status,
        remark: remark || null
    }

    try {
        const response = yield call(callAPI, {
            url: "/admin/set_user_state",
            method: 'PUT',
            data: reqObj,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200) {
            yield call(getUsersListWithStatus, { activeTab })
            yield put(setRemarkOpenModel({ isRemakrOpen: false, status: null }))
            setFieldValue('isRearkEnter', false)
        }
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Unable to reach server", {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false));
}

function* watchApproveUsersSaga() {
    yield takeLeading(getUsersListWithStatusRequest.type, getUsersListWithStatus);
    yield takeLeading(setUserStatusRequest.type, userStatusUpdate);
}

export default watchApproveUsersSaga;