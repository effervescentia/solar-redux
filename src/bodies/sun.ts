import Konva from 'konva';
import SolarSystem from '../tags/solar-system';

class Sun extends Konva.Layer {
  orb: Konva.Circle;

  constructor(public system: SolarSystem) {
    super();
    this.orb = new Konva.Circle({
      radius: system.model.bodies.sun.radius / system.props.solarScale!,
      x: system.stage.width() / 2,
      y: system.stage.height() / 2,
      fill: 'yellow'
    });
    this.add(this.orb);
    this.system.stage.add(this);
  }

  updateRadius() {
    this.clear();
    this.orb.radius(
      this.system.model.bodies.sun.radius / this.system.props.solarScale!
    );
    this.draw();
  }

  getCenter() {
    return [this.orb.x(), this.orb.y()];
  }
}

export default Sun;
