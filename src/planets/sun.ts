import { Circle } from 'konva';
import { SOLAR_SCALE } from '../variables';

class Sun extends Circle {
  constructor(x: number, y: number, radius: number) {
    super({ x, y, radius: radius / SOLAR_SCALE, fill: 'yellow' });
  }

  setPosition([x, y]: [number, number]) {
    this.x(x);
    this.y(y);
  }
}

export default Sun;
