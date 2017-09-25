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
import * as selectors from '../store/selectors';
import Sun from '../bodies/sun';
import Planet from '../bodies/planet';
import { PLANETS } from '../store/reducers/planets';
import { DAY_IN_MILLIS, SOLAR_SCALE, PLANET_SCALE, RADIUS_SCALE } from '../variables';

export const selector = (state: State) =>
  ({
    planets: state.planets.allIds,
    isSideView: state.sideView,
    tailLength: state.scale.tail,
    date: selectors.coreDate(state),
    dates: selectors.planetDates(state),
    distanceScale: state.scale.distance * PLANET_SCALE,
    radiusScale: state.scale.radius * RADIUS_SCALE,
    solarScale: state.scale.solar * SOLAR_SCALE,
    reversed: state.planets.allIds.reduce((reversed, id) => Object.assign(reversed, { [id]: state.planets.byId[id].reverse }), {}),
  });

@connect(selector)
class SolarSystem extends Component<any, any> {

  sun: Sun;
  planets: { [key: string]: Planet };
  model: SolarisModel;
  stage: Stage;

  render(props: SolarSystem.Props) {
    return (
      <section id="galaxy">
        <div id="solar-system"></div>
        <Scale />
        <PlanetControls />
        <TimeControls />
      </section>
    );
  }

  componentDidMount() {
    this.model = new SolarisModel();
    this.stage = new Stage({
      container: 'solar-system',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.sun = new Sun(this);
    this.planets = this.props.planets
      .reduce((planets: { [key: string]: Planet }, name: string) => Object.assign(planets, { [name]: new Planet(this, name) }), {});
  }

  componentWillReceiveProps(props: SolarSystem.Props) {
    this.model.setTime(props.date);
    this.sun.updateRadius();

    if (this.props.planets.length < Object.keys(this.planets).length) {
      Object.keys(this.planets)
        .filter(key => !this.props.planets.includes(key))
        .forEach(key => this.planets[key].hide());
    }
    this.props.planets.forEach(key => this.planets[key].updatePosition());
  }
}

namespace SolarSystem {
  export interface Props {
    date: string;
    dates: { [planet: string]: string };
    reversed: { [planet: string]: boolean };
    tailLength: number;
    distanceScale: number;
    radiusScale: number;
    solarScale: number;
    planets: string[];
  }
}

export default SolarSystem;
