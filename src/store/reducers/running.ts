import Actions from '../actions';

export default (state: boolean = false, action: Actions.StartTime | Actions.StopTime) => {
  switch (action.type) {
    case Actions.START_TIME: return true;
    case Actions.STOP_TIME: return false;
    default: return state;
  }
};
