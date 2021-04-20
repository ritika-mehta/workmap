import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();
// headers.append('Authorization', 'Bearer ' + Cookies.get('token'));

const unsavePostAction =  data  => async dispatch =>  {
  await fetch(`${SERVER}${ENDPOINTS.POST_UNSAVE}`, {
     body: data,
     method: 'POST',
    //  headers:headers,
     'Access-Control-Allow-Origin': '*'

  })
  .then(res=>res.json())
  .then(response=>{
      if(response.status === "success") {
        dispatch({ type: ReduxType.UNSAVE_POST_SUCCESS,
                  payload:response})
      } else {
        dispatch({ type: ReduxType.UNSAVE_POST_FAIL,
                  payload:response })
      }

  })
  .catch(e=>{
    dispatch({ type: ReduxType.UNSAVE_POST_FAIL,
               payload:e
    })
  })

}

export default unsavePostAction;
