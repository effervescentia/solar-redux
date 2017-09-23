import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as createValidatorMiddleware from 'redux-validator';
import reducers from './reducers';
import sagas from './sagas';

export interface State {
  running: boolean;
  tick: number;
  scale: State.Scale;
  planets: State.Planets;
}

export namespace State {
  export interface Planets {
    reversed: string[];
    stopped: string[];
    names: string[];
  }
  export interface Scale {
    relativity: number;
    distance: number;
    radius: number;
    solar: number;
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
