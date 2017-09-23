import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from './utils';
// tslint:disable-next-line max-line-length
import { State } from '../store';
import * as selectors from '../store/selectors';
import Actions, { startTime, stopTime } from '../store/actions';

export const selector = (state: State) => ({ date: selectors.date(state) });
export const actions = { startTime, stopTime };

@connect(selector, bindActions(actions))
class TimeControls extends Component<any, any> {
  render(props: TimeControls.Props) {
    return (
      <div id="time-controls">
        <button onClick={props.startTime}>Start Time</button>
        <button onClick={props.stopTime}>Stop Time</button>
        <h1>{props.date}</h1>
      </div>
    );
  }
}

namespace TimeControls {
  export interface Props {
    date: string;
    startTime: () => void;
    stopTime: () => void;
  }
}

export default TimeControls;
