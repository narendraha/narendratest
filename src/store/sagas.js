import { all } from 'redux-saga/effects';
import watchAdminCreationSaga from './AdminCreation/saga';
import watchHomeEducationalBotSaga from './EducationaChatBot/saga';
import watchHomePageSaga from './Home/saga';
import watchProfileSaga from './Profile/saga';
import watchSessionStateSaga from './SessionStore/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';
import watchApproveUsersSaga from './ApproveUsers/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchProfileSaga(),
    watchHomePageSaga(),
    watchHomeEducationalBotSaga(),
    watchSessionStateSaga(),
    watchAdminCreationSaga(),
    watchApproveUsersSaga()
  ]);
}

export default rootSaga;
