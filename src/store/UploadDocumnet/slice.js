import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalUploadedDocuments: [],
    searchKey: ""
};

const uploadDocumentSlice = createSlice({
    name: 'uploadDocumentSlice',
    initialState,
    reducers: {
        setResetUploadedDocumnetPendingRequests: () => {
            return initialState
        },
        getAllUploadedDocumentRequest: () => { },
        getAllUploadedDocumentResponse: (state, action) => {
            state.totalUploadedDocuments = action.payload
        },
        uploadDocumentRequest: () => { },
        deleteUploadedDocumentRequest: () => { },
        setUploadDocumentSearchKey: (state, action) => {
            state.searchKey = action?.payload
        }
    },
});

export const {
    getAllUploadedDocumentRequest, getAllUploadedDocumentResponse,
    uploadDocumentRequest, uploadDocumentResponse,
    deleteUploadedDocumentRequest,
    setResetUploadedDocumnetPendingRequests,
    setUploadDocumentSearchKey
} = uploadDocumentSlice.actions;

export default uploadDocumentSlice.reducer;
