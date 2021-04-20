import ReduxType from '../constants/reduxtype'
function AddContentReducer(state = null, { type, payload }) {
  switch (type) {
    case ReduxType.ADD_CONTENT_SUCCESS:
      return payload;
    case ReduxType.ADD_CONTENT_FAIL:
      return payload;
    default:
      return state;
  }
}

export default AddContentReducer;
