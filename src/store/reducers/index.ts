import { combineReducers } from 'redux';
import Actions from '../actions';
import running from './running';
import tick from './tick';
import planets from './planets';
import relativity from './relativity';
import distanceScale from './distance-scale';

export default combineReducers({
  running,
  tick,
  planets,
  relativity,
  distanceScale,
});
