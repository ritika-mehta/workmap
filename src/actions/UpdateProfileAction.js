import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();
headers.append('Authorization', 'Bearer ' + Cookies.get('token'));
// HEADERS.append("mode", 'no-cors')
const updateProfileAction =  data  => async dispatch =>  {
  LoadingAction(true)(dispatch)
  console.log(Cookies.get('token'))
  await fetch(`${SERVER}${ENDPOINTS.UPDATE_PROFILE}`, {
     body     : data,
     method   : 'POST',
     headers:headers,
     "Access-Control-Allow-Origin": "*"
  })
  .then(res=>res.json())
  .then(response=>{

      LoadingAction(false)(dispatch);
      if(response.status === "success") {
        dispatch({ type: ReduxType.UPDATE_PROFILE_SUCCESS,payload:response})
      } else {
        dispatch({ type: ReduxType.UPDATE_PROFILE_FAIL ,payload:response })
      }

  })
  .catch(e=>{
    LoadingAction(false)(dispatch);
    dispatch({ type: ReduxType.UPDATE_PROFILE_FAIL, payload:e })
  })

}

export default updateProfileAction ;
