import Actions from '../actions';
import { State } from '..';

export const DEFAULTS = { relativity: 50, distance: 250, radius: 25, solar: 25, tail: 200 };

export type Action = Actions.SetRelativity
  | Actions.SetDistanceScale
  | Actions.SetRadiusScale
  | Actions.SetSolarScale
  | Actions.SetTailLength;
export default (state: State.Scale = DEFAULTS, action: Action): State.Scale => {
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
    case Actions.SET_TAIL_LENGTH: return {
      ...state,
      tail: action.payload,
    };
    default: return state;
  }
};
