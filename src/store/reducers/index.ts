import { combineReducers } from 'redux';
import Actions from '../actions';
import running from './running';
import tick from './tick';
import planets from './planets';

export default combineReducers({
  running,
  tick,
  planets
});
