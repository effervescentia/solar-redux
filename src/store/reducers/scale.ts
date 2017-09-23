import Actions from '../actions';
import { State } from '..';

export const DEFAULTS = { relativity: 7, distance: 100, radius: 25, solar: 25 };

export type Action = Actions.SetRelativity
  | Actions.SetDistanceScale
  | Actions.SetRadiusScale
  | Actions.SetSolarScale;
export default (state: State.Scale = DEFAULTS, action: Action) => {
  switch (action.type) {
    case Actions.SET_RELATIVITY: return {
      ...state,
      relativity: action.payload,
    };
    case Actions.SET_DISTANCE_SCALE: return {
      ...state,
      distance: action.payload,
    };
    case Actions.SET_RADIUS_SCALE: return {
      ...state,
      radius: action.payload,
    };
    case Actions.SET_SOLAR_SCALE: return {
      ...state,
      solar: action.payload,
    };
    default: return state;
  }
};
