import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from './utils';
import { State } from '../store';
// tslint:disable-next-line max-line-length
import Actions, {
  addPlanet,
  removePlanet,
  startPlanet,
  stopPlanet,
  reversePlanet,
  followPlanet
} from '../store/actions';

export const selector = ({ planets: { allIds: planets } }: State) => ({
  planets
});
export const actions = {
  addPlanet,
  removePlanet,
  startPlanet,
  stopPlanet,
  reversePlanet,
  followPlanet
};

@connect(
  selector,
  bindActions(actions)
)
class PlanetControls extends Component<any, any> {
  selector!: HTMLSelectElement;

  render(props: PlanetControls.Props) {
    return (
      <div id="planet-controls">
        <select ref={selector => (this.selector = selector as any)}>
          {props.planets.map(planet => (
            <option value={planet}>{planet}</option>
          ))}
        </select>
        <button onClick={() => props.addPlanet(this.selector.value)}>
          Add
        </button>
        <button onClick={() => props.removePlanet(this.selector.value)}>
          Remove
        </button>
        <button onClick={() => props.startPlanet(this.selector.value)}>
          Start
        </button>
        <button onClick={() => props.stopPlanet(this.selector.value)}>
          Stop
        </button>
        <button onClick={() => props.reversePlanet(this.selector.value)}>
          Reverse
        </button>
        <button onClick={() => props.followPlanet(this.selector.value)}>
          Follow
        </button>
      </div>
    );
  }
}

namespace PlanetControls {
  export interface Props {
    planets: string[];
    addPlanet: (name: string) => void;
    removePlanet: (name: string) => void;
    startPlanet: (name: string) => void;
    stopPlanet: (name: string) => void;
    reversePlanet: (name: string) => void;
    followPlanet: (name: string) => void;
  }
}

export default PlanetControls;
