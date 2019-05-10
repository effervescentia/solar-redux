import { h } from 'preact';
import { Provider } from 'preact-redux';
import createStore from './store';
import SolarSystem from './tags/solar-system';

const store = createStore();

// tslint:disable-next-line variable-name
const App = () => (
  <Provider store={store}>
    <div>
      <SolarSystem />
    </div>
  </Provider>
);

export default App;
