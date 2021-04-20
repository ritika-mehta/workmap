import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import LoadingReducer from './LoadingReducer'
import LoginReducer from './LoginReducer'
import AlertActiveReducer from './AlertActiveReducer'
import AddContentReducer from './AddContentReducer'
import FetchAllPostsReducer from './FetchAllPostsReducer'
import BookMarkPostsReducers from './BookMarkPostsReducer'
import SignupReducer from './CreateAccountReducer'
import UpdateProfileReducer from './UpdateProfileReducer'
import BookMarkListReducer from './BookMarkListReducer'
import PublishedPostsReducer from "./PublishedPostsReducer";
import UnderReviewPostsReducer from "./UnderReviewPostsRecuder";
import BannerReducer from './BannerReducer'
import BookMarkClicksReducer from "./BookMarkClicksReducer";
import BoostContentReducer from "./BoostContentReducer";
import MenuTypeReducer from "./MenuTypeReducer";
import ClickCountReducer from "./ClickCountReducer";
import CategoryListReducer from "./CategoryListReducer";
import UnsavePostReducer from "./UnsavePostReducer";
export default combineReducers({
  form: reduxFormReducer,
  isLoading         : LoadingReducer,
  isLoggedIn        : LoginReducer,
  alertShow         : AlertActiveReducer,
  isContentAdd      : AddContentReducer,
  allPosts          : FetchAllPostsReducer,
  bookMarkList      : BookMarkListReducer,
  publishList       : PublishedPostsReducer,
  underReviewList   : UnderReviewPostsReducer,
  bookMarkPosts     : BookMarkPostsReducers,
  bookMarkClicks    : BookMarkClicksReducer,
  createAccount     : SignupReducer,
  isProfileUpdate   : UpdateProfileReducer,
  BannerList        : BannerReducer,
  boostcontent      : BoostContentReducer,
  menuType          : MenuTypeReducer,
  clickCount        : ClickCountReducer,
  categoryList      : CategoryListReducer,
  unsavePost        : UnsavePostReducer,
});
