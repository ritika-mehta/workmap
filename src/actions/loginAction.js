import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'
import AlertActiveAction from './AlertAction'
const userLoginAction =  data  => async dispatch =>  {
  LoadingAction(true)(dispatch)
  await fetch(`${SERVER}${ENDPOINTS.USER_LOGIN}`, {
     body: data,
     method: 'POST',
     "Access-Control-Allow-Origin": "*"
  })
  .then(res=>res.json())
  .then(response=>{

      LoadingAction(false)(dispatch);
      if(response.status === "success") {
        window.localStorage.setItem("user",JSON.stringify(response.data.user_date))
        window.localStorage.setItem("token",JSON.stringify(response.data.token))
        Cookies.set("token",response.data.token)
        dispatch({ type: ReduxType.LOGIN_SUCCESS,payload:response})
      } else {

        window.localStorage.removeItem("user")
        window.localStorage.removeItem("token")
        dispatch({ type: ReduxType.LOGIN_FAIL,payload:response })
      }

  })
  .catch(e=>{
    LoadingAction(false)(dispatch);
    dispatch({ type: ReduxType.LOGIN_FAIL,payload:e  })
  })

}

export default userLoginAction;
