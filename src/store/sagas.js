import { all } from 'redux-saga/effects';
import watchBehaviouralBotSaga from './BehaviouralChatBot/saga';
import watchHomeEducationalBotSaga from './EducationaChatBot/saga';
import watchHomePageSaga from './Home/saga';
import watchProfileSaga from './Profile/saga';
import watchSessionStateSaga from './SessionStore/saga';
import watchUtilityCallFunctionSaga from './UtilityCallFunction/saga';

function* rootSaga() {
  yield all([
    watchUtilityCallFunctionSaga(),
    watchProfileSaga(),
    watchHomePageSaga(),
    watchHomeEducationalBotSaga(),
    watchBehaviouralBotSaga(),
    watchSessionStateSaga()
  ]);
}

export default rootSaga;
