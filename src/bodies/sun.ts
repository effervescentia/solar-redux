import { Circle } from 'konva';
import { SOLAR_SCALE } from '../variables';
import SolarSystem from '../tags/solar-system';

  class Sun extends Circle {

  orb: Circle;

  constructor(public system: SolarSystem) {
    super({
      radius: system.model.bodies.sun.radius / system.props.solarScale,
      x: system.stage.getWidth() / 2,
      y: system.stage.getHeight() / 2, fill: 'yellow'
    });
  }

  updateRadius() {
    this.radius(this.system.model.bodies.sun.radius / this.system.props.solarScale);
  }
}

export default Sun;
