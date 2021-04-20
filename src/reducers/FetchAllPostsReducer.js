import ReduxType from '../constants/reduxtype'
function FetchAllPostsReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.FETCH_ALL_POSTS_SUCCESS:
      return {posts:payload.data};
    case ReduxType.FETCH_ALL_POSTS_FAIL:
      return payload
    default:
      return state;
  }
}

export default FetchAllPostsReducer;
