import Actions from '../actions';

export default (state: number = 0, action: Actions.Tick): number => {
  switch (action.type) {
    case Actions.TICK: return state + action.payload;
    default: return state;
  }
};
