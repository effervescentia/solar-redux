import Sun from './sun';
import Planet from './planet';

class Venus extends Planet {
  get planet() {return 'venus';}
  get color() { return '#b4b04a';}
}

export default Venus;
