import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'

const headers =  new Headers();
headers.append('Authorization', 'Bearer ' + Cookies.get('token'));
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Access-Control-Allow-Credentials', 'true');

const CategoryList =  data  => async dispatch =>  {

  await fetch(`${SERVER}${ENDPOINTS.CATEGORY_LIST}`, {
     body: data,
     method: 'POST',
     headers:headers,
     'Access-Control-Allow-Origin': '*'

  })
  .then(res=>res.json())
  .then(response=>{
      if(response.status === "success") {
        dispatch({ type: ReduxType.CATEGORY_LIST_SUCCESS,
                  payload:response})
      } else {
        dispatch({ type: ReduxType.CATEGORY_LIST_FAIL,
                  payload:response })
      }

  })
  .catch(e=>{
    dispatch({ type: ReduxType.CATEGORY_LIST_FAIL,
               payload:e
    })
  })

}

export default CategoryList;
