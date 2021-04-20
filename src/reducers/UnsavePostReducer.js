import ReduxType from '../constants/reduxtype'
function UnsavePostReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.UNSAVE_POST_SUCCESS:
      return payload;
    case ReduxType.UNSAVE_POST_FAIL:
      return payload
    default:
      return state;
  }
}

export default UnsavePostReducer;
