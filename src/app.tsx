import { h, Component } from 'preact';
import { Stage, Layer, Circle } from 'konva';
import { connect, Provider } from 'preact-redux';
import createStore, { State } from './store';
import { startTime, stopTime } from './store/actions';
import SolarSystem from './tags/solar-system';

const store = createStore();

// tslint:disable-next-line variable-name
const App = () => (
  <Provider store={store}>
    <SolarSystem />
  </Provider>
);

export default App;
