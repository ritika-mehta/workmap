import ReduxType from '../constants/reduxtype'
function CategoryListReducer(state = false, { type, payload }) {
  switch (type) {
    case ReduxType.CATEGORY_LIST_SUCCESS:
      return payload;
    case ReduxType.CATEGORY_LIST_FAIL:
      return payload
    default:
      return state;
  }
}

export default CategoryListReducer;
