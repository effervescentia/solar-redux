import Sun from './sun';
import Planet from './planet';

class Neptune extends Planet {
  get planet() {return 'neptune';}
  get color() { return '#2d6690';}
}

export default Neptune;
