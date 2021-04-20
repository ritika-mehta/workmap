import ReduxType from '../constants/reduxtype'
const AlertActiveAction = (data) => dispatch => {
      if(data=="success") {
      dispatch({
          type:ReduxType.ALERT_ACTIVE_SUCCESS,
          payload:"success"
      })
    } else if(data==="fail") {
      dispatch({
          type:ReduxType.ALERT_ACTIVE_FAIL,
          payload:"fail"
      })
    } else {
      dispatch({
          type:ReduxType.ALERT_ACTIVE_CLOSE,
          payload:false
      })
    }

}
export default AlertActiveAction;
