import React, { Component, useState,useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import SideBar from "../../components/Aside";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Ad_Banner from "../../components/ad_banner";
import galleryImg1 from "../../assets/img/gallery1.png";
import galleryImg2 from "../../assets/img/gallery2.png";
import galleryImg3 from "../../assets/img/gallery3.png";
import galleryImg4 from "../../assets/img/gallery4.png";
import BoostPopup from "../../components/BoostPopup";
import Contribute from "../../components/ContributePopup";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import showBookMarkList from '../../actions/BookMarkListAction';
import {getBannerList} from '../../actions/BannerAction';
import {getallclick} from '../../actions/BoostContentAction';
import ClickCount from '../../actions/ClickCountAction';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import unsavePostAction from '../../actions/PostUnsaveAction'
import axios from 'axios';

  
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

  const Save = (props) => {

    const classes = useStyles();
    const [boostModal,setBoostModal] = useState(false);
    const [contributeModal,setContributeModal] = useState(false);
    const [ name,setName ]  = useState('');
    const [token, setToken] = useState([]);
    const [user, setUser] = useState([]);
    const [ markedPosts,setMarkedPost ]  = useState([]);
    const clickamountdata  = useSelector(s=>s.boostcontent)
    const  dispatch = useDispatch();
    const [ bookMarkList,setBookMarkList ]  = useState([]);
    const bookmarkList  = useSelector(s=>s.bookMarkList)
    const [ itemnumber,setItemnumber ]  = useState(0);
    const bannerlist  = useSelector(s=>s.BannerList.banner)
    const refContainer = useRef(null);
    const [postType,setPostType] = useState(bookmarkList.data && bookmarkList.data !== false?bookmarkList.data:[]);
    const [itemtype,setItemtype]  = useState('all')
    const [title,setTitle] = useState('');
    const [imgsrc,setImgsrc] = useState(null)
    const [page,setPage] = useState(1)
    console.log("post_type",postType)
    console.log("all post",postType)


    const itemTypeHandler = (type_) =>{
      setItemtype(type_)
      console.log("whiolenoew",bookmarkList)
      console.log("type+++++",type_)
        let lists = [];
        // setPostType(bookmarkList)
        if(type_==='all') {
          lists = bookmarkList.data.data
        } else {

          lists = bookmarkList.data.data.slice().filter(el =>type_===el.postdata.post_type)
        }
           setPostType(lists)
        console.log("newallpost",bookmarkList)
    }


    // useEffect(()=>{
    //   window.document.title = "Discover & share quality content | save"
    // }
    // ,[])


    const modalOpenBoost = (list) => {
      // e.preventDefault()
      console.log("userlist",list)
      setTitle(list)
      setBoostModal(!boostModal);
    }


   const  closeModalBoost = ()=> {
      setBoostModal(!boostModal)
    };

    const modalOpenContribute = (e) => {
      e.preventDefault()
      setContributeModal(!contributeModal);
    }

   const closeModalContribute =() => {
    setContributeModal(!contributeModal)
  };
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);


  const WordLimit = (str) => {
    let desc='';
    let val = str.split(" ")
    val.forEach((item,i)=> {
      if(i<50){
        desc+=item+" "
      }
    })
    return desc
  }


  let resizeWindow = () => {
    let liWidth = document.getElementById('li0')
    if(liWidth){
      let item = getItemInRow();
      setItemnumber(item)  
    }
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };


  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);


    useEffect(async (id)=>{
      window.scrollTo(0, 0);
      let form_Data = new FormData();
      let user={}
      if(localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem('user'))
        await showBookMarkList(user.id,1)(dispatch)
        form_Data.append("user_id",JSON.parse(localStorage.getItem("user")).id )
        form_Data.append("post_id",id)
        await dispatch(getallclick())
        await dispatch(getBannerList())
        console.log("newwwww",bookmarkList);
        console.log("userrrrrrrssssss",user.id)
        console.log("postsssssss",id)
      }
      let item = getItemInRow();
      setItemnumber(item)
    },[])
        console.log("test",bookmarkList)


      useEffect(()=>{
        console.log("newListtttt",bookmarkList)
        setPostType(bookmarkList.data? bookmarkList.data.data:[])
      },[bookmarkList])


      const getProfileDetail = (payload) => {
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
            setImgsrc(response.data.data.profile_img)
          })
      }

      useEffect(() => {
        if(localStorage.getItem('user') !== null || localStorage.getItem('token') !== null) {
          let user  = JSON.parse(localStorage.getItem('user'))
          let token  = JSON.parse(localStorage.getItem('token'))
          setUser(user);
          setToken(token);
          setName(user.name);
          // setEmail(user.email);
          console.log("userrnameee",user);
          getProfileDetail(user.id)
        } else{
    
      }
    },[])

        const getItemInRow = () => {
          let screenWidth = document.getElementById('galleryList').clientWidth
          let liEle = document.getElementById('li0')
          if(liEle){
            let liWidth = document.getElementById('li0').clientWidth
            let item = Math.round(screenWidth/liWidth)*3
            return item
          }else{
            return 12
          }
        }


        const handleUnsavePost = async (id) =>{
          let form_Data = new FormData();
          let user={}
          if(localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'))
            form_Data.append("user_id",JSON.parse(localStorage.getItem("user")).id )
            form_Data.append("post_id",id)
            await unsavePostAction(form_Data)(dispatch)
         }
          else{
    
          }
        }


        const bookListUI = () => {
          let newItem = itemnumber
          let booklists = [] 
          let n = 0
          console.log("post view list",postType)
          console.log("list==================",bookmarkList)
          if(postType !== undefined && postType.length > 0) {
            booklists = (postType)
          }
          console.log("resultttttt",booklists)
          return booklists.map((list,i) => {
            if(newItem===i){
              newItem = newItem+itemnumber
          }
          if(n===bannerlist.length){
           n=0 
          }
          n++
            return(
              <React.Fragment>
              <li id={`li${i}`}>
              <div className="card">
            
                {/* viewPosts.length > 0 ? viewPosts.map(posts =>( */}
  
                <img src={list.postdata !== null ? list.postdata.image : ""} alt="img" />
                <div className="card-body">
                  <button className="btn-plus"
                  // onClick = { modalOpenContribute }
                  >
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
                  <a href={list.postdata !== null ? list.postdata.url : ""} className="btn-link">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.642 1.5625H9.25C8.93934 1.5625 8.6875 1.31066 8.6875 1C8.6875 0.68934 8.93934 0.4375 9.25 0.4375H13C13.3107 0.4375 13.5625 0.68934 13.5625 1V4.75C13.5625 5.06066 13.3107 5.3125 13 5.3125C12.6893 5.3125 12.4375 5.06066 12.4375 4.75V2.358L5.89775 8.89775C5.67808 9.11742 5.32192 9.11742 5.10225 8.89775C4.88258 8.67808 4.88258 8.32192 5.10225 8.10225L11.642 1.5625ZM6.24998 1.75V1.75007C6.44669 1.74729 6.62966 1.85064 6.72883 2.02055C6.828 2.19045 6.828 2.40059 6.72883 2.5705C6.62966 2.74041 6.44669 2.84376 6.24998 2.84098C4.88919 2.84098 3.87601 2.84464 3.16262 2.92514C2.44922 3.00564 2.08086 3.15546 1.86717 3.36938C1.65348 3.58331 1.50407 3.95165 1.42399 4.66483C1.34391 5.378 1.34089 6.39063 1.34089 7.75001C1.34089 9.109 1.3456 10.1213 1.42719 10.8341C1.50877 11.547 1.65933 11.916 1.87462 12.1307C2.08991 12.3454 2.4588 12.4944 3.17116 12.5749C3.88352 12.6554 4.89452 12.6591 6.24997 12.6591C7.60525 12.6591 8.61652 12.655 9.32877 12.5739C10.041 12.4927 10.4097 12.3428 10.6253 12.1275C10.8409 11.9121 10.9912 11.5434 11.0728 10.831C11.1544 10.1186 11.159 9.10673 11.159 7.75003C11.1563 7.55332 11.2596 7.37035 11.4295 7.27118C11.5994 7.17202 11.8096 7.17202 11.9795 7.27118C12.1494 7.37035 12.2527 7.55332 12.2499 7.75003C12.2499 9.10776 12.25 10.1352 12.1562 10.9545C12.0624 11.7739 11.8668 12.4292 11.3966 12.8988C10.9264 13.3685 10.2702 13.564 9.4513 13.6573C8.63241 13.7506 7.60614 13.75 6.24998 13.75C4.89399 13.75 3.86745 13.752 3.04867 13.6594C2.22989 13.5669 1.57491 13.3723 1.10441 12.9031C0.633902 12.4339 0.436497 11.7785 0.342685 10.9588C0.248872 10.1391 0.250001 9.11011 0.250001 7.75003C0.250001 6.39027 0.248561 5.36161 0.340557 4.54229C0.432521 3.72291 0.625392 3.06798 1.09481 2.59803C1.56422 2.12808 2.2204 1.93307 3.04011 1.84056C3.85987 1.74805 4.88865 1.75 6.24998 1.75Z"
                        fill="#85A5C2"
                      />
                    </svg>
                    {list.postdata !== null ? list.postdata.url : ""}
                  </a>
                  <div className="profile-row d-flex flex-wrap align-items-start justify-content-between">
                    <div className="profile-wrap d-flex flex-wrap align-items-center">
                    {
                    
                    (imgsrc && list.postdata.userdata.name == name ) ? 
                    <img className="image-round" src={imgsrc} />
                    :
                      <span className="info-graphic-icon d-flex align-items-center justify-content-center">
                      {list.postdata !== null ? list.postdata.userdata.name.charAt(0) : ""}
                      </span>
          }
                     <div className="profile-desc">
                         <span className="user-name">{list.postdata !== null ? list.postdata.userdata.name : ''}</span>
                        <span>{list.created_date}</span>
                      </div>
                    </div>
                    <button className="badge badge-danger">{list.postdata.category !== null ?list.postdata.category.title:''}</button>
                  </div>
                  <h2>
                  {list.postdata !== null ? list.postdata.title : ""}
                  </h2>
                  <p>
                  {WordLimit(list.postdata!== null ? list.postdata.description : '')}
                  </p>
                  <div className="card-action d-flex flex-wrap justify-content-between">
                    <button className="like-count">
                      <span className="d-flex align-items-center">
                        <svg
                          width="25"
                          height="30"
                          viewBox="0 0 25 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M23.7459 8.83777C23.4453 8.29669 21.2209 7.75561 20.8601 8.23657C20.6197 8.59729 20.4994 9.31873 20.5595 10.0402C20.4393 9.25861 20.2589 8.59729 20.0185 8.17645C19.6577 7.51513 17.1327 7.09428 16.772 7.75561C16.4714 8.29669 16.4112 9.19849 16.4112 10.1604C16.2309 9.37885 16.0505 8.65741 15.7499 8.23657C15.3291 7.69549 12.8642 7.45501 12.5034 8.05621C12.0826 8.77765 12.2028 10.1003 12.4433 11.4831C12.4433 11.6033 11.9623 9.67945 10.2189 1.44298C10.0385 0.481057 9.07658 -0.120146 8.11465 0.0602152C7.15273 0.240576 6.55153 1.2025 6.73189 2.16442C6.73189 2.16442 9.1367 13.467 9.67778 17.0742C9.7379 17.3147 6.19081 16.2326 3.24492 14.3688C2.52347 13.8879 1.14071 14.0682 0.659745 14.3688C0.058543 14.7296 -0.482539 15.5712 0.359144 16.4129C1.62167 17.7356 6.19081 19.4791 7.33309 22.3648C8.47538 25.1304 11.782 26.2125 12.7439 28.5572C13.4654 30.2406 14.9082 30.0602 15.9904 29.94C20.1988 29.3989 24.9483 28.4971 23.6858 25.4911C23.2048 24.2286 24.7078 20.2606 24.8882 19.2386C25.1888 18.1564 24.4072 9.98006 23.7459 8.83777Z"
                            fill="url(#paint0_linear)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear"
                              x1="25.9436"
                              y1="23.8991"
                              x2="2.07972"
                              y2="8.32242"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#F47E31" />
                              <stop offset="0.322917" stop-color="#F47019" />
                              <stop offset="0.911458" stop-color="#F07F34" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {list.postdata !== null ? list.postdata.total_click : 0}
                      </span>
                    </button>
                    <div className="d-flex flex-wrap">
                      <div className="publish-wrap">
                        <div className="publish-inner publish-popupinner">
                          <div className="publish publish-arrow">
                            <h3>Share publication</h3>
                            <ul className="publish-media d-flex flex-wrap align-items-center">
                              <li>
                                <TwitterShareButton
                                  url={list.postdata !== null ? list.postdata.url : ""}
                                >
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="16"
                                      cy="16"
                                      r="16"
                                      fill="#1DA1F2"
                                    />
                                    <path
                                      d="M23.1478 12.389C23.1593 12.5465 23.1593 12.704 23.1593 12.8615C23.1593 17.6653 19.4473 23.2003 12.663 23.2003C10.5729 23.2003 8.63131 22.604 6.99805 21.5691C7.29501 21.6028 7.58052 21.614 7.88891 21.614C9.61351 21.614 11.2011 21.0403 12.4689 20.0616C10.847 20.0278 9.48789 18.9816 9.01961 17.5415C9.24806 17.5753 9.47647 17.5978 9.71634 17.5978C10.0475 17.5978 10.3788 17.5528 10.6871 17.474C8.99679 17.1365 7.72898 15.674 7.72898 13.9078V13.8628C8.22008 14.1328 8.7912 14.3016 9.39649 14.324C8.40283 13.6715 7.75183 12.5578 7.75183 11.2978C7.75183 10.6228 7.93454 10.004 8.25436 9.46403C10.0704 11.669 12.8001 13.109 15.861 13.2665C15.8039 12.9965 15.7696 12.7153 15.7696 12.434C15.7696 10.4315 17.4143 8.80029 19.4587 8.80029C20.5209 8.80029 21.4803 9.23904 22.1541 9.94779C22.9879 9.7903 23.7874 9.48654 24.4955 9.07029C24.2214 9.91406 23.6389 10.6228 22.8737 11.0728C23.6161 10.9941 24.3356 10.7915 24.998 10.5103C24.4956 11.2303 23.8674 11.8715 23.1478 12.389Z"
                                      fill="white"
                                    />
                                  </svg>
  
                                  <span>12</span>
                                </TwitterShareButton>
                              </li>
                              <li>
                                <LinkedinShareButton
                                url={list.postdata !== null ? list.postdata.url : ""}
                                >
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="32"
                                      height="32"
                                      rx="2"
                                      fill="#0073B1"
                                    />
                                    <g clip-path="url(#clip0)">
                                      <path
                                        d="M27.759 27.2932V27.2923H27.7646V19.0081C27.7646 14.9554 26.8921 11.8335 22.1543 11.8335C19.8766 11.8335 18.3481 13.0834 17.7241 14.2683H17.6583V12.2118H13.166V27.2923H17.8437V19.825C17.8437 17.8589 18.2164 15.9577 20.6512 15.9577C23.0503 15.9577 23.086 18.2015 23.086 19.9511V27.2932H27.759Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M5.54883 12.2134H10.2321V27.2938H5.54883V12.2134Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M7.88825 4.70557C6.39084 4.70557 5.17578 5.92063 5.17578 7.41804C5.17578 8.91545 6.39084 10.1559 7.88825 10.1559C9.38566 10.1559 10.6007 8.91545 10.6007 7.41804C10.5998 5.92063 9.38472 4.70557 7.88825 4.70557V4.70557Z"
                                        fill="white"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0">
                                        <rect
                                          width="22.5882"
                                          height="22.5882"
                                          fill="white"
                                          transform="translate(5.17578 4.70557)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
  
                                  <span>57</span>
                                </LinkedinShareButton>
                              </li>
                            </ul>
                            <div className="form-group">
                              <button className="btn-join">
                                <svg
                                  width="18"
                                  height="10"
                                  viewBox="0 0 18 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.17852 3.33534C7.48944 3.02442 7.66711 2.89117 7.66711 2.89117L8.91079 4.09043C8.73312 4.17926 8.73312 4.22368 8.59987 4.35693L8.55545 4.40135C8.51103 4.44577 8.4222 4.5346 8.37778 4.57901C8.24453 4.71227 8.1557 4.88993 8.11128 5.02318C8.06686 5.11202 8.06686 5.15644 8.06686 5.20085V5.24527C8.06686 5.3341 8.02245 5.37852 8.02245 5.46735C8.02245 5.55619 8.02245 5.64502 8.02245 5.73386C8.02245 5.82269 8.02245 5.86711 8.06686 5.95594V6.00036V6.04477C8.06686 6.08919 8.11128 6.13361 8.11128 6.17803C8.28895 6.62219 8.64428 6.97753 9.08845 7.11078C9.44379 7.24403 9.88796 7.24403 10.3321 7.02195L15.3068 4.93435C16.3728 4.49018 16.5505 3.55743 16.2396 2.80234C16.0619 2.35817 15.7066 2.00283 15.218 1.82517C14.8627 1.69191 14.4629 1.69191 14.0187 1.86958H13.9743L12.5974 2.447L11.4426 1.11449L13.3525 0.31499C17.1723 -1.2396 19.8374 4.75668 15.9287 6.40011L10.9095 8.53212C7.53386 10.0867 5.04651 5.55619 7.17852 3.33534Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M10.9108 8.79816C9.13417 9.50883 7.71283 8.62049 6.95774 7.55448C6.11382 6.35523 5.89173 4.4453 7.09099 3.20162C7.40191 2.89071 7.57958 2.75746 7.62399 2.75746C7.66841 2.71304 7.75725 2.71304 7.80166 2.75746L9.04534 3.95671C9.04534 4.04555 9.04534 4.08996 9.04534 4.13438C9.04534 4.1788 9.00092 4.22321 8.9565 4.22321C8.86767 4.26763 8.82325 4.31205 8.77883 4.35647C8.73442 4.40088 8.73442 4.40088 8.69 4.4453L8.64558 4.48972C8.55675 4.53413 8.51233 4.62297 8.46792 4.66738C8.37908 4.80063 8.29025 4.93389 8.20141 5.06714C8.157 5.15597 8.157 5.20039 8.157 5.2448V5.28922V5.33364C8.157 5.37805 8.11258 5.46689 8.11258 5.51131C8.11258 5.60014 8.11258 5.68897 8.11258 5.73339C8.11258 5.82222 8.11258 5.86664 8.157 5.91106C8.157 5.91106 8.157 5.91106 8.157 5.95548V5.99989V6.04431C8.157 6.08873 8.20141 6.13314 8.20141 6.17756C8.37908 6.57731 8.69 6.93265 9.08975 7.0659C9.44509 7.19915 9.84484 7.15473 10.2446 6.97706L15.2637 4.88947C16.3297 4.4453 16.3741 3.55696 16.152 2.97954C15.9744 2.57979 15.619 2.22445 15.2193 2.04678C14.864 1.91353 14.5086 1.91353 14.1089 2.0912H14.0644L12.6875 2.66862C12.6431 2.66862 12.5543 2.66862 12.5099 2.62421L11.355 1.2917C11.3106 1.24728 11.3106 1.20286 11.3106 1.15845C11.3106 1.11403 11.355 1.06961 11.3994 1.06961L13.3094 0.270107C15.3081 -0.529398 17.0404 0.66986 17.7066 2.26887C18.3285 3.77904 18.062 5.77781 15.9744 6.66615L10.9553 8.79816H10.9108ZM7.66841 3.06837C7.57958 3.11279 7.44633 3.24604 7.31308 3.42371C6.24707 4.53413 6.42474 6.26639 7.22424 7.37682C7.8905 8.35399 9.223 9.15349 10.822 8.53166C10.822 8.53166 10.8664 8.53166 10.8664 8.48724L15.8855 6.35523C17.7955 5.55572 18.0176 3.77905 17.4401 2.3577C16.8183 0.891945 15.2637 -0.218479 13.4426 0.536609L11.7104 1.2917L12.6875 2.3577L13.9312 1.8247L13.9756 1.78028C14.4198 1.60261 14.864 1.60262 15.3081 1.73587C15.7967 1.91353 16.1965 2.31329 16.3741 2.80187C16.685 3.60138 16.5074 4.62297 15.3525 5.11155L10.3778 7.24357C9.93368 7.46565 9.44509 7.46565 9.00092 7.3324C8.51233 7.15473 8.157 6.7994 7.93491 6.31081C7.93491 6.26639 7.8905 6.22198 7.8905 6.13314V6.08873C7.8905 6.08873 7.8905 6.04431 7.8905 5.99989C7.84608 5.91106 7.84608 5.82222 7.84608 5.73339C7.84608 5.64456 7.84608 5.55572 7.84608 5.46689C7.84608 5.37805 7.84608 5.28922 7.8905 5.20039C7.8905 5.20039 7.8905 5.15597 7.8905 5.11155C7.8905 5.02272 7.93491 4.9783 7.93491 4.88947C8.02375 4.7118 8.11258 4.53413 8.24583 4.40088C8.29025 4.35647 8.37908 4.26763 8.4235 4.22321L8.46792 4.1788C8.51233 4.13438 8.51233 4.13438 8.55675 4.08996C8.60117 4.04555 8.60117 4.04555 8.64558 4.00113L7.66841 3.06837Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M13.4414 0.581931C13.397 0.581931 13.397 0.581931 13.3526 0.581931C13.3082 0.581931 13.2638 0.581931 13.2638 0.537514C13.2194 0.493097 13.2194 0.404264 13.2638 0.359847C13.3082 0.31543 13.3526 0.31543 13.397 0.31543C13.4414 0.31543 13.4859 0.359847 13.4859 0.404264C13.5303 0.448681 13.4859 0.537515 13.4414 0.581931Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M14.1067 2.09203H14.0623C13.9734 2.13645 13.8846 2.09203 13.8846 2.0032C13.8402 1.91436 13.8846 1.82553 13.9734 1.82553H14.0179C14.1067 1.78111 14.1955 1.82553 14.1955 1.91436C14.1955 1.95878 14.1511 2.04762 14.1067 2.09203Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M10.91 5.73397C10.6435 6.04489 9.75518 6.57789 9.75518 6.57789L8.68918 5.24538L9.48868 4.71238L9.5331 4.66796C9.57752 4.62355 9.66635 4.53471 9.71077 4.49029C9.84402 4.35704 9.93285 4.17938 9.97727 4.04613C10.0217 3.95729 10.0217 3.91288 10.0217 3.86846V3.82404C10.0217 3.73521 10.0661 3.69079 10.0661 3.60196C10.0661 3.51312 10.0661 3.42429 10.0661 3.33545C10.0661 3.24662 10.0661 3.2022 10.0217 3.11337V3.06895V3.02454C10.0217 2.98012 9.97727 2.9357 9.97727 2.89129C9.7996 2.44712 9.44427 2.09178 9.0001 1.91411C8.64476 1.78086 8.20059 1.78086 7.75642 2.00295L2.78173 4.09054C1.71572 4.53471 1.53805 5.46747 1.80455 6.22256C1.98222 6.66672 2.33756 7.06648 2.82614 7.19973C3.18148 7.33298 3.58123 7.33298 4.0254 7.15531H4.06982L5.22466 6.66672L6.20183 8.04365L4.69165 8.66549C0.871798 10.2201 -1.79322 4.17938 2.15989 2.53595L7.179 0.448354C10.5547 -0.972987 12.9088 3.42429 10.91 5.73397Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M9.79986 6.71125C9.75544 6.75567 9.66661 6.71125 9.62219 6.66684L8.55618 5.33433C8.51177 5.28991 8.51177 5.2455 8.51177 5.20108C8.51177 5.15666 8.55618 5.11224 8.55618 5.11224L9.35569 4.57924C9.35569 4.57924 9.35569 4.57924 9.4001 4.57924C9.44452 4.53482 9.53336 4.49041 9.57777 4.40157C9.66661 4.26832 9.75544 4.13507 9.84427 4.00182C9.88869 3.91299 9.88869 3.86857 9.88869 3.82415V3.77974V3.73532C9.88869 3.6909 9.93311 3.60207 9.93311 3.55765C9.93311 3.46882 9.93311 3.37998 9.93311 3.33557C9.93311 3.24673 9.93311 3.20232 9.88869 3.1579C9.88869 3.1579 9.88869 3.1579 9.88869 3.11348V3.06907V3.02465C9.88869 2.98023 9.84427 2.93581 9.84427 2.93581C9.66661 2.53606 9.35569 2.18073 8.95593 2.04748C8.6006 1.91422 8.20085 1.95864 7.8011 2.13631L2.8264 4.17949C1.76039 4.62366 1.71597 5.512 1.93806 6.08942C2.11573 6.48917 2.47106 6.8445 2.87082 7.02217C3.22615 7.15542 3.58149 7.15542 3.93682 6.97776H3.98124L5.13608 6.48917C5.1805 6.44475 5.26933 6.48917 5.31375 6.53359L6.29092 7.91051C6.33534 7.95493 6.33534 7.99935 6.29092 8.04376C6.29092 8.08818 6.2465 8.1326 6.20209 8.1326L4.69191 8.75443C2.64873 9.55394 0.960887 8.35468 0.294633 6.75567C-0.327204 5.24549 -0.0607023 3.24673 2.02689 2.35839L7.04601 0.270798H7.09042C8.82268 -0.439873 10.1996 0.359632 10.9103 1.38122C11.7986 2.58048 12.0651 4.49041 10.9103 5.86733C10.7326 6.17825 9.88869 6.71125 9.79986 6.71125C9.84427 6.71125 9.79986 6.71125 9.79986 6.71125ZM7.26809 0.5373L2.20456 2.66931C0.294633 3.46882 0.0725482 5.28991 0.649968 6.66684C1.27181 8.1326 2.8264 9.24302 4.64749 8.48793L5.98 7.91051L5.18049 6.75567L4.15891 7.19984L4.11449 7.24426C3.67032 7.42192 3.22615 7.42193 2.78198 7.28867C2.29339 7.11101 1.89364 6.71125 1.71597 6.22267C1.40506 5.42316 1.58272 4.40157 2.73756 3.91299L7.71226 1.82539C8.15643 1.60331 8.64502 1.60331 9.08918 1.73656C9.57777 1.91423 9.93311 2.31398 10.1552 2.75815C10.1996 2.80256 10.1996 2.84698 10.1996 2.93581V2.98023C10.1996 2.98023 10.1996 3.02465 10.1996 3.06907C10.244 3.1579 10.244 3.24673 10.244 3.33557C10.244 3.4244 10.244 3.51323 10.244 3.60207C10.244 3.6909 10.244 3.77974 10.1996 3.86857C10.1996 3.86857 10.1996 3.91299 10.1996 3.9574C10.1996 4.04624 10.1552 4.09066 10.1552 4.17949C10.0664 4.35716 9.97752 4.53482 9.84427 4.66807C9.79986 4.71249 9.71102 4.80133 9.66661 4.84574L9.62219 4.89016L8.95593 5.33433L9.84427 6.44475C10.0664 6.3115 10.6438 5.95617 10.8214 5.73408C11.8875 4.49041 11.621 2.71373 10.8214 1.60331C9.93311 0.359632 8.6006 0.00429693 7.26809 0.5373Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M4.77933 8.75428C4.73491 8.75428 4.73491 8.75428 4.69049 8.75428C4.64608 8.75428 4.60166 8.70986 4.60166 8.66544C4.55724 8.57661 4.64607 8.44336 4.73491 8.44336C4.77933 8.44336 4.82374 8.44336 4.82374 8.48778C4.86816 8.57661 4.86816 8.66544 4.77933 8.75428Z"
                                    fill="#42A7E4"
                                  />
                                  <path
                                    d="M4.11306 7.24486C4.02423 7.28928 3.93539 7.24486 3.93539 7.15603C3.89098 7.0672 3.93539 6.97836 4.02423 6.97836H4.06864C4.15748 6.93395 4.24631 6.97836 4.24631 7.0672C4.29073 7.15603 4.24631 7.24486 4.15748 7.24486H4.11306Z"
                                    fill="#42A7E4"
                                  />
                                </svg>
                              </button>
                              <input
                                type="text"
                                className="input-field"
                                value="https://hunchads.com/blog/..."
                              />
                              <button className="btn-copy">
                                <svg
                                  width="15"
                                  height="16"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.07071 5.81818C2.07071 5.6253 2.13882 5.44031 2.26005 5.30392C2.38129 5.16753 2.54572 5.09091 2.71717 5.09091H9.82828C9.99974 5.09091 10.1642 5.16753 10.2854 5.30392C10.4066 5.44031 10.4747 5.6253 10.4747 5.81818V13.8182C10.4747 14.0111 10.4066 14.1961 10.2854 14.3324C10.1642 14.4688 9.99974 14.5455 9.82828 14.5455H2.71717C2.54572 14.5455 2.38129 14.4688 2.26005 14.3324C2.13882 14.1961 2.07071 14.0111 2.07071 13.8182V5.81818Z"
                                    fill="#85A5C1"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.71717 16H9.82828C10.3426 16 10.8359 15.7701 11.1996 15.361C11.5633 14.9518 11.7677 14.3968 11.7677 13.8182V12.3636H13.0606C13.575 12.3636 14.0683 12.1338 14.432 11.7246C14.7957 11.3154 15 10.7605 15 10.1818V2.18182C15 1.60316 14.7957 1.04821 14.432 0.639041C14.0683 0.229871 13.575 0 13.0606 0H5.9495C5.43514 0 4.94184 0.229871 4.57814 0.639041C4.21443 1.04821 4.0101 1.60316 4.0101 2.18182V3.63636H2.71717C2.20281 3.63636 1.70952 3.86623 1.34581 4.2754C0.982107 4.68457 0.777778 5.23953 0.777778 5.81818V13.8182C0.777778 14.3968 0.982107 14.9518 1.34581 15.361C1.70952 15.7701 2.20281 16 2.71717 16ZM5.49237 1.66756C5.37114 1.80395 5.30303 1.98893 5.30303 2.18182V3.63636H9.82828C10.3426 3.63636 10.8359 3.86623 11.1996 4.2754C11.5633 4.68457 11.7677 5.23953 11.7677 5.81818V10.9091H13.0606C13.2321 10.9091 13.3965 10.8325 13.5177 10.6961C13.639 10.5597 13.7071 10.3747 13.7071 10.1818V2.18182C13.7071 1.98893 13.639 1.80395 13.5177 1.66756C13.3965 1.53117 13.2321 1.45455 13.0606 1.45455H5.9495C5.77804 1.45455 5.61361 1.53117 5.49237 1.66756ZM2.26005 5.30392C2.13882 5.44031 2.07071 5.6253 2.07071 5.81818V13.8182C2.07071 14.0111 2.13882 14.1961 2.26005 14.3324C2.38129 14.4688 2.54572 14.5455 2.71717 14.5455H9.82828C9.99974 14.5455 10.1642 14.4688 10.2854 14.3324C10.4066 14.1961 10.4747 14.0111 10.4747 13.8182V5.81818C10.4747 5.6253 10.4066 5.44031 10.2854 5.30392C10.1642 5.16753 9.99974 5.09091 9.82828 5.09091H2.71717C2.54572 5.09091 2.38129 5.16753 2.26005 5.30392Z"
                                    fill="#85A5C1"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <button className="btn-send">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.1709 6.17143L17.3213 1.18908C17.3394 0.589356 18.0872 0.288703 18.536 0.717821L27.4197 9.29741C27.7343 9.58395 27.719 10.0914 27.3877 10.3585L18.1943 18.1616C17.7204 18.5629 16.992 18.2177 17.0101 17.6179L17.1494 13.0047C15.8059 13.1488 14.552 13.388 13.4351 13.6775C10.0518 14.2158 6.0323 17.6612 4.44549 19.3166C1.66954 22.5574 0.63828 26.1279 0.315538 27.642C0.26662 27.7328 0.128221 27.7287 0.131006 27.6364C-0.616705 6.51192 17.1709 6.17143 17.1709 6.17143Z"
                              fill="#60B8FE"
                            />
                          </svg>
                        </button>
                      </div>
                      <button className="btn-bookmark" onClick = {e=> handleUnsavePost(list.post_id)}>
                      <span className="hover-info">
                        Unsave this article
                      </span>
                      <span className="d-flex align-items-center">
                        <svg
                          width="24"
                          height="30"
                          viewBox="0 0 24 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path
                              className="path-a"
                              d="M21.7972 28.694L21.935 7.22397L21.9018 3.29108C19.5024 1.50064 12.5944 1.50064 12.5944 1.50064C9.38558 1.48405 5.25207 1.50042 3.16397 3.25534L2.87844 28.8031C2.85025 29.2766 3.40154 29.5945 3.75836 29.1881L12.5944 20.4481L20.822 29.1111C21.2284 29.4679 21.769 29.1675 21.7972 28.694Z"
                              fill="#BDBDBD"
                            />
                            <path
                              className="path-b"
                              d="M12.0004 1.5005C9.60038 1.5005 7.00038 3.5005 6.00038 4.5005L2.91035 4.50062C2.91035 4.50062 2.90991 4.05001 2.91035 3.29989C5.91035 0.750013 15.0004 1.5005 12.0004 1.5005Z"
                              fill="#828282"
                            />
                            <path
                              className="path-c"
                              d="M6.05101 4.18647C5.06511 3.98522 3.89544 3.678 2.90955 3.47675L2.58512 28.8796C2.55693 29.3531 3.25309 29.6322 3.46504 29.2647L5.68377 27.1159L6.05101 4.18647Z"
                              fill="#828282"
                            />
                          </g>
                        </svg>
                        {list.postdata.bookmark_count}
                      </span>
                    </button>
                    </div>
                  </div>
                  <div>
                  {list.postdata !== null && list.postdata.user_id == JSON.parse(localStorage.getItem("user")).id ?
                    <button className="btn btn-boost boost-link" onClick = {e=>modalOpenBoost(list.postdata.title)}>
                      Boost Content
                    </button>
                    : ''}
                  </div>
                </div>
                {/* )): <p>No records found</p>
                } */}
              </div>
            </li>
                      {/* {
                        (newItem-1===i) ?
                          <Ad_Banner data={bannerlist[n-1]}/>
            
                        : null
                      } */}
                      </React.Fragment>
              )
          })
        }

        const getTotalNoOfPgeinaton = () => {
          let totalPage = 0;
          if(bookmarkList && bookmarkList.data.data){
            totalPage = Math.ceil(bookmarkList.data.total/bookmarkList.data.per_page);
          }
          return totalPage;
        }

        const handlePageChange = (event, value) => {
          showBookMarkList(JSON.parse(localStorage.getItem("user")).id,value)(dispatch)
        }

    return (
      <React.Fragment>

      <div className="wrapper d-flex justify-content-end">
      {boostModal && clickamountdata &&
      <BoostPopup
            isOpenF={closeModalBoost}
            openBoostModal={boostModal}
            title={title}
            boostcontent={clickamountdata}
        />}

          {contributeModal && <Contribute
            isOpenF={closeModalContribute}
        />}
        {/* side bar start */}
        <SideBar />
        {/* side bar end */}
        {/* main content start */}
        <div className="main-content">
          {/* header start */}
          <Header 
          itemTypeHandler={itemTypeHandler}          
          />
          {/* header end */}
          <Banner />
          {/* notification banner end */}

          {/* gallery start */}
          <section className="gallery">
            <div className="save-head d-flex flex-wrap align-items-center justify-content-between">
              <button className="btn">saved</button>
              <ul className="layout-view d-flex align-item-center">
                <li>
                  <button className="active">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.75369 0.80957H0.789062V8.99212H8.75369V0.80957Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M8.75855 8.2138C6.43402 8.2138 4.10949 8.2138 1.78496 8.2138C1.45289 8.2138 1.12081 8.2138 0.793927 8.2138C1.05336 8.47323 1.31279 8.73267 1.57223 8.9921C1.57223 6.60012 1.57223 4.20814 1.57223 1.81616C1.57223 1.47889 1.57223 1.14163 1.57223 0.809552C1.31279 1.06899 1.05336 1.32842 0.793927 1.58785C3.11845 1.58785 5.44298 1.58785 7.76751 1.58785C8.09959 1.58785 8.43166 1.58785 8.75855 1.58785C8.49911 1.32842 8.23968 1.06899 7.98025 0.809552C7.98025 3.20153 7.98025 5.59351 7.98025 7.9855C7.98025 8.32276 7.98025 8.66002 7.98025 8.9921C7.98025 9.39682 8.33827 9.79116 8.75855 9.7704C9.17883 9.74965 9.53685 9.42795 9.53685 8.9921C9.53685 6.60012 9.53685 4.20814 9.53685 1.81616C9.53685 1.47889 9.53685 1.14163 9.53685 0.809552C9.53685 0.389269 9.17883 0.03125 8.75855 0.03125C6.43402 0.03125 4.10949 0.03125 1.78496 0.03125C1.45289 0.03125 1.12081 0.03125 0.793927 0.03125C0.373644 0.03125 0.015625 0.389269 0.015625 0.809552C0.015625 3.20153 0.015625 5.59351 0.015625 7.9855C0.015625 8.32276 0.015625 8.66002 0.015625 8.9921C0.015625 9.41238 0.373644 9.7704 0.793927 9.7704C3.11845 9.7704 5.44298 9.7704 7.76751 9.7704C8.09959 9.7704 8.43166 9.7704 8.75855 9.7704C9.16327 9.7704 9.55761 9.41238 9.53685 8.9921C9.5161 8.57182 9.1944 8.2138 8.75855 8.2138Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M8.75369 13.0088H0.789062V21.1913H8.75369V13.0088Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M8.75855 20.413C6.43402 20.413 4.10949 20.413 1.78496 20.413C1.45289 20.413 1.12081 20.413 0.793927 20.413C1.05336 20.6725 1.31279 20.9319 1.57223 21.1913C1.57223 18.7993 1.57223 16.4074 1.57223 14.0154C1.57223 13.6781 1.57223 13.3408 1.57223 13.0088C1.31279 13.2682 1.05336 13.5276 0.793927 13.7871C3.11845 13.7871 5.44298 13.7871 7.76751 13.7871C8.09959 13.7871 8.43166 13.7871 8.75855 13.7871C8.49911 13.5276 8.23968 13.2682 7.98025 13.0088C7.98025 15.4008 7.98025 17.7927 7.98025 20.1847C7.98025 20.522 7.98025 20.8593 7.98025 21.1913C7.98025 21.596 8.33827 21.9904 8.75855 21.9696C9.17883 21.9489 9.53685 21.6272 9.53685 21.1913C9.53685 18.7993 9.53685 16.4074 9.53685 14.0154C9.53685 13.6781 9.53685 13.3408 9.53685 13.0088C9.53685 12.5885 9.17883 12.2305 8.75855 12.2305C6.43402 12.2305 4.10949 12.2305 1.78496 12.2305C1.45289 12.2305 1.12081 12.2305 0.793927 12.2305C0.373644 12.2305 0.015625 12.5885 0.015625 13.0088C0.015625 15.4008 0.015625 17.7927 0.015625 20.1847C0.015625 20.522 0.015625 20.8593 0.015625 21.1913C0.015625 21.6116 0.373644 21.9696 0.793927 21.9696C3.11845 21.9696 5.44298 21.9696 7.76751 21.9696C8.09959 21.9696 8.43166 21.9696 8.75855 21.9696C9.16327 21.9696 9.55761 21.6116 9.53685 21.1913C9.5161 20.771 9.1944 20.413 8.75855 20.413Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M21.2068 0.80957H13.2422V8.99212H21.2068V0.80957Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M21.2117 8.2138C18.8872 8.2138 16.5626 8.2138 14.2381 8.2138C13.906 8.2138 13.5739 8.2138 13.2471 8.2138C13.5065 8.47323 13.7659 8.73267 14.0254 8.9921C14.0254 6.60012 14.0254 4.20814 14.0254 1.81616C14.0254 1.47889 14.0254 1.14163 14.0254 0.809552C13.7659 1.06899 13.5065 1.32842 13.2471 1.58785C15.5716 1.58785 17.8961 1.58785 20.2207 1.58785C20.5527 1.58785 20.8848 1.58785 21.2117 1.58785C20.9523 1.32842 20.6928 1.06899 20.4334 0.809552C20.4334 3.20153 20.4334 5.59351 20.4334 7.9855C20.4334 8.32276 20.4334 8.66002 20.4334 8.9921C20.4334 9.39682 20.7914 9.79116 21.2117 9.7704C21.632 9.74965 21.99 9.42795 21.99 8.9921C21.99 6.60012 21.99 4.20814 21.99 1.81616C21.99 1.47889 21.99 1.14163 21.99 0.809552C21.99 0.389269 21.632 0.03125 21.2117 0.03125C18.8872 0.03125 16.5626 0.03125 14.2381 0.03125C13.906 0.03125 13.5739 0.03125 13.2471 0.03125C12.8268 0.03125 12.4688 0.389269 12.4688 0.809552C12.4688 3.20153 12.4688 5.59351 12.4688 7.9855C12.4688 8.32276 12.4688 8.66002 12.4688 8.9921C12.4688 9.41238 12.8268 9.7704 13.2471 9.7704C15.5716 9.7704 17.8961 9.7704 20.2207 9.7704C20.5527 9.7704 20.8848 9.7704 21.2117 9.7704C21.6164 9.7704 22.0107 9.41238 21.99 8.9921C21.9692 8.57182 21.6475 8.2138 21.2117 8.2138Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M21.2068 13.0088H13.2422V21.1913H21.2068V13.0088Z"
                        fill="#B1A9A5"
                      />
                      <path
                        d="M21.2117 20.413C18.8872 20.413 16.5626 20.413 14.2381 20.413C13.906 20.413 13.5739 20.413 13.2471 20.413C13.5065 20.6725 13.7659 20.9319 14.0254 21.1913C14.0254 18.7993 14.0254 16.4074 14.0254 14.0154C14.0254 13.6781 14.0254 13.3408 14.0254 13.0088C13.7659 13.2682 13.5065 13.5276 13.2471 13.7871C15.5716 13.7871 17.8961 13.7871 20.2207 13.7871C20.5527 13.7871 20.8848 13.7871 21.2117 13.7871C20.9523 13.5276 20.6928 13.2682 20.4334 13.0088C20.4334 15.4008 20.4334 17.7927 20.4334 20.1847C20.4334 20.522 20.4334 20.8593 20.4334 21.1913C20.4334 21.596 20.7914 21.9904 21.2117 21.9696C21.632 21.9489 21.99 21.6272 21.99 21.1913C21.99 18.7993 21.99 16.4074 21.99 14.0154C21.99 13.6781 21.99 13.3408 21.99 13.0088C21.99 12.5885 21.632 12.2305 21.2117 12.2305C18.8872 12.2305 16.5626 12.2305 14.2381 12.2305C13.906 12.2305 13.5739 12.2305 13.2471 12.2305C12.8268 12.2305 12.4688 12.5885 12.4688 13.0088C12.4688 15.4008 12.4688 17.7927 12.4688 20.1847C12.4688 20.522 12.4688 20.8593 12.4688 21.1913C12.4688 21.6116 12.8268 21.9696 13.2471 21.9696C15.5716 21.9696 17.8961 21.9696 20.2207 21.9696C20.5527 21.9696 20.8848 21.9696 21.2117 21.9696C21.6164 21.9696 22.0107 21.6116 21.99 21.1913C21.9692 20.771 21.6475 20.413 21.2117 20.413Z"
                        fill="#B1A9A5"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button>
                    <svg
                      width="26"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M2.44444 4.88889C3.79447 4.88889 4.88889 3.79447 4.88889 2.44444C4.88889 1.09441 3.79447 0 2.44444 0C1.09441 0 0 1.09441 0 2.44444C0 3.79447 1.09441 4.88889 2.44444 4.88889Z"
                          fill="#D8D6D6"
                        />
                        <path
                          d="M2.44444 13.4445C3.79447 13.4445 4.88889 12.3501 4.88889 11.0001C4.88889 9.65008 3.79447 8.55566 2.44444 8.55566C1.09441 8.55566 0 9.65008 0 11.0001C0 12.3501 1.09441 13.4445 2.44444 13.4445Z"
                          fill="#D8D6D6"
                        />
                        <path
                          d="M2.44444 22.0002C3.79447 22.0002 4.88889 20.9058 4.88889 19.5558C4.88889 18.2057 3.79447 17.1113 2.44444 17.1113C1.09441 17.1113 0 18.2057 0 19.5558C0 20.9058 1.09441 22.0002 2.44444 22.0002Z"
                          fill="#D8D6D6"
                        />
                        <path
                          d="M9.77648 4.88889H23.2209C23.8692 4.88889 24.491 4.63135 24.9494 4.17293C25.4078 3.71451 25.6654 3.09275 25.6654 2.44444C25.6654 1.79614 25.4078 1.17438 24.9494 0.715961C24.491 0.257539 23.8692 0 23.2209 0H9.77648C9.12817 0 8.50641 0.257539 8.04799 0.715961C7.58957 1.17438 7.33203 1.79614 7.33203 2.44444C7.33203 3.09275 7.58957 3.71451 8.04799 4.17293C8.50641 4.63135 9.12817 4.88889 9.77648 4.88889Z"
                          fill="#D8D6D6"
                        />
                        <path
                          d="M23.2209 8.55566H9.77648C9.12817 8.55566 8.50641 8.8132 8.04799 9.27163C7.58957 9.73005 7.33203 10.3518 7.33203 11.0001C7.33203 11.6484 7.58957 12.2702 8.04799 12.7286C8.50641 13.187 9.12817 13.4446 9.77648 13.4446H23.2209C23.8692 13.4446 24.491 13.187 24.9494 12.7286C25.4078 12.2702 25.6654 11.6484 25.6654 11.0001C25.6654 10.3518 25.4078 9.73005 24.9494 9.27163C24.491 8.8132 23.8692 8.55566 23.2209 8.55566Z"
                          fill="#D8D6D6"
                        />
                        <path
                          d="M23.2209 17.1113H9.77648C9.12817 17.1113 8.50641 17.3689 8.04799 17.8273C7.58957 18.2857 7.33203 18.9075 7.33203 19.5558C7.33203 20.2041 7.58957 20.8258 8.04799 21.2843C8.50641 21.7427 9.12817 22.0002 9.77648 22.0002H23.2209C23.8692 22.0002 24.491 21.7427 24.9494 21.2843C25.4078 20.8258 25.6654 20.2041 25.6654 19.5558C25.6654 18.9075 25.4078 18.2857 24.9494 17.8273C24.491 17.3689 23.8692 17.1113 23.2209 17.1113Z"
                          fill="#D8D6D6"
                        />
                      </g>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            <ul id="galleryList" ref={refContainer} className="gallery-list d-flex flex-wrap">
              { bookListUI() }
            </ul>
          </section>
          {/* gallery end */}
          {
             getTotalNoOfPgeinaton() >0 &&
                <div className={classes.root}>
                  <Pagination count={getTotalNoOfPgeinaton()} color="primary" onChange={handlePageChange}/>
                </div>
           }
        </div>
        {/* main content end */}
      </div>
      </React.Fragment>
    );
  }
export default Save;
