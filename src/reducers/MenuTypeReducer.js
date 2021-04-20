import ReduxType from '../constants/reduxtype'
function MenuTypeReducer(state = 'home', { type, payload }) {
  switch (type) {
    case ReduxType.HOME:
      return payload;
    case ReduxType.CONTRIBUTION:
      return payload;
      case ReduxType.SAVE:
        return payload
    default:
      return state;
  }
}

export default MenuTypeReducer;
