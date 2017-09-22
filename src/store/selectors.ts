import { State } from '.'

export const isRunning = ({ running }: State) => running;

export const hasPlanet = ({ planets: { names } }: State, name: string) => names.includes(name);

export const isPlanetMoving = ({ planets: { stopped } }: State, name: string) =>
  !stopped.includes(name);
