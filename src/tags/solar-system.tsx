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
import Planet from '../planets/planet';
import { PLANETS } from '../store/reducers/planets';
import { DAY_IN_MILLIS, SCALE, SOLAR_SCALE, PLANET_SCALE, RADIUS_SCALE } from '../variables';
import PlanetControls from './planet-controls';

const PLANET_COLORS: { [key: string]: string } = {
  mercury: '#7a1414',
  venus: '#b4b04a',
  earth: '#61d6eb',
  mars: 'red',
  jupiter: '#4435f0',
  saturn: '#95a448',
  neptune: '#2d6690',
  uranus: '#1d7982',
};

export const selector = ({ tick: time, planets: { names: planets } }: State) => ({ time, planets });
export const actions = { startTime, stopTime };

@connect(selector, bindActions(actions))
class SolarSystem extends Component<any, any> {

  sun: Sun;
  planets: Planet[];
  startTime: number = new Date().getTime();
  model: SolarisModel = new SolarisModel();
  stage: Stage;

  render({ time, startTime, stopTime }: SolarSystem.Props) {
    return (
      <section id="galaxy">
        <div id="solar-system"></div>
        <div id="scale">
          <p>Base Scale: 1:{SCALE}</p>
          <p>Sun Size Scale: 1:{SOLAR_SCALE}</p>
          <p>Planet Size Scale: 1:{Math.round(RADIUS_SCALE)}</p>
          <p>Planet Distance Scale: 1:{PLANET_SCALE}</p>
        </div>
        <div id="planet-controls">
          {PLANETS.map(name => <PlanetControls name={name}/>)}
        </div>
        <div id="controls">
          <button onClick={startTime}>Start Time</button>
          <button onClick={stopTime}>Stop Time</button>
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
    this.sun = new Sun(x, y, this.model.bodies.sun.radius);
    this.planets = this.props.planets
      .map((name: string) => new Planet(this, name, PLANET_COLORS[name]));

    const layer = new Layer();
    layer.add(this.sun);

    this.stage.add(layer);
    this.planets.forEach(planet => this.stage.add(planet));
  }

  componentWillReceiveProps(props: any) {
    const newTime = this.startTime + props.time * DAY_IN_MILLIS * 7;
    const date = new Date(newTime);
    const dateString = dateFormat(date, 'yyyy-mm-dd');
    this.model.setTime(dateString);
    this.planets.forEach(planet => planet.updatePosition());
  }
}

namespace SolarSystem {
  export interface Props {
    time: number;
    planets: string[];
    startTime: () => void;
    stopTime: () => void;
  }
}

export default SolarSystem;
