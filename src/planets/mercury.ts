import Sun from './sun';
import Planet from './planet';

class Mercury extends Planet {
  get planet() { return 'mercury'; }
  get color() { return '#7a1414'; }
}

export default Mercury;
