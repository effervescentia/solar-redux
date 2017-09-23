import { Layer, Circle, Text, Image as KonvaImage } from 'konva';
import Sun from './sun';
import SolarSystem from '../tags/solar-system';

const pathToImages = require.context('../../img', true);

class Planet extends Layer {

  image: KonvaImage;
  orb: Circle;
  title: Text;
  radius: number;
  paths: Circle[] = [];

  get body() {
    return this.system.model.bodies[this.planetName];
  }

  constructor(public system: SolarSystem, public planetName: string, public color: string) {
    super();
    const { distanceScale, radiusScale, tailLength } = this.system.props;
    const { radius: rawRadius } = this.body;
    const radius = this.radius = rawRadius / radiusScale;
    const { x, y, sunX, sunY } = this.getPositions();
    this.add(this.title = new Text({
      x: x - 50,
      y: y + radius + 5,
      text: this.planetName,
      width: 100,
      align: 'center',
      fill: 'white',
      shadowColor: 'black',
    }));
    this.body.getOrbitPath()
      .reverse()
      .filter((_: [number, number], index: number) => index < tailLength)
      .map(([pathX, pathY]: [number, number], index: number) => Planet.createPath(
        sunX + pathX / distanceScale,
        sunY + pathY / distanceScale,
        tailLength - index))
      .forEach((path) => {
        this.paths.push(path);
        this.add(path);
      });
    // this.add(this.orb = new Circle({
    //   x, y, radius,
    //   fill: this.color,
    // }));
    const image = new Image();
    image.onload = () => {
      this.image = new KonvaImage({
        image,
        x: x - radius,
        y: y - radius,
        width: radius * 2,
        height: radius * 2,
      });
      this.add(this.image);
      this.draw();
    };
    image.src = pathToImages(`./${planetName}.png`);

    this.system.stage.add(this);
  }

  updatePosition() {
    const { radiusScale } = this.system.props;
    const { x, y, sunX, sunY } = this.getPositions();
    this.clear();
    this.radius = this.body.radius / radiusScale;
    this.image.x(x - this.radius);
    this.image.y(y - this.radius);
    this.image.height(this.radius * 2);
    this.image.width(this.radius * 2);
    // this.orb.x(x);
    // this.orb.y(y);
    // this.orb.radius(this.radius = this.body.radius / radiusScale);
    this.title.x(x - 50);
    this.title.y(y + this.radius + 5);
    this.redrawTail(sunX, sunY, this.body.getOrbitPath());
    this.draw();
  }

  redrawTail(sunX: number, sunY: number, path: [number, number, number][]) {
    const { distanceScale, radiusScale, tailLength, isSideView } = this.system.props;
    const { radius: rawRadius } = this.body;

    if (tailLength > this.paths.length) {
      const newPaths = Array(tailLength - this.paths.length)
        .fill(0)
        .map((_, index) => Planet.createPath(0, 0, tailLength + index));
      this.paths.push(...newPaths);
      newPaths.forEach(path => this.add(path));
    } else {
      this.paths.slice(tailLength)
        .forEach(path => path.hide());
    }

    path.reverse()
      .slice(0, tailLength)
      .forEach(([pathX, pathY, pathZ], index) => {
        const path = this.paths[index];
        if (!path.isVisible()) {
          path.show();
        }
        path.opacity((tailLength - index) / 50);
        path.x(sunX + pathX / distanceScale);
        path.y(sunY + (isSideView ? pathZ : pathY) / distanceScale);
      });
  }

  getPositions() {
    const { distanceScale, isSideView } = this.system.props;
    const { position: [offsetX, offsetY, offsetZ] } = this.body;
    const [sunX, sunY] = this.system.sun.getCenter();
    const [x, y] = [
      sunX + offsetX / distanceScale,
      sunY + (isSideView ? offsetZ : offsetY) / distanceScale
    ];

    return { x, y, sunX, sunY };
  }

  static createPath(x: number, y: number, opacity: number) {
    return new Circle({
      x,
      y,
      radius: .5,
      fill: 'white',
      opacity: opacity / 50,
    });
  }
}

export default Planet;
