// import { Layer, Circle, Text, Image as KonvaImage } from 'konva';
import Konva from 'konva';
import SolarSystem from '../tags/solar-system';

const pathToImages = require.context('../../img', true);

class Planet extends Konva.Layer {
  paths: Konva.Circle[] = [];
  image!: Konva.Image;
  title: Konva.Text;

  get body() {
    return this.system.model.bodies[this.planetName];
  }

  constructor(public system: SolarSystem, public planetName: string) {
    super();
    const { distanceScale, radiusScale, tailLength } = this.system.props;
    const { radius: rawRadius } = this.body;
    const radius = rawRadius / radiusScale!;
    const { x, y, sunX, sunY } = this.getPositions();

    // label
    this.add(
      (this.title = new Konva.Text({
        x: x - 50,
        y: y + radius + 5,
        text: this.planetName,
        width: 100,
        align: 'center',
        fill: 'white',
        shadowColor: 'black'
      }))
    );

    // tail
    this.body
      .getOrbitPath()
      .reverse()
      .filter(
        (_: [number, number, number], index: number) => index < tailLength!
      )
      .map(([pathX, pathY]: [number, number, number], index: number) =>
        Planet.createPath(
          sunX + pathX / distanceScale!,
          sunY + pathY / distanceScale!,
          tailLength! - index
        )
      )
      .forEach(path => {
        this.paths.push(path);
        this.add(path);
      });

    // body
    const image = new Image();
    image.onload = () => {
      this.image = new Konva.Image({
        image,
        x: x - radius,
        y: y - radius,
        width: radius * 2,
        height: radius * 2
      });
      this.add(this.image);
      this.draw();
    };
    image.src = pathToImages(`./${planetName}.png`);

    this.system.stage.add(this);
  }

  updatePosition() {
    const { radiusScale, dates } = this.system.props;
    const { [this.planetName]: date } = dates!;
    this.body.setTime(new Date(date));

    const { x, y, sunX, sunY } = this.getPositions();
    const radius = this.body.radius / radiusScale!;

    if (!this.isVisible()) {
      this.show();
    }

    this.clear();

    this.image.x(x - radius);
    this.image.y(y - radius);
    this.image.height(radius * 2);
    this.image.width(radius * 2);

    this.title.x(x - 50);
    this.title.y(y + radius + 5);

    this.redrawTail(sunX, sunY, this.body.getOrbitPath());

    this.draw();
  }

  redrawTail(sunX: number, sunY: number, path: [number, number, number][]) {
    const {
      distanceScale,
      tailLength,
      isSideView,
      reversed
    } = this.system.props;
    const { [this.planetName]: isReversed } = reversed!;

    if (tailLength! > this.paths.length) {
      const newPaths = Array(tailLength! - this.paths.length)
        .fill(0)
        .map((_, index) => Planet.createPath(0, 0, tailLength! + index));
      this.paths.push(...newPaths);
      newPaths.forEach(path => this.add(path));
    } else {
      this.paths.slice(tailLength).forEach(path => path.hide());
    }

    (isReversed ? path : path.reverse())
      .slice(0, tailLength)
      .forEach(([pathX, pathY, pathZ], index) => {
        const path = this.paths[index];
        if (!path.isVisible()) {
          path.show();
        }
        path.opacity((tailLength! - index) / 50);
        path.x(sunX + pathX / distanceScale!);
        path.y(sunY + (isSideView ? pathZ : pathY) / distanceScale!);
      });
  }

  getPositions() {
    const { distanceScale, isSideView, dates } = this.system.props;
    const { [this.planetName]: date } = dates!;
    const [offsetX, offsetY, offsetZ] = this.body.getPositionAtTime(date);
    const [sunX, sunY] = this.system.sun.getCenter();
    const [x, y] = [
      sunX + offsetX / distanceScale!,
      sunY + (isSideView ? offsetZ : offsetY) / distanceScale!
    ];

    return { x, y, sunX, sunY };
  }

  static createPath(x: number, y: number, opacity: number) {
    return new Konva.Circle({
      x,
      y,
      radius: 0.5,
      fill: 'white',
      opacity: opacity / 50
    });
  }
}

export default Planet;
