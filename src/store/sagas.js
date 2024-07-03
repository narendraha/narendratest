import { all } from 'redux-saga/effects';
import watchProfileSaga from './Profile/saga';
import watchHomePageSaga from './Home/saga';

function* rootSaga() {
  yield all([
    watchProfileSaga(),
    watchHomePageSaga()
  ]);
}

export default rootSaga;
