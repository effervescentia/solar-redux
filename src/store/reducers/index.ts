import { combineReducers } from 'redux';
import Actions from '../actions';

export default combineReducers({
  running: (state: boolean = false, action: Actions.StartTime | Actions.StopTime) => {
    switch (action.type) {
      case Actions.START_TIME: return true;
      case Actions.STOP_TIME: return false;
      default: return state;
    }
  },
  tick: (state: number = 0, action: Actions.Tick) => {
    switch (action.type) {
      case Actions.TICK: return state + action.payload;
      default: return state;
    }
  }
});
