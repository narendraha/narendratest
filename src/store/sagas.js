import { all } from 'redux-saga/effects';
import watchAdminCreationSaga from './AdminCreation/saga';
import watchApproveUsersSaga from './ApproveUsers/saga';
import watchHomeEducationalBotSaga from './EducationaChatBot/saga';
import watchHomePageSaga from './Home/saga';
import watchProfileSaga from './Profile/saga';
import watchSessionStateSaga from './SessionStore/saga';
import watchUploadDocumentSaga from './UploadDocument/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchProfileSaga(),
    watchHomePageSaga(),
    watchHomeEducationalBotSaga(),
    watchSessionStateSaga(),
    watchAdminCreationSaga(),
    watchApproveUsersSaga(),
    watchUploadDocumentSaga()
  ]);
}

export default rootSaga;
