import { State } from '.';
import { isRunning, hasPlanet, isPlanetMoving } from './selectors';

export interface Validator<P = any> {
  func: Validator.Func<P>;
  msg: string;
}

export namespace Validator {
  export interface Func<P> {
    (payload: P, state: State): boolean;
  }

  export const createValidator = <P>(func: Validator.Func<P>, msg: string): Validator<P> =>
    ({ func, msg });
}

export const timeIsStopped = Validator.createValidator(
  (_, state) => !isRunning(state),
  'time is already started');

export const timeHasStarted = Validator.createValidator(
  (_, state) => isRunning(state),
  'time is already stopped');

export const planetNonexistent = Validator.createValidator<string>(
  (name, state) => !hasPlanet(state, name),
  'planet already exists');

export const planetExists = Validator.createValidator<string>(
  (name, state) => hasPlanet(state, name),
  'planet does not exist');

export const planetIsMoving = Validator.createValidator<string>(
  (name, state) => isPlanetMoving(state, name),
  'planet is already stopped');

export const planetIsStopped = Validator.createValidator<string>(
  (name, state) => !isPlanetMoving(state, name),
  'planet is already moving');
