import { h, render } from 'preact';
import App from './app';
import '../styles/main.css';

render(<App />, document.querySelector('#app') as HTMLElement);
