import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from './utils';
// tslint:disable-next-line max-line-length
import Actions, { addPlanet, removePlanet, startPlanet, stopPlanet, reversePlanet } from '../store/actions';

const actions = {
  addPlanet,
  removePlanet,
  startPlanet,
  stopPlanet,
  reversePlanet
};

@connect(undefined, bindActions(actions))
class PlanetControl extends Component<{ name: string }, any> {
  render(props: PlanetControl.Props) {
    return (
      <div>
        <h4>{name}</h4>
        <button onClick={() => props.addPlanet(name)}>Add</button>
        <button onClick={() => props.removePlanet(name)}>Remove</button>
        <button onClick={() => props.startPlanet(name)}>Start</button>
        <button onClick={() => props.stopPlanet(name)}>Stop</button>
        <button onClick={() => props.reversePlanet(name)}>Reverse</button>
      </div>
    );
  }
}

namespace PlanetControl {
  export interface Props {
    name: string;
    addPlanet: (name: string) => void;
    removePlanet: (name: string) => void;
    startPlanet: (name: string) => void;
    stopPlanet: (name: string) => void;
    reversePlanet: (name: string) => void;
  }
}

export default PlanetControl;
