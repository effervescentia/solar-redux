import { delay, select, put, takeEvery } from 'redux-saga/effects';
import Actions, { tick } from '../actions';
import { isRunning, relativity } from '../selectors';

function* startTime() {
  yield delay(1000);
  while (yield select(isRunning)) {
    yield put(tick(yield select(relativity)));
    yield delay(10);
  }
}

export default function* timeSaga() {
  yield takeEvery(Actions.START_TIME, startTime);
}
