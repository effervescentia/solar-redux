import Sun from './sun';
import Planet from './planet';

class Jupiter extends Planet {
  get planet() { return 'jupiter'; }
  get color() { return '#4435f0'; }
}

export default Jupiter;
