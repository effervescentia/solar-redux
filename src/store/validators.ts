import { State } from '.';
import { isRunning } from './selectors';

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
