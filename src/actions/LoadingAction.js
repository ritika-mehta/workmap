import ReduxType from '../constants/reduxtype'
const LoadingAction = (data) => dispatch => {
  console.log("loading data",data)
    if(data) {
        dispatch({
            type:ReduxType.LOADING_TRUE
        })

    } else {
        dispatch({
            type:ReduxType.LOADING_FALSE
        })
    }
}
export default LoadingAction;
