import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();

const showPublishedList =  (data,page)  => async dispatch =>  {
  await fetch(`${SERVER}${ENDPOINTS.PUBLISHED_POSTS}?user_id=${data}&page=${page}`, {
     method: 'GET',
     'Access-Control-Allow-Origin': '*'
  })
  .then(res=>res.json())
  .then(response=>{
      if(response.status === "success") {
        dispatch({ type: ReduxType.PUBLISHED_POSTS_SUCCESS,
                  payload:response})
      } else {
        dispatch({ type: ReduxType.PUBLISHED_POSTS_FAIL,
                  payload:response })
      }

  })
  .catch(e=>{
    dispatch({ type: ReduxType.PUBLISHED_POSTS_FAIL,
               payload:e
    })
  })

}

export default showPublishedList;
