import Actions from '../actions';

export default (state: number = 0, action: Actions.Tick) => {
  switch (action.type) {
    case Actions.TICK: return state + action.payload;
    default: return state;
  }
};
