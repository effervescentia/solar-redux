import { h, Component } from 'preact';

class Timer extends Component<Timer.Props, any> {
  render({ time }: Timer.Props) {
    return <h1>{ time }</h1>;
  }
}

namespace Timer {
  export interface Props {
    time: number;
  }
}

export default Timer;
