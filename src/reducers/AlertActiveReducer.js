import ReduxType from '../constants/reduxtype'
function AlertActiveReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.ALERT_ACTIVE_SUCCESS:
      return payload;
    case ReduxType.ALERT_ACTIVE_FAIL:
      return payload
    default:
      return state;
  }
}

export default AlertActiveReducer;
