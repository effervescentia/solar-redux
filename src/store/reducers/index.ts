import { combineReducers } from 'redux';
import running from './running';
import tick from './tick';
import planets from './planets';
import scale from './scale';
import sideView from './side-view';
import target from './target';

export default combineReducers({
  running,
  tick,
  planets,
  scale,
  target,
  sideView,
  startTime: (state = new Date().getTime()) => state
});
