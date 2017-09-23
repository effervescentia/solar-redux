import { Circle } from 'konva';
import { SOLAR_SCALE } from '../variables';

class Sun extends Circle {
  constructor(x: number, y: number, radius: number) {
    super({ x, y, radius, fill: 'yellow' });
  }
}

export default Sun;
