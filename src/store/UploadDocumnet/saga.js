import { toast } from 'react-toastify';
import { put, call, takeLeading } from 'redux-saga/effects';
import { callAPI } from '../../_mock/internalJsControl';
import { setLoading } from '../UtilityCallFunction/slice';
import { store } from '../store';
import {
    deleteUploadedDocumentRequest,
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
            data: [
                {
                    id: 0,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "txt"
                },
                {
                    id: 1,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "txt"
                },
                {
                    id: 2,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "txt"
                },
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

    console.log("totalUploadedDocuments", totalUploadedDocuments)
    yield put(getAllUploadedDocumentResponse(totalUploadedDocuments));
    store.dispatch(setLoading(false));
}

// TO DELETE UPLOADED FILE 
function* deleteUploadedDocument() {
    store.dispatch(setLoading(true));

    try {
        const response = yield call(callAPI, {
            url: '',
            method: 'DELETE',
            data: null,
            contentType: 'application/json',
        });

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

function* watchUploadDocumentSaga() {
    yield takeLeading(getAllUploadedDocumentRequest.type, getAllUploadedDocuments);
    yield takeLeading(deleteUploadedDocumentRequest.type, deleteUploadedDocument)
}

export default watchUploadDocumentSaga;
