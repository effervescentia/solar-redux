import Actions from '../actions';
import { State } from '..';

export type Action = Actions.AddPlanet |
  Actions.RemovePlanet |
  Actions.StopPlanet |
  Actions.StartPlanet |
  Actions.ReversePlanet |
  Actions.Tick;
export const PLANETS = [
  'pluto',
  'uranus',
  'neptune',
  'saturn',
  'jupiter',
  'earth',
  'venus',
  'mars',
  'mercury',
];
export const DEFAULTS = {
  allIds: PLANETS,
  byId: PLANETS.reduce((byId, name) => Object.assign(byId, { [name]: { tick: 0 } }), {})
};

export default (state: State.Planets = DEFAULTS, action: Action): State.Planets => {
  switch (action.type) {
    case Actions.TICK: return {
      ...state,
      byId: state.allIds.reduce(
        (byId, id) => Object.assign(byId, {
          [id]: state.byId[id].stop
            ? state.byId[id]
            : {
              ...state.byId[id],
              tick: state.byId[id].tick + (state.byId[id].reverse
                ? -action.payload
                : action.payload),
            },
        }),
        {}),
    };
    case Actions.ADD_PLANET: return {
      ...state,
      allIds: [...state.allIds, action.payload],
      byId: { ...state.byId, [action.payload]: { tick: 0 } },
    };
    case Actions.REMOVE_PLANET:
      const allIds = state.allIds.filter(planet => planet !== action.payload);
      return {
        ...state,
        allIds,
        byId: allIds.reduce((byId, id) => Object.assign(byId, { [id]: state.byId[id] }), {}),
      };
    case Actions.STOP_PLANET: return {
      ...state,
      byId: {
        ...state.byId,
        [action.payload]: {
          ...state.byId[action.payload],
          stop: true,
        },
      },
    };
    case Actions.START_PLANET: return {
      ...state,
      byId: {
        ...state.byId,
        [action.payload]: {
          ...state.byId[action.payload],
          stop: false,
        },
      },
    };
    case Actions.REVERSE_PLANET: return {
      ...state,
      byId: {
        ...state.byId,
        [action.payload]: {
          ...state.byId[action.payload],
          reverse: !state.byId[action.payload].reverse,
        },
      },
    };
    default: return state;
  }
};
