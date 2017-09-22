import { Layer, Circle, Text } from 'konva';
import Sun from './sun';
import { PLANET_SCALE, RADIUS_SCALE } from '../variables';

export interface Body {
  radius: number;
  position: [number, number];
  getOrbitPath(): [number, number][];
}

abstract class Planet extends Layer {
  circle: Circle;
  paths: Circle[] = [];
  abstract get color(): string;
  abstract get planet(): string;

  constructor(public sun: Sun, body: Body) {
    super();
    const { radius: rawRadius, position: [offsetX, offsetY] } = body;
    const radius = rawRadius / RADIUS_SCALE;
    const [sunX, sunY] = [sun.x(), sun.y()];
    const [x, y] = [sunX + offsetX / PLANET_SCALE, sunY + offsetY / PLANET_SCALE];
    this.add(new Text({
      x: x - 50, y: y + radius + 5,
      text: this.planet,
      width: 100,
      align: 'center',
      fill: 'white'
    }));
    this.add(this.circle = new Circle({
      x, y, radius,
      fill: this.color
    }));
    body.getOrbitPath()
      .reverse()
      .filter((_, index) => index < 100)
      .forEach(([pathX, pathY], index) => {
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

  setPosition(body: Body) {
    const { position: [offsetX, offsetY] } = body;
    const [sunX, sunY] = [this.sun.x(), this.sun.y()];
    const [x, y] = [sunX + offsetX / PLANET_SCALE, sunY + offsetY / PLANET_SCALE];
    this.circle.x(x);
    this.circle.y(y);
    this.clear();
    this.circle.draw();
    this.drawPath(sunX, sunY, body.getOrbitPath());
  }

  drawPath(sunX: number, sunY: number, path: [number, number][]) {
    path.reverse()
      .filter((_, index) => index < 100)
      .forEach(([pathX, pathY], index) => {
        const path = this.paths[index];
        path.x(sunX + pathX / PLANET_SCALE);
        path.y(sunY + pathY / PLANET_SCALE);
        path.draw();
      });
  }
}

export default Planet;
