import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();

const showUnderReviewList =  data  => async dispatch =>  {
  await fetch(`${SERVER}${ENDPOINTS.UNDER_REVIEW_POSTS}?user_id=${data}`, {
     method: 'GET',
     'Access-Control-Allow-Origin': '*'
  })
  .then(res=>res.json())
  .then(response=>{
      if(response.status === "success") {
        dispatch({ type: ReduxType.UNDER_REVIEW_POSTS_SUCCESS,
                  payload:response})
      } else {
        dispatch({ type: ReduxType.UNDER_REVIEW_POSTS_FAIL,
                  payload:response })
      }

  })
  .catch(e=>{
    dispatch({ type: ReduxType.UNDER_REVIEW_POSTS_FAIL,
               payload:e
    })
  })

}

export default showUnderReviewList;
