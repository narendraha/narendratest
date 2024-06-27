// src/features/imageSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
// import { uploadProfileImageRequest, uploadProfileImageResponse } from './slice';
// import { uploadImage } from '../api/uploadImage';

function* getPatientDetailsRequest(action) {
    try {
        // const profileDetails = async () => {
        //     await AxiosInstance("application/json")
        //         .get("/userdetails")
        //         .then((res) => {
        //             const responseData = res.data?.data;
        //             setGetProfileDetails(responseData);
        //         })
        //         .catch((er) => { });
        // };
        // yield put(uploadProfileImageResponse(action?.payload));
    } catch (error) {
    }
}

function* watchAddImageSaga() {
    yield takeEvery(getPatientDetailsRequest.type, getPatientDetailsRequest);
}

export default watchAddImageSaga;
