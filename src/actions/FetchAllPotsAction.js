import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Access-Control-Allow-Credentials', 'true');
// headers.append('Authorization', 'Bearer ' + Cookies.get('token'));

const fetchAllPostsAction =  (data,page)  => async dispatch =>  {

  await fetch(`${SERVER}${ENDPOINTS.FETCH_ALL_POSTS}?page=${page}`, {
     body: data,
     method: 'POST',
    //  headers:headers,
     'Access-Control-Allow-Origin': '*'

  })
  .then(res=>res.json())
  .then(response=>{
      if(response.status === "success") {
        dispatch({ type: ReduxType.FETCH_ALL_POSTS_SUCCESS,
                  payload:response})
      } else {
        dispatch({ type: ReduxType.FETCH_ALL_POSTS_FAIL,
                  payload:response })
      }

  })
  .catch(e=>{
    dispatch({ type: ReduxType.FETCH_ALL_POSTS_FAIL,
               payload:e
    })
  })

}

export default fetchAllPostsAction;
