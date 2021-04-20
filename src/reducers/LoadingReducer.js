import ReduxType from '../constants/reduxtype'
function LoadingReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.LOADING_TRUE:
      return true;
    case ReduxType.LOADING_FALSE:
      return false;
    default:
      return state;
  }
}

export default LoadingReducer;
