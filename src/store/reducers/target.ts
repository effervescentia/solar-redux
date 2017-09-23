import Actions from '../actions';

export default (state: string = 'sun', action: Actions.FollowPlanet): string => {
  switch (action.type) {
    case Actions.FOLLOW_PLANET: return action.payload;
    default: return state;
  }
};
