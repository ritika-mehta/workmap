

const SERVER = "http://made.inworkmap.com/admin/public";
const HEADERS = new Headers();
/*HEADERS.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ6ZWVzaGFuYWxpMjQyQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiZTNmY2M5YzQtMDIyOC00ODBiLThlNWQtNjc2YmZmZjVmYmZhIiwiY2xpZW50X2lkIjoiY29tcGxpYW5jZWJkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.RTun8orVx08UY8easO4ExmIQn01QBb4k4F1GSE17r_M")*/
//HEADERS.append("Accept", "application/json");
//HEADERS.append("Content-Type", "application/json");
HEADERS.append( "Access-Control-Allow-Origin", "http://made.inworkmap.com",)

const ENDPOINTS = {
  USER_LOGIN        : "/api/v1/login",
  ADD_CONTENT       : "/api/v1/addPost",
  FETCH_ALL_POSTS   : "/api/v1/getPostList",
  SIGN_UP           : "/api/v1/signup",
  UPDATE_PROFILE    : "/api/v1/updateProfile",
  BOOKMARK_POSTS    : "/api/v1/addBbookmarkPost",
  BOOKMARK_LIST     : "/api/v1/bookmarkList",
  PUBLISHED_POSTS   : "/api/v1/publishPostList",
  UNDER_REVIEW_POSTS: "/api/v1/underReviewPost",
  BOOK_MARK_CLICKS  : "/api/v1/clickCount",
  BANNERLIST        : "/api/v1/bannerList",
  HEADERBANNER		  : "/api/v1/topBanner",
  BANNER_ADD_VIEW   : "/api/v1/bannerAddView",
  BANNER_ADD_CLICK  : "/api/v1/bannerAddClick",
  GET_ALL_CLICK     : "/api/v1/planList",
  CLICK_COUNT       : "/api/v1/clickCount",
  CATEGORY_LIST     : "/api/v1/category",
  POST_UNSAVE       : "/api/v1/removebookmarkPost",
}


module.exports = {
SERVER,
ENDPOINTS,
HEADERS,

}
