import { toast } from 'react-toastify';
import { put, call, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes } from '../../_mock/internalJsControl';
import { setConfirmationOpen, setLoading } from '../UtilityCallFunction/slice';
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
                    type: "img",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 1,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "txt",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 2,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 3,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 4,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 5,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 6,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 7,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 8,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "pdf",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
                },
                {
                    id: 9,
                    fileName: "boted",
                    updatedBy: "Purnima",
                    updatedOn: "06-11-2024",
                    size: "4mb",
                    type: "xml",
                    fileUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fworld%2F&psig=AOvVaw2hGX57WEp_oUyELGs9S9Fe&ust=1731043221031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiT_NS8yYkDFQAAAAAdAAAAABAE"
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

function* watchUploadDocumentSaga() {
    yield takeLeading(getAllUploadedDocumentRequest.type, getAllUploadedDocuments);
    yield takeLeading(deleteUploadedDocumentRequest.type, deleteUploadedDocument)
}

export default watchUploadDocumentSaga;
