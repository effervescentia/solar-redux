import { Action as ReduxAction } from 'redux';
import { createAction as createFSA } from 'redux-actions';
import * as validators from './validators';
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

  export const ADD_PLANET = 'ADD_PLANET';
  export type AddPlanet = Action<typeof ADD_PLANET, string>;
  export const REMOVE_PLANET = 'REMOVE_PLANET';
  export type RemovePlanet = Action<typeof REMOVE_PLANET, string>;
  export const STOP_PLANET = 'STOP_PLANET';
  export type StopPlanet = Action<typeof STOP_PLANET, string>;
  export const START_PLANET = 'START_PLANET';
  export type StartPlanet = Action<typeof START_PLANET, string>;
  export const REVERSE_PLANET = 'REVERSE_PLANET';
  export type ReversePlanet = Action<typeof REVERSE_PLANET, string>;

  export const SET_RELATIVITY = 'SET_RELATIVITY';
  export type SetRelativity = Action<typeof SET_RELATIVITY, number>;
  export const SET_DISTANCE_SCALE = 'SET_DISTANCE_SCALE';
  export type SetDistanceScale = Action<typeof SET_DISTANCE_SCALE, number>;
  export const SET_RADIUS_SCALE = 'SET_RADIUS_SCALE';
  export type SetRadiusScale = Action<typeof SET_RADIUS_SCALE, number>;
  export const SET_SOLAR_SCALE = 'SET_SOLAR_SCALE';
  export type SetSolarScale = Action<typeof SET_SOLAR_SCALE, number>;

  // tslint:disable-next-line max-line-length
  export const createAction = (type: string, payloadCreator: (...args: any[]) => any = <any>null, validator: any = {}) =>
    createFSA(type, payloadCreator, () => ({ validator }));
}

export default Actions;

export const startTime = Actions.createAction(Actions.START_TIME, <any>null, {
  payload: validators.timeIsStopped,
});
export const stopTime = Actions.createAction(Actions.STOP_TIME, <any>null, {
  payload: validators.timeHasStarted,
});

export const addPlanet = Actions.createAction(Actions.ADD_PLANET, <any>null, {
  payload: validators.planetNonexistent,
});
export const removePlanet = Actions.createAction(Actions.REMOVE_PLANET, <any>null, {
  payload: validators.planetExists,
});
export const stopPlanet = Actions.createAction(Actions.STOP_PLANET, <any>null, {
  payload: validators.planetIsMoving,
});
export const startPlanet = Actions.createAction(Actions.START_PLANET, <any>null, {
  payload: validators.planetIsStopped,
});
export const reversePlanet = Actions.createAction(Actions.REVERSE_PLANET);

export const tick = Actions.createAction(Actions.TICK, (inc: number = 1) => inc);

export const setRelativity = Actions.createAction(Actions.SET_RELATIVITY);
export const setDistanceScale = Actions.createAction(Actions.SET_DISTANCE_SCALE);
export const setRadiusScale = Actions.createAction(Actions.SET_RADIUS_SCALE);
export const setSolarScale = Actions.createAction(Actions.SET_SOLAR_SCALE);
