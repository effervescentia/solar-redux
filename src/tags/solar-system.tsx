// tslint:disable max-line-length
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Stage } from 'konva';
import SolarisModel from 'solaris-model';
import * as dateFormat from 'dateformat';
import Scale from './scale';
import TimeControls from './time-controls';
import PlanetControls from './planet-controls';
import { State } from '../store';
import Sun from '../bodies/sun';
import Planet from '../bodies/planet';
import { PLANETS } from '../store/reducers/planets';
import { DAY_IN_MILLIS, SOLAR_SCALE, PLANET_SCALE, RADIUS_SCALE } from '../variables';

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

export const selector = ({ startTime, tick, planets: { names: planets }, scale: { relativity, distance, radius, solar } }: State) =>
  ({
    planets,
    date: dateFormat(new Date(startTime + tick * DAY_IN_MILLIS * relativity), 'yyyy-mm-dd'),
    distanceScale: distance * PLANET_SCALE,
    radiusScale: radius * RADIUS_SCALE,
    solarScale: solar * SOLAR_SCALE,
  });

@connect(selector)
class SolarSystem extends Component<any, any> {

  sun: Sun;
  planets: { [key: string]: Planet };
  model: SolarisModel = new SolarisModel();
  stage: Stage;

  render(props: SolarSystem.Props) {
    return (
      <section id="galaxy">
        <div id="solar-system"></div>
        <Scale />
        <div id="planet-controls">
          {PLANETS.map(name => <PlanetControls name={name} />)}
        </div>
        <TimeControls />
      </section>
    );
  }

  componentDidMount() {
    this.stage = new Stage({
      container: 'solar-system',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.sun = new Sun(this);
    this.planets = this.props.planets
      .reduce((planets: { [key: string]: Planet }, name: string) => Object.assign(planets, { [name]: new Planet(this, name, PLANET_COLORS[name]) }), {});
  }

  componentWillReceiveProps(props: SolarSystem.Props) {
    this.model.setTime(props.date);
    this.sun.updateRadius();
    Object.keys(this.planets).forEach(key => this.planets[key].updatePosition());
  }
}

namespace SolarSystem {
  export interface Props {
    date: string;
    distanceScale: number;
    radiusScale: number;
    solarScale: number;
    planets: string[];
  }
}

export default SolarSystem;
