import { all } from 'redux-saga/effects';
import watchHomeEducationalBotSaga from './EducationaChatBot/saga';
import watchHomePageSaga from './Home/saga';
import watchRegisterUserSaga from './PatientRegisterFlow/saga';
import watchProfileSaga from './Profile/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchProfileSaga(),
    watchHomePageSaga(),
    watchRegisterUserSaga(),
    watchHomeEducationalBotSaga()
  ]);
}

export default rootSaga;
