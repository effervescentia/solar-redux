import Sun from './sun';
import Planet from './planet';

class Saturn extends Planet {
  get planet() { return 'saturn'; }
  get color() { return '#95a448'; }
}

export default Saturn;
