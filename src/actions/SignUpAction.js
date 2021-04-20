import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'


const createAccountAction =  data  => async dispatch =>  {
  LoadingAction(true)(dispatch)
  await fetch(`${SERVER}${ENDPOINTS.SIGN_UP}`, {
     body: data,
     method: 'POST',
    "Access-Control-Allow-Origin": "*"
  })
  .then(res=>res.json())
  .then(response=>{

      LoadingAction(false)(dispatch);
      if(response.status === "success") {
        dispatch({ type: ReduxType.CREATE_ACCOUNT_SUCCESS,payload:response})
      } else {
        dispatch({ type: ReduxType.CREATE_ACCOUNT_FAIL ,payload:response })
      }

  })
  .catch(e=>{
    LoadingAction(false)(dispatch);
    dispatch({ type: ReduxType.CREATE_ACCOUNT_FAIL, payload:e })
  })

}

export default createAccountAction ;
