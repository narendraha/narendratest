// src/features/imageSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { uploadProfileImageRequest, uploadProfileImageResponse } from './slice';
// import { uploadImage } from '../api/uploadImage';

function* addImageSaga(action) {
    try {
        console.log("actionaction", action)
        yield put(uploadProfileImageResponse(action?.payload));
    } catch (error) {
    }
}

function* watchAddImageSaga() {
    yield takeEvery(uploadProfileImageRequest.type, addImageSaga);
}

export default watchAddImageSaga;
