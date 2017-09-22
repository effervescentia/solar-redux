declare module 'redux-validator' {
  interface Dispatch<S> {
    <A extends { type: any; }>(action: A): A;
  }

  interface Api<S> {
    dispatch: Dispatch<S>;
    getState(): S;
  }

  interface ReduxValidator {
    <S>(api: Api<S>): (next: Dispatch<S>) => Dispatch<S>;
  }

  const reduxValidator: () => ReduxValidator;
  export = reduxValidator;
}
