import ReduxType from '../constants/reduxtype'
import { SERVER,ENDPOINTS,HEADERS } from '../apiEndPoints'
import LoadingAction from './LoadingAction'
import Cookies from 'js-cookie'


const MenuTypeAction =  data  => async dispatch =>  {
    if(data=="home") {
        dispatch({
           type: ReduxType.HOME,
           payload: 'home'
        })
    } else if(data=="contibution") {
        dispatch({
            type: ReduxType.CONTRIBUTION,
            payload: 'contribution'
        })
    }
    else {
        dispatch({
            type: ReduxType.SAVE,
            payload: 'save'
        })
    }
}

export default MenuTypeAction;
