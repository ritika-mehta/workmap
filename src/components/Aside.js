import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import MenuTypeAction from '../actions/MenuTypeAction';
import workmapLogo from "../assets/img/workmapLogo.png";
import { createBrowserHistory } from "history";
import Review from "../containers/Review/review";
const history = createBrowserHistory();

function Aside(props) {

  const [ativeCls,setActive] = useState('home')
  const  dispatch = useDispatch();
  const  menuType = useSelector(s=>s.menuType)
  useEffect(()=>{
    const url = window.location.href.split('/');
    if(url.indexOf('save')>=1){
      setActive('save')
    } else if(url.indexOf('review')>=1){
      setActive('review');
    } 
    else{
      setActive('home');
    }
    // console.log("urllll",url,ativeCls)
  },[ativeCls])

  // click handler lagna 
  // console.log("menuType",menuType,props)//test


  const handleSideClick = (type) =>{
      if(type=='home') {
        MenuTypeAction('home')(dispatch)
      }
       else if(type=="contribution"){
        MenuTypeAction('contribution')(dispatch)
        props.history.push("/review")
      }
      else{
        MenuTypeAction('save')(dispatch)
      }
  }
  return (  
    <aside className="sidebar text-center">
      <button className="btn-toggle d-md-none">
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </button>
      <div className="sidebar-inner">
        <a href="/" className="logo">
          <img src={workmapLogo} alt="workmapLogo" />
        </a>
        <nav className="navigation">
          <ul className="nav-bar">
            <li>
              <a href="/" className={`${ativeCls=='home'?"active":'' }`}>
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.7181 8.40171L10.4936 0.176754C10.2313 -0.058918 9.83786 -0.058918 9.57556 0.176754L0.351041 8.40171C-0.348448 9.03803 0.066874 10.2635 0.984954 10.2635H2.01233V20.1618C2.01233 21.1751 2.75554 22 3.71733 22H7.34593C7.76126 22 8.06728 21.6701 8.06728 21.2223V16.4381C8.06728 15.9904 8.37331 15.6604 8.78863 15.6604H11.3243C11.7396 15.6604 12.0456 15.9904 12.0456 16.4381V21.1987C12.0456 21.6465 12.3517 21.9764 12.767 21.9764H16.4174C17.3574 21.9764 18.1224 21.1751 18.1224 20.1382V10.24H19.1498C20.0242 10.2635 20.4395 9.03803 19.7181 8.40171Z"
                    fill="white"
                  />
                </svg>
                   <span className="hover-info" onClick={e=> handleSideClick('home')}>home</span> 
              </a>
            </li>
            <li>
              <a href="/review"  className={`${ativeCls=='review'?"active":'' }`}>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.14711 20.2129H0.976895C0.551363 20.2129 0.210938 19.8725 0.210938 19.4469V0.978848C0.210938 0.553316 0.551363 0.212891 0.976895 0.212891H7.14711C7.57264 0.212891 7.91306 0.553316 7.91306 0.978848V19.4469C7.91306 19.8725 7.57264 20.2129 7.14711 20.2129Z"
                    fill="white"
                  />
                  <path
                    d="M19.4453 7.19161H12.2113C11.7857 7.19161 11.4453 6.85119 11.4453 6.42566V0.978848C11.4453 0.553316 11.7857 0.212891 12.2113 0.212891H19.4453C19.8708 0.212891 20.2113 0.553316 20.2113 0.978848V6.46821C20.2113 6.85119 19.8708 7.19161 19.4453 7.19161Z"
                    fill="white"
                  />
                  <path
                    d="M19.4453 19.7451H12.2113C11.7857 19.7451 11.4453 19.4047 11.4453 18.9791V11.66C11.4453 11.2345 11.7857 10.894 12.2113 10.894H19.4453C19.8708 10.894 20.2113 11.2345 20.2113 11.66V18.9366C20.2113 19.4047 19.8708 19.7451 19.4453 19.7451Z"
                    fill="white"
                  />
                </svg>
                <span className="hover-info" onClick={e=> handleSideClick('contribution')}>contibution</span>
              </a>
            </li>
            <li>
            <a href="/save" className={`${ativeCls=='save'?"active":'' }`}>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.113281 0.119141V18.5631C0.113281 19.6751 1.40528 20.2871 2.26528 19.5831L7.16928 15.5711C7.65328 15.1751 8.35328 15.1751 8.83728 15.5711L13.7413 19.5831C14.6013 20.2871 15.8933 19.6751 15.8933 18.5631V0.119141H0.113281Z"
                    fill="white"
                  />
                </svg>
                <span className="hover-info" onClick={e=> handleSideClick('save')}>saved</span>
              </a>
            </li>
          </ul>
          <button className="logout">
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
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default Aside;