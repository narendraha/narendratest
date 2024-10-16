import moment from 'moment';
import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes } from '../../_mock/internalJsControl';
import { store } from '../store';
import { setActionTypeAndActionData, setLoading } from '../UtilityCallFunction/slice';
import {
    addOrUpdateAdminRequest,
    deleteAdminRequest,
    getAllAdminsListRequest,
    getAllAdminsListResponse
} from './slice';

// TO GET ADMINS LIST
function* getAllAdminsList() {
    store.dispatch(setLoading(true));
    let allAdminsList = []
    try {
        const response = yield call(callAPI, {
            url: '/superadmin/getalladmin',
            method: 'GET',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            allAdminsList = response?.data
        else
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
    } catch (error) {
        toast(error?.message || "Unable to reach server", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getAllAdminsListResponse(allAdminsList));
    store.dispatch(setLoading(false));
}

// TO ADD NEW ADMIN or UPDATE EXISTING ADMIN
function* addOrUpdateAdmin(action) {
    store.dispatch(setLoading(true));
    let { values, actionType, actionData } = action?.payload;
    let isAddCall = actionType === getActionTypes.ADD;

    let responseStatus = false;

    let url = isAddCall ? '/superadmin/createadmin' : '/superadmin/updateadmindetails';
    let method = isAddCall ? 'POST' : 'PUT'
    let reqObj = {
        name: values?.adminName || "",
        email: values?.email || "",
        mobile: values?.mobile || "",
        designation: values?.designation || "",
        expiry_date: moment(values?.accountExp).format("YYYY-MM-DD") || "",
        Unique_identification_code: values?.uniqueIDCode || "",
    }

    if (isAddCall) {
        reqObj.nationality = values?.country || "us"
        reqObj.super_admin_email = values?.superadminEmail || ""
    } else
        reqObj.user_id = actionData?.user_id;

    try {
        const response = yield call(callAPI, {
            url: url,
            method: method,
            data: reqObj,
            contentType: 'application/json',
        });
        let sucessResponse = response?.status && (response?.statuscode === 201 || response?.statuscode === 200)
        if (sucessResponse)
            responseStatus = true
        toast(response?.message, {
            position: "top-right",
            type: sucessResponse ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    if (responseStatus)
        store.dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }));
    store.dispatch(setLoading(false));
}

// TO DELETE ADMIN 
function* deleteAdmin(action) {
    store.dispatch(setLoading(true));
    let url = ('/superadmin/delete_admin_user/{user_id}')?.replace('{user_id}', action?.payload)

    try {
        const response = yield call(callAPI, {
            url: url,
            method: 'DELETE',
            data: null,
            contentType: 'application/json',
        });

        if (response?.status && response?.statuscode === 200)
            yield call(getAllAdminsList)
        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (error) {
        toast(error?.message || "Unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false));
}

function* watchAdminCreationSaga() {
    yield takeLeading(getAllAdminsListRequest.type, getAllAdminsList);
    yield takeLeading(addOrUpdateAdminRequest.type, addOrUpdateAdmin);
    yield takeLeading(deleteAdminRequest.type, deleteAdmin)

}

export default watchAdminCreationSaga;