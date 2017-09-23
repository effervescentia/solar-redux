import Actions from '../actions';

export default (state: boolean = false, action: Actions.FlipView): boolean => {
  switch (action.type) {
    case Actions.FLIP_VIEW: return !state;
    default: return state;
  }
};
