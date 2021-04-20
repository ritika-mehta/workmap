import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import BoostPopup from "../components/BoostPopup";
import Contribute from "../components/ContributePopup";
import axios from "axios";
import ThankYouMsg from "../components/ThankYou";
import Verification from "../components/Verification";
import Profile from "../containers/Profile/index";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loginFlag: false,
      signUpFlag: false,
      isLogin: false,
      isBoost: false,
      isContribute: false,
      imgsrc: null,
      token:[],
      user:{}
    };
    this.closeModalBoost = this.closeModalBoost.bind(this)
    this.closeModalSignUp = this.closeModalSignUp.bind(this)
    this.closeModalLogIn = this.closeModalLogIn.bind(this)
    this.closeModalContribute = this.closeModalContribute.bind(this)
  }


//   componentDidMount = () => {
//     if(localStorage.getItem('user') !== null || localStorage.getItem('token') !== null) {
//       let token  = JSON.parse(localStorage.getItem('token'))
//       let user  = JSON.parse(localStorage.getItem('user'))
//       this.getProfileDetail(user.id)
//     } else{
//   }
// };


 getProfileDetail = (payload) => {
  let token = JSON.parse(localStorage.getItem('token'))
  let formData = new FormData();
  formData.append("user_id",`${payload}`)
  console.log('gaurav',formData)
  axios.post("http://made.inworkmap.com/admin/public/api/v1/getuserDetails",formData,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response=> {
      console.log(response.data.data)
      this.setState({imgsrc: response.data.data.profile_img})
    })
}

  modelOpen = (e) => {
    var state = this.state.loginFlag;
    this.setState({ loginFlag: !state });
  };

  modelSignUpOpen = (e) => {
    var state = this.state.signUpFlag;
    this.setState({ signUpFlag: !state });
  };

  modelBoostOpen = (e) => {
    var state = this.state.isBoost;
    this.setState({ isBoost: !state });
  };

  modelContributeOpen = (e) => {
    var state = this.state.isContribute;
    this.setState({ isContribute: !state });
  };

  closeModalLogIn() {
    const { loginFlag} = this.state
    this.setState({loginFlag:!loginFlag})
  };

  closeModalSignUp() {
    const { signUpFlag} = this.state
    this.setState({signUpFlag:!signUpFlag})
  };

  closeModalBoost() {
    const { isBoost} = this.state
    this.setState({isBoost:!isBoost})
  };

  closeModalContribute() {
    const { isContribute} = this.state
    this.setState({isContribute:!isContribute})
  };

  setHome() {
    this.setState({
      isLogin:true,

    });
  }

  componentDidMount() {
    if(localStorage.getItem('token') !== null ) {
        let user  = JSON.parse(localStorage.getItem('user'))
        this.setState({isLogin:true,
          user:user
        })
      this.getProfileDetail(user.id)

    } else {
       // window.location.href="/"
    }
  }

  logOutUser(e) {

    window.localStorage.clear()
    this.setState({isLogin:false})
    window.location.href = "/"
  }

  publishedUser(e) {
    window.location.href = "/review"
  }

  render() {
    console.log("imageeeee",this.state.imgsrc)
    const { user } = this.state;
    // console.log("user",user)
    return (
      <header className="header d-flex align-items-center justify-content-between flex-wrap">
        {/* external components  start */}
        {this.state.loginFlag && <Login
            isOpenF={this.closeModalLogIn}
            homePage = {this.setHome}
            openSignupModal = { this.modelSignUpOpen}
        />}
        {this.state.signUpFlag && <SignUp
            closeSignUp = { this.closeModalSignUp}
            openLoginModal={this.modelOpen}
        />}
        {this.state.isBoost && <BoostPopup
            isOpenF={this.closeModalBoost}
            openBoostModal={this.modelBoostOpen}
        />}
        {this.state.isContribute && <Contribute
            isOpenF={this.closeModalContribute}
        />}
        {/* <ThankYouMsg /> */}
        {/* <Verification /> */}
        {/* external components  end */}
        <ul className="action-btn-wrap d-flex align-item-center">
          <li>
            <button onClick={e=>this.props.itemTypeHandler('image')}>
              <svg
                width="15"
                height="22"
                viewBox="0 0 15 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3554 7.8105C12.9834 7.8105 12.682 8.11199 12.682 8.48397V11.4023C12.682 14.404 10.2397 16.8462 7.23808 16.8462C4.23643 16.8462 1.7942 14.404 1.7942 11.4023V8.48397C1.7942 8.11199 1.49271 7.8105 1.12073 7.8105C0.748755 7.8105 0.447266 8.11199 0.447266 8.48397V11.4023C0.447266 14.9196 3.13531 17.8205 6.56461 18.1599V20.513H3.50369C3.13172 20.513 2.83022 20.8147 2.83022 21.1865C2.83022 21.5587 3.13172 21.86 3.50369 21.86H10.9725C11.3444 21.86 11.6459 21.5587 11.6459 21.1865C11.6459 20.8147 11.3444 20.513 10.9725 20.513H7.91155V18.1597C11.3409 17.8203 14.0289 14.9194 14.0289 11.4021V8.48375C14.0289 8.11177 13.7274 7.8105 13.3554 7.8105ZM7.23808 15.6403C9.62598 15.6403 11.562 13.704 11.562 11.3161V4.46403C11.562 2.07614 9.62598 0.140137 7.23808 0.140137C4.85018 0.140137 2.91418 2.07614 2.91418 4.46403V11.3161C2.91418 13.704 4.85018 15.6403 7.23808 15.6403Z"
                  fill="#D8D6D6"
                />
              </svg>
            </button>
          </li>
          <li>
            <button onClick={e=>this.props.itemTypeHandler('video')}>
              <svg
                width="27"
                height="18"
                viewBox="0 0 27 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7738 1.30342L19.7536 4.65955V3.57664C19.7536 2.65266 19.3866 1.76653 18.7332 1.11318C18.0799 0.459823 17.1937 0.0927734 16.2697 0.0927734H3.69481C2.77083 0.0927734 1.88469 0.459823 1.23134 1.11318C0.577987 1.76653 0.210938 2.65266 0.210938 3.57664V14.4231C0.210938 15.3471 0.577987 16.2332 1.23134 16.8866C1.88469 17.5399 2.77083 17.907 3.69481 17.907H16.2697C17.1937 17.907 18.0799 17.5399 18.7332 16.8866C19.3866 16.2332 19.7536 15.3471 19.7536 14.4231V13.3402L24.7738 16.6963C25.8799 17.3321 26.7887 16.8095 26.7887 15.535V2.47052C26.7887 1.19019 25.8828 0.667612 24.7738 1.30342Z"
                  fill="#D8D6D6"
                />
              </svg>
            </button>
          </li>
          <li>
            <button onClick={e=>this.props.itemTypeHandler('all')}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
                  fill="#D8D6D6"
                />
                <path
                  d="M11 6.4707V12.2942L14.2353 15.5295"
                  stroke="white"
                  stroke-width="1.3"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </li>
        </ul>
        {this.state.isLogin ? (
          <div className="secondary-header d-flex flex-wrap align-items-center">
            <div className="boost-btn-wrap d-flex flex-wrap align-items-center justify-content-between">
              <button className="btn btn-danger" onClick={this.publishedUser}>
                Boost your Content
              </button>
              <button onClick={this.modelContributeOpen} className="btn-plus">
                <span>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.5385 7.46092C32.8575 -2.22005 17.1409 -2.22005 7.45994 7.46092C-2.22102 17.1419 -2.22102 32.8585 7.45994 42.5395C17.1409 52.2204 32.8575 52.2204 42.5385 42.5395C52.2195 32.8585 52.2195 17.0821 42.5385 7.46092ZM36.2638 26.4045C35.9052 26.7631 35.3674 27.0021 34.8296 27.0021H27.0609V34.7708C27.0609 35.3086 26.8219 35.8465 26.4633 36.205C26.1048 36.5636 25.5669 36.8026 25.0291 36.8026C23.8937 36.8026 22.9973 35.9062 22.9973 34.7708V27.0021H15.2286C14.0932 27.0021 13.1968 26.1057 13.1968 24.9703C13.1968 23.8349 14.0932 22.9385 15.2286 22.9385H22.9973V15.1698C22.9973 14.0344 23.8937 13.138 25.0291 13.138C26.1645 13.138 27.0609 14.0344 27.0609 15.1698V22.9385H34.8296C35.965 22.9385 36.8614 23.8349 36.8614 24.9703C36.8016 25.5081 36.6223 26.046 36.2638 26.4045Z"
                      fill="#5867B0"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="user-profile d-flex flex-wrap align-items-center">
              <span className="user-name">{ user !==null? user.name :''}</span>
              {
                (this.state.imgsrc) ? 
                <img className="image-round" src={this.state.imgsrc} />
                :           
              <span className="info-graphic-icon d-flex align-items-center justify-content-center">
                 {user !== null ?  user.name[0].toUpperCase() : null }
              </span>
  }
              <div className="profile-dropdown">
                <ul>
                  <li>
                    <button>
                    <a href="/profile">
                      <span>
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.2007 17.2265C18.783 14.945 15.0379 12.3132 11.5046 11.316C13.443 10.3477 14.7736 8.34733 14.7736 6.034C14.7736 2.7736 12.1317 0.130859 8.87089 0.130859C5.61089 0.130859 2.96853 2.77321 2.96853 6.034C2.96853 8.34498 4.29834 10.3454 6.23285 11.3136C2.69716 12.3093 -1.0546 14.9438 0.529712 17.2265C2.90501 20.6509 14.8246 20.6509 17.2007 17.2265Z"
                            fill="#D8D6D6"
                          />
                        </svg>
                          My profile
                      </span>
                      </a>
                    </button>
                  </li>
                  <li>
                    <button>
                    <a href="mailto:support@inworkmap.com">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.7611 13.1198C14.1611 12.5198 13.1211 12.5198 12.5211 13.1198L11.8011 13.8398C11.3211 14.3198 9.60113 13.7598 8.08113 12.2398C7.32113 11.5198 6.76113 10.6398 6.48113 9.91978C6.24113 9.27978 6.24113 8.75978 6.48113 8.51978L7.20113 7.79978C7.80113 7.19978 7.80113 6.15978 7.20113 5.55978L5.12113 3.47979C4.52113 2.87979 3.48113 2.87979 2.88113 3.47979L1.08113 5.23978C0.121132 6.15978 0.0411322 7.75978 0.801132 9.75978C1.52113 11.6398 2.92113 13.7198 4.76113 15.5198C7.56113 18.3598 10.7211 19.9998 12.9211 19.9998C13.8011 19.9998 14.5211 19.7598 15.0411 19.2398L16.8011 17.4798C17.4011 16.8798 17.4011 15.8398 16.8011 15.2398L14.7611 13.1198Z"
                            fill="#4657A7"
                          />
                          <path
                            d="M17.5203 0H11.5203C10.3203 0 9.32031 0.96 9.32031 2.16V5.2C9.32031 6.4 10.2803 7.36 11.5203 7.36H11.5603V9.92C11.5603 10.08 11.6403 10.2 11.8003 10.28C11.8403 10.32 11.9203 10.32 11.9603 10.32C12.0403 10.32 12.1603 10.28 12.2003 10.24L15.6403 7.36H17.5203C18.7203 7.36 19.6803 6.4 19.6803 5.2V2.2C19.7203 0.96 18.7203 0 17.5203 0Z"
                            fill="#4657A7"
                          />
                        </svg>
                        support
                      </span>
                      </a>
                    </button>
                  </li>
                  <li>
                    <button>
                      <span 
                        onClick={
                        e => this.logOutUser()
                      }>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.32835 1.65356L7.17626 3.70274C7.9092 4.09306 8.50336 5.08268 8.50336 5.91317V16.9865H13.4142C13.8568 16.9865 14.2156 16.6273 14.2156 16.1851V12.5026C14.2156 12.0872 14.5522 11.7503 14.9674 11.7503H15.1174C15.5346 11.7503 15.8692 12.0868 15.8692 12.502V17.1364C15.8692 17.9668 15.1964 18.6401 14.3662 18.6401H8.50336V21.0448C8.50336 21.8753 7.90951 22.2322 7.17621 21.8417L0.87888 18.4881C0.847848 18.4729 0.817416 18.4567 0.787629 18.4395L0.58132 18.2961C0.247736 18.0203 0.0351562 17.6033 0.0351562 17.1364V1.5037C0.0351562 0.673231 0.707934 0 1.53817 0H14.3662C15.1963 0 15.8692 0.673041 15.8692 1.5037V6.13806C15.8692 6.55289 15.5326 6.88981 15.1174 6.88981H14.9674C14.5503 6.88981 14.2156 6.55299 14.2156 6.13751V2.45499C14.2156 2.01237 13.8568 1.65356 13.4142 1.65356H3.32835ZM17.3223 10.4989H13.3135C12.6494 10.4989 12.1111 9.96067 12.1111 9.29636C12.1111 8.63219 12.6497 8.09377 13.3135 8.09377H17.3223V7.06634C17.3223 6.23625 17.8747 5.9479 18.5557 6.4221L21.4504 8.43758C22.1316 8.91187 22.1315 9.68092 21.4504 10.1551L18.5557 12.1706C17.8745 12.6449 17.3223 12.3561 17.3223 11.5264V10.4989Z"
                            fill="#D8D6D6"
                          />
                        </svg>
                          logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <ul className="header-btn d-flex">
            <li>
              <button onClick={this.modelOpen} className="btn btn-default">
                Sign In
              </button>
            </li>
            <li>
              <button onClick={this.modelSignUpOpen} className="btn">
                Sign Up
              </button>
            </li>
          </ul>
        )}
      </header>
    );
  }
}

export default Header;
