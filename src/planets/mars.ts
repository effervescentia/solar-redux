import Sun from './sun';
import Planet from './planet';

class Mars extends Planet {
  get planet() {return 'mars';}
  get color() { return 'red';}
}

export default Mars;
