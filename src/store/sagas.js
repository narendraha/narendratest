import { all } from 'redux-saga/effects';
import watchAddImageSaga from './Profile/saga';

function* rootSaga() {
  yield all([
    watchAddImageSaga()
  ]);
}

export default rootSaga;
