import { Layer, Circle, Text } from 'konva';
import Sun from './sun';
import { PLANET_SCALE, RADIUS_SCALE } from '../variables';
import SolarSystem from '../tags/solar-system';

class Planet extends Layer {
  orb: Circle;
  title: Text;
  radius: number;
  paths: Circle[] = [];

  get body() {
    return this.system.model.bodies[this.planetName];
  }

  constructor(public system: SolarSystem, public planetName: string, public color: string) {
    super();
    const body = this.body;
    const { radius: rawRadius, position: [offsetX, offsetY] } = body;
    const radius = this.radius = rawRadius / RADIUS_SCALE;
    const [sunX, sunY] = [this.system.sun.x(), this.system.sun.y()];
    const [x, y] = [sunX + offsetX / PLANET_SCALE, sunY + offsetY / PLANET_SCALE];
    this.add(this.title = new Text({
      x: x - 50,
      y: y + radius + 5,
      text: this.planetName,
      width: 100,
      align: 'center',
      fill: 'white'
    }));
    this.add(this.orb = new Circle({
      x, y, radius,
      fill: this.color
    }));
    body.getOrbitPath()
      .reverse()
      .filter((_: [number, number], index: number) => index < 100)
      .forEach(([pathX, pathY]: [number, number], index: number) => {
        const path = new Circle({
          x: sunX + pathX / PLANET_SCALE,
          y: sunY + pathY / PLANET_SCALE,
          radius: .5,
          fill: 'white',
          opacity: (100 - index) / 50
        });
        this.paths.push(path);
        this.add(path);
      });
  }

  updatePosition() {
    const { position: [offsetX, offsetY] } = this.body;
    const [sunX, sunY] = [this.system.sun.x(), this.system.sun.y()];
    const [x, y] = [sunX + offsetX / PLANET_SCALE, sunY + offsetY / PLANET_SCALE];
    this.clear();
    this.orb.x(x);
    this.orb.y(y);
    this.title.x(x - 50);
    this.title.y(y + this.radius + 5);
    this.drawPath(sunX, sunY, this.body.getOrbitPath());
    this.draw();
  }

  drawPath(sunX: number, sunY: number, path: [number, number][]) {
    path.reverse()
      .filter((_, index) => index < 100)
      .forEach(([pathX, pathY], index) => {
        const path = this.paths[index];
        path.x(sunX + pathX / PLANET_SCALE);
        path.y(sunY + pathY / PLANET_SCALE);
      });
  }
}

export default Planet;
