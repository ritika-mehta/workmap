import ReduxType from '../constants/reduxtype'
function ClickCountReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.CLICK_COUNT_SUCCESS:
      return payload;
    case ReduxType.CLICK_COUNT_FAIL:
      return payload
    default:
      return state;
  }
}

export default ClickCountReducer;
