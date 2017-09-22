import Actions from '../actions';
import { State } from '..';

export type Action = Actions.AddPlanet |
  Actions.RemovePlanet |
  Actions.StopPlanet |
  Actions.StartPlanet |
  Actions.ReversePlanet;
export const PLANETS = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'neptune',
  'uranus',
];

// tslint:disable-next-line max-line-length
export default (state: State.Planets = { stopped: [], reversed: [], names: PLANETS }, action: Action) => {
  switch (action.type) {
    case Actions.ADD_PLANET: return { ...state, names: [...state.names, action.payload] };
    case Actions.REMOVE_PLANET: return {
      ...state,
      names: state.names.filter(planet => planet !== action.payload)
    };
    case Actions.STOP_PLANET: return {
      ...state,
      stopped: [...state.stopped, action.payload]
    };
    case Actions.START_PLANET: return {
      ...state,
      stopped: state.stopped.filter(planet => planet !== action.payload)
    };
    case Actions.REVERSE_PLANET: return {
      ...state,
      reversed: state.reversed.includes(action.payload)
        ? state.reversed.filter(name => name !== action.payload) 
        : [...state.reversed]
    }
    default: return state;
  }
};
