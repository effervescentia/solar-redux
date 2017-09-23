import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from './utils';
import Timer from './timer';
// tslint:disable-next-line max-line-length
import { State } from '../store';
import Actions, { startTime, stopTime } from '../store/actions';

export const selector = ({ tick: time }: State) => ({ time });
export const actions = { startTime, stopTime };

@connect(selector, bindActions(actions))
class TimeControls extends Component<any, any> {
  render(props: TimeControls.Props) {
    return (
      <div id="time-controls">
        <button onClick={props.startTime}>Start Time</button>
        <button onClick={props.stopTime}>Stop Time</button>
        <Timer time={props.time} />
      </div>
    );
  }
}

namespace TimeControls {
  export interface Props {
    time: number;
    startTime: () => void;
    stopTime: () => void;
  }
}

export default TimeControls;
