import { all } from 'redux-saga/effects';
import watchProfileSaga from './Profile/saga';
import watchHomePageSaga from './Home/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';
import watchRegisterUserSaga from './PatientRegisterFlow/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchProfileSaga(),
    watchHomePageSaga(),
    watchRegisterUserSaga()
  ]);
}

export default rootSaga;
