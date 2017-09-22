import { Action as ReduxAction } from 'redux';
import { createAction as createFSA } from 'redux-actions';
import { timeIsStopped, timeHasStarted } from './validators';
import { State } from '.';

export interface Action<T extends string, P = undefined> extends ReduxAction {
  type: T;
  payload: P;
}

namespace Actions {
  export const START_TIME = 'START_TIME';
  export type StartTime = Action<typeof START_TIME>;
  export const STOP_TIME = 'STOP_TIME';
  export type StopTime = Action<typeof STOP_TIME>;
  export const TICK = 'TICK';
  export type Tick = Action<typeof TICK, number>;

  // tslint:disable-next-line max-line-length
  export const createAction = (type: string, payloadCreator: (...args: any[]) => any = <any>null, validator: any = {}) =>
    createFSA(type, payloadCreator, () => ({ validator }))
}

export default Actions;

export const startTime = Actions.createAction(Actions.START_TIME, <any>null, {
  payload: timeIsStopped
});
export const stopTime = Actions.createAction(Actions.STOP_TIME, <any>null, {
  payload: timeHasStarted
});
export const tick = Actions.createAction(Actions.TICK, (inc: number = 1) => inc);
