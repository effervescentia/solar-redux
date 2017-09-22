import Actions from '../actions';

export default (state: number = 7, action: Actions.SetRelativity) => {
  switch (action.type) {
    case Actions.SET_RELATIVITY: return action.payload;
    default: return state;
  }
};
