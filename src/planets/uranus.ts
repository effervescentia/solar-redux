import Sun from './sun';
import Planet from './planet';

class Uranus extends Planet {
  get planet() { return 'uranus';}
  get color() { return '#1d7982';}
}

export default Uranus;
