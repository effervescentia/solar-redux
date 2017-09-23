import * as dateFormat from 'dateformat';
import { State } from '.'
import { DAY_IN_MILLIS } from '../variables';

export const isRunning = ({ running }: State) => running;

export const date = ({ startTime, tick }: State) =>
  dateFormat(new Date(startTime + tick * DAY_IN_MILLIS), 'yyyy-mm-dd');

export const relativity = ({ scale: { relativity } }: State) => relativity;

export const targetPlanet = ({ target }: State) => target;

export const hasPlanet = ({ planets: { names } }: State, name: string) => names.includes(name);

export const isPlanetMoving = ({ planets: { stopped } }: State, name: string) =>
  !stopped.includes(name);
