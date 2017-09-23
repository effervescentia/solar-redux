import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from './utils';
// tslint:disable-next-line max-line-length
import Actions, { addPlanet, removePlanet, startPlanet, stopPlanet, reversePlanet, followPlanet } from '../store/actions';

const actions = {
  addPlanet,
  removePlanet,
  startPlanet,
  stopPlanet,
  reversePlanet,
  followPlanet,
};

@connect(undefined, bindActions(actions))
class PlanetControls extends Component<{ name: string }, any> {
  render(props: PlanetControls.Props) {
    return (
      <div>
        <h4>{props.name}</h4>
        <button onClick={() => props.addPlanet(props.name)}>Add</button>
        <button onClick={() => props.removePlanet(props.name)}>Remove</button>
        <button onClick={() => props.startPlanet(props.name)}>Start</button>
        <button onClick={() => props.stopPlanet(props.name)}>Stop</button>
        <button onClick={() => props.reversePlanet(props.name)}>Reverse</button>
        <button onClick={() => props.followPlanet(props.name)}>Follow</button>
      </div>
    );
  }
}

namespace PlanetControls {
  export interface Props {
    name: string;
    addPlanet: (name: string) => void;
    removePlanet: (name: string) => void;
    startPlanet: (name: string) => void;
    stopPlanet: (name: string) => void;
    reversePlanet: (name: string) => void;
    followPlanet: (name: string) => void;
  }
}

export default PlanetControls;
