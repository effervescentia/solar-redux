import { Circle, Layer } from 'konva';
import { SOLAR_SCALE } from '../variables';
import SolarSystem from '../tags/solar-system';

class Sun extends Layer {

  orb: Circle;

  constructor(public system: SolarSystem) {
    super();
    this.orb = new Circle({
      radius: system.model.bodies.sun.radius / system.props.solarScale,
      x: system.stage.getWidth() / 2,
      y: system.stage.getHeight() / 2, fill: 'yellow'
    });
    this.add(this.orb);
    this.system.stage.add(this);
  }

  updateRadius() {
    this.clear();
    this.orb.radius(this.system.model.bodies.sun.radius / this.system.props.solarScale);
    this.draw();
  }

  getCenter() {
    return [this.orb.x(), this.orb.y()];
  }
}

export default Sun;
