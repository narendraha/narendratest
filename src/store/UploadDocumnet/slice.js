import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalUploadedDocuments: [],

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
    },
});

export const {
    getAllUploadedDocumentRequest, getAllUploadedDocumentResponse,
    uploadDocumentRequest, uploadDocumentResponse,
    deleteUploadedDocumentRequest,
    setResetUploadedDocumnetPendingRequests
} = uploadDocumentSlice.actions;

export default uploadDocumentSlice.reducer;
