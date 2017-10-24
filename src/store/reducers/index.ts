import { combineReducers } from 'redux';
import Actions from '../actions';
import running from './running';
import tick from './tick';
import planets from './planets';
import scale from './scale';

export default combineReducers({
  running,
  tick,
  planets,
  scale,
});
