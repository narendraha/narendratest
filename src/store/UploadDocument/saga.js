import { toast } from 'react-toastify';
import { call, put, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import { setLoading } from '../UtilityCallFunction/slice';
import { store } from '../store';
import {
    getAllUploadedDocumentRequest,
    getAllUploadedDocumentResponse
} from './slice';


// TO GET ALL THE UPLOADED DOCUMENTS 
function* getAllUploadedDocuments() {
    store.dispatch(setLoading(true));
    let totalUploadedDocuments = [];

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
            data:[
                {}
            ]
        }
        if (response?.status && response?.statuscode === 200)
            totalUploadedDocuments = response?.data || [];
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
    yield put(getAllUploadedDocumentResponse(totalUploadedDocuments))
    store.dispatch(setLoading(false))
}

function* watchUploadDocumentSaga() {
    yield takeLeading(getAllUploadedDocumentRequest.typs, getAllUploadedDocuments)
}

export default watchUploadDocumentSaga;
