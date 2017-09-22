import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as createValidatorMiddleware from 'redux-validator';
import reducers from './reducers';
import sagas from './sagas';

export interface State {
  running: boolean;
  tick: number;
}

export default () => {
  const validatorMiddleware = createValidatorMiddleware();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, {}, applyMiddleware(validatorMiddleware, sagaMiddleware));

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
};
