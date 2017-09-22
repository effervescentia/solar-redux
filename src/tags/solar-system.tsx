import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Stage, Layer, Circle } from 'konva';
import SolarisModel from 'solaris-model';
import * as dateFormat from 'dateformat';
import { State } from '../store';
import { startTime, stopTime } from '../store/actions';
import Timer from './timer';
import { bindActions } from './utils';
import Sun from '../planets/sun';
import Earth from '../planets/earth';
import Mars from '../planets/mars';
import Mercury from '../planets/mercury';
import Jupiter from '../planets/jupiter';
import Neptune from '../planets/neptune';
import Venus from '../planets/venus';
import Saturn from '../planets/saturn';
import Uranus from '../planets/uranus';
import { DAY_IN_MILLIS } from '../variables';

export const selector = ({ tick: time }: State) => ({ time });
export const actions = { startTime, stopTime };

@connect(selector, bindActions(actions))
class SolarSystem extends Component<any, any> {

  sun: Sun;
  earth: Earth;
  mercury: Mercury;
  venus: Venus;
  mars: Mars;
  jupiter: Jupiter;
  uranus: Uranus;
  neptune: Neptune;
  saturn: Saturn;
  startTime: number = new Date().getTime();
  system: SolarisModel = new SolarisModel();
  stage: Stage;

  render({ time }: any) {
    return (
      <section id="galaxy">
        <div id="solar-system"></div>
        <div id="controls">
          <button onClick={() => this.props.startTime()}>Start Time</button>
          <button onClick={() => this.props.stopTime()}>Stop Time</button>
          <Timer time={time} />
        </div>
      </section>
    );
  }

  componentDidMount() {
    this.stage = new Stage({
      container: 'solar-system',
      width: window.innerWidth,
      height: window.innerHeight
    });
    const [x, y] = [this.stage.getWidth() / 2, this.stage.getHeight() / 2];
    this.sun = new Sun(x, y, this.system.bodies.sun.radius);
    this.earth = new Earth(this.sun, this.system.bodies.earth);
    this.mercury = new Mercury(this.sun, this.system.bodies.mercury);
    this.jupiter = new Jupiter(this.sun, this.system.bodies.jupiter);
    this.mars = new Mars(this.sun, this.system.bodies.mars);
    this.neptune = new Neptune(this.sun, this.system.bodies.neptune);
    this.venus = new Venus(this.sun, this.system.bodies.venus);
    this.uranus = new Uranus(this.sun, this.system.bodies.uranus);
    this.saturn = new Saturn(this.sun, this.system.bodies.saturn);

    const layer = new Layer();
    layer.add(this.sun);

    this.stage.add(layer);
    this.stage.add(this.earth);
    this.stage.add(this.mercury);
    this.stage.add(this.jupiter);
    this.stage.add(this.mars);
    this.stage.add(this.neptune);
    this.stage.add(this.venus);
    this.stage.add(this.uranus);
    this.stage.add(this.saturn);
  }

  componentWillReceiveProps(props: any) {
    const newTime = this.startTime + props.time * DAY_IN_MILLIS * 7;
    const date = new Date(newTime);
    const dateString = dateFormat(date, 'yyyy-mm-dd');
    this.system.setTime(dateString);
    const rad = this.sun.radius();
    this.sun.radius(rad * props.time);
    this.earth.setPosition(this.system.bodies.earth);
    this.mercury.setPosition(this.system.bodies.mercury);
    this.venus.setPosition(this.system.bodies.venus);
    this.mars.setPosition(this.system.bodies.mars);
    this.jupiter.setPosition(this.system.bodies.jupiter);
    this.saturn.setPosition(this.system.bodies.saturn);
    this.neptune.setPosition(this.system.bodies.neptune);
    this.uranus.setPosition(this.system.bodies.uranus);
  }
}

namespace SolarSystem {
  export interface Props {
    time: number;
  }
}

export default SolarSystem;
