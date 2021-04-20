import ReduxType from '../constants/reduxtype'
function SignupReducer(state = null, { type, payload }) {
  switch (type) {
    case ReduxType.CREATE_ACCOUNT_SUCCESS:
      return payload;
    case ReduxType.CREATE_ACCOUNT_FAIL:
      return payload;
    default:
      return state;
  }
}

export default SignupReducer;
