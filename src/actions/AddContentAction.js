import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();
 headers.append('Authorization', 'Bearer ' + Cookies.get('token'));

const addContentAction =  data  => async dispatch =>  {
  LoadingAction(true)(dispatch)
  await fetch(`${SERVER}${ENDPOINTS.ADD_CONTENT}`, {
     body: data,
     method: 'POST',
     headers:headers,
     "Access-Control-Allow-Origin": "*"
  })
  .then(res=>res.json())
  .then(response=>{
    LoadingAction(false)(dispatch)

      if(response.status === "success") {
        dispatch({ type: ReduxType.ADD_CONTENT_SUCCESS,payload:response})
      } else {
        dispatch({ type: ReduxType.ADD_CONTENT_FAIL,payload:response })
      }

  })
  .catch(e=>{
    LoadingAction(false)(dispatch)

    dispatch({ type: ReduxType.LOGIN_FAIL,payload:e})
  })

}

export default addContentAction;
