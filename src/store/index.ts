import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as createValidatorMiddleware from 'redux-validator';
import reducers from './reducers';
import sagas from './sagas';

export interface State {
  running: boolean;
  tick: number;
  relativity: number;
  planets: State.Planets;
}

export namespace State {
  export interface Planets {
    reversed: string[];
    stopped: string[];
    names: string[];
  }
}

export default () => {
  const validatorMiddleware = createValidatorMiddleware();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, {}, applyMiddleware(validatorMiddleware, sagaMiddleware));

  store.subscribe(() => console.log(store.getState()));

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
};
