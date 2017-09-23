import Actions from '../actions';

export default (state: number = 100, action: Actions.SetDistanceScale) => {
  switch (action.type) {
    case Actions.SET_DISTANCE_SCALE: return action.payload;
    default: return state;
  }
};
