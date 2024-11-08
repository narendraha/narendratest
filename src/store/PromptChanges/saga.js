import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes } from '../../_mock/internalJsControl';
import { setConfirmationOpen, setLoading } from '../UtilityCallFunction/slice';
import { store } from '../store';
import {
    deleteSavedPromptRequest,
    deleteUploadedDocumentRequest,
    getAllPromptsRequest,
    getAllPromptsResponse,
    updatePromptContentRequest,
} from './slice';


// TO GET ALL THE PROMPTS 
function* getAllPrompts() {
    store.dispatch(setLoading(true));
    let savedPromptsList = [];

    try {
        // const response = yield call(callAPI, {
        //     url: '',
        //     method: 'GET',
        //     data: null,
        //     contentType: 'application/json',
        // });
        let response = {
            status: true,
            statuscode: 200,
            data: []
        }
        if (response?.status && response?.statuscode === 200)
            savedPromptsList = response?.data || [];
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
    yield put(getAllPromptsResponse(savedPromptsList));
    store.dispatch(setLoading(false));
}

// TO UPDATE PROMPT CONTENT 
function* updatePromptContent() {
    store.dispatch(setLoading(true));

    try {
        const response = yield call(callAPI, {
            url: '',
            method: 'POST',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            store.dispatch(setConfirmationOpen({ actionType: getActionTypes.UNSELECT }))
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

// TO DELETE PROMPT BY ID 
function* deleteSavedPromptById() {
    store.dispatch(setLoading(true));

    try {
        const response = yield call(callAPI, {
            url: '',
            method: 'DELETE',
            data: null,
            contentType: 'application/json',
        });
        if (response?.status && response?.statuscode === 200)
            store.dispatch(setConfirmationOpen({ actionType: getActionTypes.UNSELECT }))
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

function* watchPromptChangesSaga() {
    yield takeLeading(getAllPromptsRequest.type, getAllPrompts);
    yield takeLeading(updatePromptContentRequest.type, updatePromptContent)
    yield takeLeading(deleteSavedPromptRequest.type, deleteSavedPromptById)
}

export default watchPromptChangesSaga;
