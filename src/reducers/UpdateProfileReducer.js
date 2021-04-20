import ReduxType from '../constants/reduxtype'
function UpdateProfileReducer(state = null, { type, payload }) {
  switch (type) {
    case ReduxType.UPDATE_PROFILE_SUCCESS:
      return payload;
    case ReduxType.UPDATE_PROFILE_FAIL:
      return payload;
    default:
      return state;
  }
}

export default UpdateProfileReducer;
