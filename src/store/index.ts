import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as createValidatorMiddleware from 'redux-validator';
import reducers from './reducers';
import sagas from './sagas';

export interface State {
  running: boolean;
  tick: number;
  startTime: number;
  sideView: boolean;
  target: string;
  scale: State.Scale;
  planets: State.Planets;
}

export namespace State {
  export interface Planets {
    allIds: string[];
    byId: { [id: string]: Planet };
  }
  export interface Planet {
    tick: number;
    reverse?: boolean;
    stop?: boolean;
    visible?: boolean;
  }
  export interface Scale {
    relativity: number;
    distance: number;
    radius: number;
    solar: number;
    tail: number;
  }
}

export default () => {
  const validatorMiddleware = createValidatorMiddleware();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, {}, applyMiddleware(validatorMiddleware, sagaMiddleware));

  // store.subscribe(() => console.log(store.getState()));

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
};
