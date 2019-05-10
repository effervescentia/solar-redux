import dateFormat from 'dateformat';
import { State } from '.';
import { DAY_IN_MILLIS } from '../variables';

export const isRunning = ({ running }: State) => running;

export const coreDate = ({ startTime, tick }: State) => date(startTime, tick);

// tslint:disable-next-line
export const planetDate = (
  {
    startTime,
    planets: {
      byId: {
        [name]: { tick }
      }
    }
  }: State,
  name: string
) => dateInMillis(startTime, tick);

// tslint:disable-next-line
export const planetDates = (state: State) =>
  state.planets.allIds.reduce(
    (dates, id) => Object.assign(dates, { [id]: planetDate(state, id) }),
    {}
  );

export const date = (startTime: number, tick: number) =>
  dateFormat(new Date(dateInMillis(startTime, tick)), 'yyyy-mm-dd');

export const dateInMillis = (startTime: number, tick: number) =>
  startTime + tick * DAY_IN_MILLIS;

export const relativity = ({ scale: { relativity } }: State) => relativity;

export const targetPlanet = ({ target }: State) => target;

export const hasPlanet = ({ planets: { allIds } }: State, name: string) =>
  allIds.includes(name);

export const isPlanetMoving = (
  {
    planets: {
      byId: { [name]: planet }
    }
  }: State,
  name: string
) => !planet.stop;
