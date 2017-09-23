// tslint:disable max-line-length
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Stage, Layer } from 'konva';
import SolarisModel from 'solaris-model';
import * as dateFormat from 'dateformat';
import { State } from '../store';
import { startTime, stopTime } from '../store/actions';
import Timer from './timer';
import Scale from './scale';
import { bindActions } from './utils';
import Sun from '../bodies/sun';
import Planet from '../bodies/planet';
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

export const selector = ({ tick: time, planets: { names: planets }, scale: { relativity, distance, radius, solar } }: State) =>
  ({
    time, planets, relativity,
    distanceScale: distance * PLANET_SCALE,
    radiusScale: radius * RADIUS_SCALE,
    solarScale: solar * SOLAR_SCALE,
  });
export const actions = { startTime, stopTime };

@connect(selector, bindActions(actions))
class SolarSystem extends Component<any, any> {

  sun: Sun;
  planets: Planet[];
  startTime: number = new Date().getTime();
  model: SolarisModel = new SolarisModel();
  stage: Stage;
  layer: Layer;

  render(props: SolarSystem.Props) {
    return (
      <section id="galaxy">
        <div id="solar-system"></div>
        <Scale />
        <div id="planet-controls">
          {PLANETS.map(name => <PlanetControls name={name} />)}
        </div>
        <div id="controls">
          <button onClick={props.startTime}>Start Time</button>
          <button onClick={props.stopTime}>Stop Time</button>
          <Timer time={props.time} />
        </div>
      </section>
    );
  }

  componentDidMount() {
    this.stage = new Stage({
      container: 'solar-system',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const [x, y] = [this.stage.getWidth() / 2, this.stage.getHeight() / 2];
    this.sun = new Sun(this);
    this.planets = this.props.planets
      .map((name: string) => new Planet(this, name, PLANET_COLORS[name]));

    this.layer = new Layer();
    this.layer.add(this.sun);

    this.stage.add(this.layer);
    this.planets.forEach(planet => this.stage.add(planet));
  }

  componentWillReceiveProps(props: any) {
    const newTime = this.startTime + props.time * DAY_IN_MILLIS * this.props.relativity;
    const date = new Date(newTime);
    const dateString = dateFormat(date, 'yyyy-mm-dd');
    this.model.setTime(dateString);
    this.layer.clear();
    this.sun.updateRadius();
    this.layer.draw();
    this.planets.forEach(planet => planet.updatePosition());
  }
}

namespace SolarSystem {
  export interface Props {
    time: number;
    relativity: number;
    distanceScale: number;
    radiusScale: number;
    solarScale: number;
    planets: string[];
    startTime: () => void;
    stopTime: () => void;
  }
}

export default SolarSystem;
