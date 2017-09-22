declare module 'preact-redux' {
  interface PreactRedux {
    connect: <S, P>(
      mapStateToProps?: (state: S, props?: P) => object,
      mapDispatchToProps?: (dispatch: <A>(action: A) => A, props?: P) => object,
      mergeProps?: (stateProps: object, dispatchProps: object, props: P) => P,
      options?: any
    ) => (clazz: any) => void;

    Provider: any;
  }

  const preactRedux: PreactRedux;
  export = preactRedux;
}
