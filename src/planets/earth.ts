import Sun from './sun';
import Planet, { Body } from './planet';

class Earth extends Planet {
  get planet() { return 'earth'; }
  get color() { return '#61d6eb'; }
}

export default Earth;
