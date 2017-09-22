import { bindActionCreators, Dispatch } from 'redux';

export const bindActions = (actions: any) =>
  (dispatch: Dispatch<any>) => ({ ...bindActionCreators(actions, dispatch) });
