// tslint:disable max-line-length
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { State } from '../store';
import { setRelativity, setDistanceScale } from '../store/actions';
import { bindActions } from './utils';
import { DAY_IN_MILLIS, SCALE, SOLAR_SCALE, PLANET_SCALE, RADIUS_SCALE } from '../variables';

export const selector = ({ relativity, distanceScale }: State) => ({ relativity, distanceScale });
export const actions = {
  setRelativity: (e: any) => setRelativity(parseInt(e.target.value as string, undefined)),
  setDistanceScale: (e: any) => setDistanceScale(parseInt(e.target.value as string, undefined)),
};

@connect(selector, bindActions(actions))
class Scale extends Component<any, any> {

  render(props: Scale.Props) {
    return (
      <div id="scale">
        <p>Base Scale: 1:{SCALE}</p>
        <p>Sun Size Scale: 1:{SOLAR_SCALE}</p>
        <p>Planet Size Scale: 1:{Math.round(RADIUS_SCALE)}</p>
        <p>Planet Distance Scale: 1:{PLANET_SCALE * props.distanceScale}</p>
        <input type="range" min="1" max="500" onChange={props.setDistanceScale} value={props.distanceScale.toString()}></input>
        <p>Relative Time Scale: 1:{DAY_IN_MILLIS * props.relativity}</p>
        <input type="range" min="1" max="100" onChange={props.setRelativity} value={props.relativity.toString()}></input>
      </div>
    );
  }
}

namespace Scale {
  export interface Props {
    relativity: number;
    distanceScale: number;
    setRelativity: (e: any) => void;
    setDistanceScale: (e: any) => void;
  }
}

export default Scale;
