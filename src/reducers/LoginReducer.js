import ReduxType from '../constants/reduxtype'
function LoginReducer(state = null, { type, payload }) {
  switch (type) {
    case ReduxType.LOGIN_SUCCESS:
      return payload;
    case ReduxType.LOGIN_FAIL:
      return payload;
    default:
      return state;
  }
}

export default LoginReducer;
