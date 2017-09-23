// tslint:disable max-line-length
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { State } from '../store';
import { setRelativity, setDistanceScale, setRadiusScale, setSolarScale, setTailLength } from '../store/actions';
import { bindActions } from './utils';
import { DAY_IN_MILLIS, SCALE, SOLAR_SCALE, PLANET_SCALE, RADIUS_SCALE } from '../variables';

export const selector = ({ scale: { relativity, distance, radius, solar, tail } }: State) =>
  ({ relativity, distance, radius, solar, tail });
export const actions = {
  setRelativity: (e: any) => setRelativity(parseInt(e.target.value as string, undefined)),
  setDistanceScale: (e: any) => setDistanceScale(parseInt(e.target.value as string, undefined)),
  setRadiusScale: (e: any) => setRadiusScale(parseInt(e.target.value as string, undefined)),
  setSolarScale: (e: any) => setSolarScale(parseInt(e.target.value as string, undefined)),
  setTailLength: (e: any) => setTailLength(parseInt(e.target.value as string, undefined)),
};

@connect(selector, bindActions(actions))
class Scale extends Component<any, any> {

  render(props: Scale.Props) {
    return (
      <div id="scale">
        <p>Base Scale: 1:{SCALE}</p>
        <p>Sun Size Scale: 1:{SOLAR_SCALE}</p>
        <input type="range" min="1" max="50" onChange={props.setSolarScale} value={props.solar.toString()}></input>
        <p>Planet Size Scale: 1:{Math.round(RADIUS_SCALE)}</p>
        <input type="range" min="1" max="50" onChange={props.setRadiusScale} value={props.radius.toString()}></input>
        <p>Planet Distance Scale: 1:{PLANET_SCALE * props.distance}</p>
        <input type="range" min="1" max="500" onChange={props.setDistanceScale} value={props.distance.toString()}></input>
        <p>Relative Time Scale: 1:{DAY_IN_MILLIS * props.relativity}</p>
        <input type="range" min="1" max="500" onChange={props.setRelativity} value={props.relativity.toString()}></input>
        <p>Tail Length: {props.tail}°</p>
        <input type="range" min="1" max="360" onChange={props.setTailLength} value={props.tail.toString()}></input>
      </div>
    );
  }
}

namespace Scale {
  export interface Props {
    relativity: number;
    distance: number;
    radius: number;
    solar: number;
    tail: number;
    setRelativity: (e: any) => void;
    setDistanceScale: (e: any) => void;
    setRadiusScale: (e: any) => void;
    setSolarScale: (e: any) => void;
    setTailLength: (e: any) => void;
  }
}

export default Scale;
