import { Layer, Circle, Text } from 'konva';
import Sun from './sun';
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
    const { distanceScale, radiusScale } = this.system.props;
    const { radius: rawRadius, position: [offsetX, offsetY] } = body;
    const radius = this.radius = rawRadius / radiusScale;
    const [sunX, sunY] = [this.system.sun.x(), this.system.sun.y()];
    const [x, y] = [sunX + offsetX / distanceScale, sunY + offsetY / distanceScale];
    this.add(this.title = new Text({
      x: x - 50,
      y: y + radius + 5,
      text: this.planetName,
      width: 100,
      align: 'center',
      fill: 'white',
    }));
    this.add(this.orb = new Circle({
      x, y, radius,
      fill: this.color,
    }));
    body.getOrbitPath()
      .reverse()
      .filter((_: [number, number], index: number) => index < 200)
      .forEach(([pathX, pathY]: [number, number], index: number) => {
        const path = new Circle({
          x: sunX + pathX / distanceScale,
          y: sunY + pathY / distanceScale,
          radius: .5,
          fill: 'white',
          opacity: (200 - index) / 50,
        });
        this.paths.push(path);
        this.add(path);
      });
  }

  updatePosition() {
    const { distanceScale } = this.system.props;
    const { position: [offsetX, offsetY] } = this.body;
    const [sunX, sunY] = [this.system.sun.x(), this.system.sun.y()];
    const [x, y] = [sunX + offsetX / distanceScale, sunY + offsetY / distanceScale];
    this.clear();
    this.orb.x(x);
    this.orb.y(y);
    this.title.x(x - 50);
    this.title.y(y + this.radius + 5);
    this.drawPath(sunX, sunY, this.body.getOrbitPath());
    this.draw();
  }

  drawPath(sunX: number, sunY: number, path: [number, number][]) {
    const { distanceScale, radiusScale } = this.system.props;
    const { radius: rawRadius } = this.body;
    this.orb.radius(this.radius = rawRadius / radiusScale);
    path.reverse()
      .filter((_, index) => index < 200)
      .forEach(([pathX, pathY], index) => {
        const path = this.paths[index];
        path.x(sunX + pathX / distanceScale);
        path.y(sunY + pathY / distanceScale);
      });
  }
}

export default Planet;
