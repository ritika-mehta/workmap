import React, { Component, useState, useEffect } from "react"
import { useDispatch,useSelector } from 'react-redux'
import SideBar from "../../components/Aside";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProfileImg from "../../assets/img/profile-img.png";
import flowerPot from "../../assets/img/flower-pot.png";
import idleGirl from "../../assets/img/idle-girl2.png";
import updateProfileAction from '../../actions/UpdateProfileAction';
// import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ImageUploader from "react-images-upload";

  const Profile = (props) => {
  const [flag,setFlag] = useState(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [Loading,setLoading] = useState(false);
  const [errorList,setErrorList] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  const [resetPwd, setResetPwd] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [imgsrc,setImgsrc] = useState(null)
  const [profileimg,setProfileimg] = useState(null)
  let error = false

  /****** Store DATA  ************/
  const isProfileUpdate = useSelector(s => s.isProfileUpdate );
  const Loading_  = useSelector(s => s.isLoading )
  const dispatch = useDispatch()
  console.log("Loader",Loading)

  /******** END *******/

  useEffect(() => {
    if(localStorage.getItem('user') !== null || localStorage.getItem('token') !== null) {
      let user  = JSON.parse(localStorage.getItem('user'))
      let token  = JSON.parse(localStorage.getItem('token'))
      setUser(user);
      setToken(token);
      setName(user.name);
      setEmail(user.email);
      console.log("userrnameee",user);
      getProfileDetail(user.id)
    } else{

  }
},[])



// const onDrop = picture => {
  // setPictures([...pictures, picture]);
  // console.log("pic",pictureFiles,pictureDataURLs)
  // setTimeout(()=>{
  
  //   try{
  
  //     let x = document.getElementsByClassName("chooseFileButton") || '';
  //     console.log("try code ",x,pictures)
  //     if(x!=="") {
  //       x[0].style.opacity = -1 ; //test
  //     }
  //     if(typeof pictures[0] == 'undefined'){
  //       x[0].style.opacity=1;
  //     }
  //     // clear buuton kaise handle kre ,,, image delte krne ke baad to upload image ka button waps ayega 
  //     // wahito delete button problem hain  n
  //   } catch(e) { console.log(e)}
  // },20)
// }

  const onDrop = picture => {
    setPictures(picture);
    console.log("imageeeee",picture)
  };

  const handlePasswordSubmission =(e) =>{
    e.preventDefault();

    let tempErrorList  = []

    if(oldPassword.length < 6) {
       tempErrorList.push('errorpass')
       document.getElementById('old_password').classList.add('ErrorForm')
       error=true
    }

    if(newPassword !== '' && confirmPassword !== '') {
      console.log("new",newPassword,confirmPassword)
      if(newPassword !== confirmPassword) {
        tempErrorList.push('errorpass')
         document.getElementById('confrmnewpass').classList.add('ErrorForm')
        error=true
      }
    }

    console.log("eroror",error)
    if(error) {
      setErrorList(tempErrorList)
       return;
    }
    let user = {}
    let formData = new FormData();
    if(localStorage.getItem('user') !==null ) {
        user = JSON.parse(localStorage.getItem('user'))
        formData.append("user_id",user.id)
        console.log("userrrrrrr",user)
  
      } else {
        //   user not login   here you can redirect as your need
        //   this block is
      }

    formData.append("old_password",`${oldPassword}`)
    formData.append("password",`${newPassword}`)
    formData.append("confrmnewpass",`${confirmPassword}`)
    console.log("resultssss",formData)

      axios.post("http://made.inworkmap.com/admin/public/api/v1/changePassword",formData,{
      })
      .then(response=> {
        console.log(response)
      .catch(er=>console.log("error",er))
      return 
     })
      .then(response=>{
        console.log("res",response)
          if(response.status === "success") {
             //  setSaveDate(false)
              setLoading(false)
              toast.success(`${response.message}`, {
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: true,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: false,
                 resetPwd: false,
                 });
                 setTimeout(()=>{ 
                 }
                 ,3001)
                 console.log("responseeeee",response)

             } else {
                 setLoading(false)
                 toast.error(`${response.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                    });
       }

      })
      .catch(error=>{
        toast.error(`some thing happing wrong!`, {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: false,
           });

      })

   }


   const modelResetPwdClose = (e) => {
    // e.preventDefault();
    setResetPwd(!resetPwd)
  }

  const modelResetPwdOpen = (e) => {
    e.preventDefault();
    setResetPwd(!resetPwd)
  };


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

  
  const handleFormSubmission =(e) =>{
    e.preventDefault();
    window.scrollTo(0, 0);
    let emailRegx = /[\w-]+@([\w-]+\.)+[\w-]+/g
    let tempErrorList  = []
    if(name === "") {
       document.getElementById('inputname').classList.add('ErrorForm');
       tempErrorList.push('emptyname')
       error=true
    }

    if(email === "" ) {
       document.getElementById('inputemail').classList.add('ErrorForm')
       tempErrorList.push('emptyEmail')

       error=true
    }

    if(email !== "" && emailRegx.test(email) == false ) {
       document.getElementById('inputemail').classList.add('ErrorForm')
       tempErrorList.push('invalidEmail')
       let i  = tempErrorList.indexOf('emptyEmail');
       tempErrorList = [...tempErrorList.slice(0,i),...tempErrorList.slice(i+1,tempErrorList.length)]
       error=true
    }

    // if(password.length < 6) {
    //    tempErrorList.push('errorpass')
    //    document.getElementById('inputpassword').classList.add('ErrorForm')
    //    error=true
    // }

    console.log("eroror",error)
    if(error) {
      setErrorList(tempErrorList)
       return;
    }
    let user = {}
    let formData = new FormData();
    let token = ''
    if(localStorage.getItem('user') !==null && localStorage.getItem('token') != null) {
        user = JSON.parse(localStorage.getItem('user'))
        token = JSON.parse(localStorage.getItem('token'))
        // formData.append("token",token)
        formData.append("user_id",user.id)
        // console.log("userrrrrrr",user)

    } else {
      //   user not login   here you can redirect as your need
      //   this block is
    }

    if(profileimg){
      formData.append("profile_img",profileimg,profileimg.name)
    }

    formData.append("name",`${name}`)
    formData.append("email",`${email}`)
    formData.append("password",`${user.password}`)
    



      axios.post("http://made.inworkmap.com/admin/public/api/v1/updateProfile",formData,{
        headers: {
          'Authorization': `Bearer ${token}`,
          
        }
      })
      .then(response=> {
        console.log(response)
      .catch(er=>console.log("error",er))
      return
     })
      .then(response=>{
        console.log("res",response)
          if(response.status === "success") {
             //  setSaveDate(false)
              setLoading(false)
              toast.success(`${response.message}`, {
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: true,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: false,
                 });
                 setTimeout(()=>{
                 }
                 ,3001)
                 console.log("responseeeee",response)

             } else {
                 setLoading(false)
                 toast.error(`${response.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                    });
       }

      })
      .catch(error=>{
        toast.error(`some thing happing wrong!`, {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: false,
           });

      })

   }
  //  updateProfile();


  const removeErroClass = (e) => {
    try {
       let Targetclass = e.target.className
       if(Targetclass.includes("ErrorForm") || Targetclass.includes("errmsg")){
         document.getElementById(e.target.id).classList.remove('ErrorForm')
         document.getElementById(e.target.id).classList.remove('errmsg')
        }

    } catch(e) {
       console.log("error")
    }
  }

  const handeImg = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgsrc(reader.result)
      setProfileimg(file)
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  return (
    <>
    <div className="wrapper d-flex justify-content-end">
       {resetPwd && (
        <div className="overlay">
          <div className="change-pwd-popup">
            <form>
            <button className="btn-close login-clg"
              style = {{
                cursor :"pointer"
              }}
              onClick= {modelResetPwdClose}>
                X
                </button>
              <h2>Change password</h2>
              <div className="current-pwd">
                <div className="form-group">
                  <label className="label">
                    <span>Current password</span>
                  </label>
                  <input
                    id="old_password"
                    type="password"
                    className="input-field"
                    onChange={e=>setOldPassword(e.target.value)}
                    onClick={e=>{ removeErroClass(e)} }
                  />
                  <button className="hide-pwd">
                    <svg
                      width="24"
                      height="10"
                      viewBox="0 0 24 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.3131 1.32289C23.1912 1.45339 23.0614 1.59439 22.9238 1.74401C22.4956 2.20976 21.9826 2.76664 21.3829 3.34901L22.5829 4.48376C22.6562 4.55099 22.7154 4.63212 22.757 4.72243C22.7987 4.81274 22.8219 4.91043 22.8255 5.00981C22.829 5.1092 22.8127 5.20829 22.7776 5.30133C22.7425 5.39436 22.6892 5.47949 22.6209 5.55174C22.5525 5.624 22.4705 5.68194 22.3796 5.72221C22.2887 5.76247 22.1906 5.78425 22.0912 5.78628C21.9918 5.7883 21.893 5.77054 21.8005 5.73401C21.708 5.69748 21.6237 5.64293 21.5524 5.57351L20.2677 4.35926C19.4409 5.06284 18.5428 5.67794 17.5879 6.19452L18.3211 7.70314C18.408 7.88216 18.4202 8.08838 18.3551 8.27643C18.29 8.46449 18.1528 8.61897 17.9738 8.70589C17.7948 8.79281 17.5886 8.80506 17.4005 8.73994C17.2125 8.67482 17.058 8.53766 16.9711 8.35864L16.2244 6.82339C15.1132 7.25818 13.9413 7.51814 12.7504 7.59401V9.18964C12.7504 9.38855 12.6714 9.57932 12.5308 9.71997C12.3901 9.86062 12.1994 9.93964 12.0004 9.93964C11.8015 9.93964 11.6108 9.86062 11.4701 9.71997C11.3295 9.57932 11.2504 9.38855 11.2504 9.18964V7.59401C10.0591 7.51822 8.88668 7.25826 7.77495 6.82339L7.02907 8.35864C6.98603 8.44728 6.92595 8.52658 6.85227 8.592C6.77858 8.65743 6.69273 8.7077 6.59962 8.73994C6.5065 8.77219 6.40795 8.78578 6.30958 8.77993C6.21122 8.77409 6.11496 8.74893 6.02632 8.70589C5.93768 8.66285 5.85838 8.60277 5.79296 8.52908C5.72754 8.4554 5.67727 8.36955 5.64502 8.27643C5.61278 8.18332 5.59919 8.08477 5.60503 7.9864C5.61087 7.88803 5.63603 7.79178 5.67907 7.70314L6.41295 6.19452C5.4579 5.6781 4.55961 5.06298 3.73282 4.35926L2.44807 5.57351C2.30294 5.70665 2.11127 5.77736 1.91444 5.77037C1.71762 5.76338 1.53145 5.67925 1.39613 5.53615C1.26081 5.39306 1.18721 5.20247 1.19122 5.00557C1.19523 4.80866 1.27654 4.62123 1.41757 4.48376L2.61795 3.35014C2.01795 2.76739 1.50495 2.21051 1.0767 1.74439C0.939197 1.59439 0.809572 1.45414 0.687822 1.32364C0.617681 1.25229 0.562524 1.16763 0.5256 1.07464C0.488676 0.981652 0.47073 0.882215 0.47282 0.782185C0.47491 0.682155 0.496993 0.583554 0.537769 0.492189C0.578545 0.400823 0.63719 0.31854 0.71025 0.250184C0.78331 0.181828 0.869308 0.128781 0.963182 0.0941662C1.05705 0.0595517 1.1569 0.0440697 1.25685 0.0486316C1.3568 0.0531935 1.45482 0.0777067 1.54515 0.120729C1.63548 0.163751 1.71629 0.224412 1.78282 0.299139C1.90732 0.431889 2.04007 0.576264 2.1807 0.728889C4.03507 2.74489 7.13895 6.12026 12.0004 6.12026C16.8619 6.12026 19.9651 2.74526 21.8198 0.728889C21.9608 0.575514 22.0932 0.431139 22.2181 0.298389C22.3553 0.158831 22.5416 0.0784279 22.7372 0.07434C22.9329 0.0702522 23.1224 0.142804 23.2653 0.276509C23.4082 0.410215 23.4932 0.594481 23.5021 0.78998C23.511 0.985478 23.4432 1.17672 23.3131 1.32289Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="label">
                  <span>New password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  onChange={e=>setNewPassword(e.target.value)}
                  onClick={e=>{ removeErroClass(e)} }
                />
                <button className="show-pwd">
                  <svg
                    width="22"
                    height="14"
                    viewBox="0 0 22 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2553 13.7997C7.40027 13.7997 3.72527 11.9547 1.43027 8.84969C0.605273 7.73969 0.605273 6.23969 1.43027 5.12969C3.72527 2.03969 7.40027 0.179688 11.2553 0.179688C15.1103 0.179688 18.7853 2.02469 21.0803 5.12969C21.9053 6.23969 21.9053 7.73969 21.0803 8.84969C18.7853 11.9397 15.1103 13.7997 11.2553 13.7997ZM11.2553 1.69469C7.82027 1.69469 4.68527 3.26969 2.63027 6.02969C2.19527 6.59969 2.19527 7.37969 2.63027 7.96469C4.68527 10.7247 7.82027 12.2997 11.2553 12.2997C14.6903 12.2997 17.8253 10.7247 19.8803 7.96469C20.3153 7.39469 20.3153 6.61469 19.8803 6.02969C17.8253 3.26969 14.6903 1.69469 11.2553 1.69469Z"
                      fill="#BDBDBD"
                    />
                    <path
                      d="M11.1506 10.6195C9.12559 10.6195 7.47559 8.96953 7.47559 6.94453C7.47559 4.91953 9.12559 3.26953 11.1506 3.26953C13.1756 3.26953 14.8256 4.91953 14.8256 6.94453C14.8256 8.96953 13.1756 10.6195 11.1506 10.6195ZM11.1506 4.78453C9.9506 4.78453 8.97559 5.75953 8.97559 6.95953C8.97559 8.15953 9.9506 9.11953 11.1506 9.11953C12.3506 9.11953 13.3256 8.14453 13.3256 6.94453C13.3256 5.74453 12.3506 4.78453 11.1506 4.78453Z"
                      fill="#BDBDBD"
                    />
                    <path
                      d="M11.1506 4.78453C9.9506 4.78453 8.97559 5.75953 8.97559 6.95953C8.97559 8.15953 9.9506 9.11953 11.1506 9.11953C12.3506 9.11953 13.3256 8.14453 13.3256 6.94453C13.3256 5.74453 12.3506 4.78453 11.1506 4.78453Z"
                      fill="#BDBDBD"
                    />
                  </svg>
                </button>
              </div>
              <div className="form-group">
              <label className="label">
                  <span>Confirm Password</span>
                </label>                  
                <input
                  id="confrmnewpass"
                  type="password"
                  placeholder="same as new password"
                  className="input-field"
                  onChange={e=>setConfirmPassword(e.target.value)}
                  onClick={e=>{ removeErroClass(e)} }
                />
              </div>
              <div className="login-btn-wrap text-center">
                <button
                  onClick={e => handlePasswordSubmission(e)}
                  className="btn btn-default"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* change password popup end */}

      {/* side bar start */}
      <SideBar />
      {/* side bar end */}
      {/* main content start */}
      <div className="main-content profile-content-wrap">
        {/* header start */}
        <Header />
        {/* header end */}
        {/* notification banner start */}
        <Banner />
        {/* notification banner end */}
        {/* profile section start */}
        <div className="profile-sec text-center">
          <form>
            <div className="profile-wrap">
              {props.flag ? (
                <figure className="profile-img">
                  <div className="profile-pic">
  

                  {/* <button className="btn-delete">
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.70312 4.91211H1.88381L2.49756 21.4833C2.54184 22.679 3.5422 23.6434 4.74064 23.6434H15.5406C16.7385 23.6434 17.7394 22.6808 17.7837 21.4833L18.3975 4.91211H18.5781C19.0441 4.91211 19.4219 4.53435 19.4219 4.06836C19.4219 3.60237 19.0441 3.22461 18.5781 3.22461H1.70312C1.23713 3.22461 0.859375 3.60237 0.859375 4.06836C0.859375 4.53435 1.23713 4.91211 1.70312 4.91211ZM9.46624 19.4257V7.95071C9.46624 7.57791 9.76844 7.27571 10.1412 7.27571C10.514 7.27571 10.8162 7.57791 10.8162 7.95071V19.4257C10.8162 19.7985 10.514 20.1007 10.1412 20.1007C9.76844 20.1007 9.46624 19.7985 9.46624 19.4257ZM5.75127 7.97056L6.08877 19.4456C6.09973 19.8182 6.41069 20.1114 6.78332 20.1004C7.15596 20.0895 7.44915 19.7785 7.43819 19.4059L7.10069 7.93087C7.08973 7.55824 6.77877 7.26504 6.40614 7.276C6.0335 7.28696 5.74031 7.59792 5.75127 7.97056ZM12.8428 19.4059L13.1803 7.93087C13.1913 7.55824 13.5022 7.26504 13.8749 7.276C14.2475 7.28696 14.5407 7.59792 14.5297 7.97056L14.1922 19.4456C14.1813 19.8182 13.8703 20.1114 13.4977 20.1004C13.1251 20.0895 12.8319 19.7785 12.8428 19.4059Z"
                          fill="white"
                        />
                        <path
                          d="M7.57374 3.79351L7.92508 2.56383C8.00033 2.30045 8.34174 2.04297 8.61584 2.04297H11.6591C11.9333 2.04297 12.2745 2.30023 12.3498 2.56383L12.7012 3.79351L14.3237 3.32992L13.9724 2.10023C13.6901 1.11209 12.6867 0.355469 11.6591 0.355469H8.61584C7.58836 0.355469 6.58476 1.11236 6.30251 2.10023L5.95117 3.32992L7.57374 3.79351Z"
                          fill="white"
                        />
                      </svg>
                    </button> */}
                    {/* <button className="btn-cam">
                      <svg
                        width="25"
                        height="22"
                        viewBox="0 0 25 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.1996 4.73629C22.5745 4.11134 21.8205 3.79878 20.9371 3.79878H18.1371L17.4997 2.09888C17.3413 1.69061 17.0518 1.33847 16.6308 1.0425C16.2099 0.746661 15.7787 0.598633 15.337 0.598633H8.93681C8.49514 0.598633 8.06384 0.746661 7.64296 1.0425C7.22207 1.33847 6.93259 1.69061 6.77422 2.09888L6.13675 3.79878H3.33673C2.45325 3.79878 1.69923 4.11134 1.07414 4.73629C0.449194 5.36129 0.136719 6.11539 0.136719 6.99879V18.1989C0.136719 19.0823 0.449194 19.8365 1.07414 20.4614C1.69923 21.0864 2.45329 21.399 3.33673 21.399H20.9368C21.8202 21.399 22.5741 21.0864 23.1992 20.4614C23.8242 19.8365 24.1367 19.0823 24.1367 18.1989V6.99879C24.1369 6.11539 23.8243 5.36129 23.1996 4.73629ZM16.0931 16.5553C14.9972 17.6511 13.6786 18.1992 12.1368 18.1992C10.595 18.1992 9.27643 17.6511 8.18052 16.5553C7.0846 15.4596 6.53675 14.1406 6.53675 12.5992C6.53675 11.0573 7.08477 9.73874 8.18052 8.64282C9.2763 7.5469 10.595 6.99906 12.1368 6.99906C13.6785 6.99906 14.9972 7.54704 16.0931 8.64282C17.1889 9.73861 17.7369 11.0573 17.7369 12.5992C17.7369 14.1406 17.189 15.4594 16.0931 16.5553Z"
                          fill="white"
                        />
                        <path
                          d="M12.1353 8.99902C11.1436 8.99902 10.2956 9.35112 9.59145 10.0554C8.88725 10.7596 8.53516 11.6074 8.53516 12.5993C8.53516 13.5909 8.88725 14.4388 9.59145 15.143C10.2956 15.8471 11.1435 16.1992 12.1353 16.1992C13.1269 16.1992 13.9749 15.8471 14.6791 15.143C15.3833 14.4388 15.7354 13.5909 15.7354 12.5993C15.7354 11.6075 15.3833 10.7596 14.6791 10.0554C13.9749 9.35117 13.1269 8.99902 12.1353 8.99902Z"
                          fill="white"
                        />
                      </svg>
                    </button> */}
                  </div>

                  <figcaption className="profile-title">
                    My profile
                  </figcaption>
                </figure>
              ) : (
                <div className="profile-info">
                  <span className="influencer-name d-flex align-items-center justify-content-center">
                     <div class="full-profile-wrap">
                       <div class="choose-file-wrap">

                         <input type="file" onChange={handeImg}/>
                         {
                           !imgsrc &&
                             <span>Choose your <br/> profile image</span>
                         }
                        </div>
                         {
                           imgsrc &&
                             <img src={imgsrc}/>
                         }
                      </div> 
                  </span>
                  <span className="profile-title"> My profile</span>
                  <br />
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="input-field"
                value={name}
                id="inputname"
                onChange={e=>setName(e.target.value)}
                onClick={e=>{ removeErroClass(e)} }
              />
            {
              errorList.indexOf('emptyname') >= 0 ? <span style={{ color : "red"}}>Please enter name . </span> : null
            }
              <svg
                className="icon-avatar"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2007 17.2285C18.783 14.9469 15.0379 12.3152 11.5046 11.3179C13.443 10.3497 14.7736 8.34928 14.7736 6.03595C14.7736 2.77556 12.1317 0.132812 8.87089 0.132812C5.61089 0.132812 2.96853 2.77517 2.96853 6.03595C2.96853 8.34693 4.29834 10.3473 6.23285 11.3156C2.69716 12.3112 -1.0546 14.9458 0.529712 17.2285C2.90501 20.6528 14.8246 20.6528 17.2007 17.2285Z"
                  fill="#85A5C2"
                />
              </svg>
              <button className="btn-edit">
                <svg
                  className="icon-edit"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      opacity="0.6"
                      d="M12.2222 -0.00258039L9.87305 2.34961L13.6346 6.116L15.9838 3.76381L12.2222 -0.00258039Z"
                      fill="#5868B0"
                    />
                    <path
                      opacity="0.6"
                      d="M12.6981 7.06164L8.92739 3.28613L0.93758 11.2861L0 16.0004L4.70828 15.0616L12.6981 7.06164Z"
                      fill="#5868B0"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="input-field"
                value={email}
                id="inputemail"
                onChange={e=>setEmail(e.target.value)}
                onClick={e=>{ removeErroClass(e)} }
                // readOnly
                // disabled
              />
             {
               errorList.indexOf('emptyEmail') >= 0 ? <span style={{ color : "red"}}>Please enter email. </span> : null
             }
             {
               errorList.indexOf('invalidEmail') >= 0 ? <span style={{ color : "red"}}>Please enter valid email. </span> : null
             }
               <svg
                className="icon-mail"
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.53846 0C1.23605 0 0.958487 0.093131 0.721154 0.248413L9.38303 8.45354C9.76246 8.81321 10.2542 8.81318 10.633 8.45354L19.2788 0.248413C19.0415 0.093131 18.764 0 18.4615 0H1.53846ZM0.0961539 1.05769C0.0375641 1.22708 0 1.40372 0 1.59457V12.2516C0 12.5754 0.0901794 12.8738 0.24841 13.125L6.37021 7.01123L0.0961539 1.05769ZM19.9038 1.05769L13.6458 7.00321L19.7516 13.125C19.9098 12.8738 20 12.5754 20 12.2516V1.59457C20 1.40372 19.9624 1.22708 19.9038 1.05769ZM12.9006 7.71636L11.3382 9.19872C10.5941 9.90515 9.42205 9.90415 8.6779 9.19872L7.11539 7.72436L1.05769 13.766C1.20921 13.8176 1.36995 13.8462 1.53846 13.8462H18.4615C18.6301 13.8462 18.7908 13.8176 18.9423 13.766L12.9006 7.71636Z"
                  fill="#85A5C2"
                />
              </svg>

              <button className="btn-edit">
                <svg
                  className="icon-edit"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      opacity="0.6"
                      d="M12.2222 -0.00258039L9.87305 2.34961L13.6346 6.116L15.9838 3.76381L12.2222 -0.00258039Z"
                      fill="#5868B0"
                    />
                    <path
                      opacity="0.6"
                      d="M12.6981 7.06164L8.92739 3.28613L0.93758 11.2861L0 16.0004L4.70828 15.0616L12.6981 7.06164Z"
                      fill="#5868B0"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="input-field"
                placeholder="*************"
                id="inputpassword"
                value={user.password}
                readOnly
                disabled
              />
              <svg
                className="icon-key"
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.53542 6.10974H14.13V7.89974C14.13 8.07266 14.2676 8.24974 14.48 8.24974H15.5C15.6729 8.24974 15.85 8.11216 15.85 7.89974V7.15974C15.85 7.14881 15.8548 7.13511 15.8647 7.12458C15.8731 7.11556 15.8841 7.10974 15.9 7.10974H16.68C16.6909 7.10974 16.7046 7.11457 16.7152 7.12439C16.7242 7.13281 16.73 7.14386 16.73 7.15974V7.89974C16.73 8.07266 16.8676 8.24974 17.08 8.24974H18.1C18.2729 8.24974 18.45 8.11216 18.45 7.89974V6.10974H18.58C19.2028 6.10974 19.69 5.62258 19.69 4.99974H19.6904L19.6896 4.98823C19.6442 4.39873 19.1668 3.88974 18.54 3.88974H8.51666C8.04066 2.12233 6.4296 0.829736 4.52 0.829736C2.21716 0.829736 0.35 2.69689 0.35 4.99974C0.35 7.30258 2.21716 9.16973 4.52 9.16973C6.43041 9.16973 8.04087 7.87636 8.53542 6.10974ZM4.52 6.94974C3.44284 6.94974 2.57 6.07689 2.57 4.99974C2.57 3.92258 3.44284 3.04974 4.52 3.04974C5.59716 3.04974 6.47 3.92258 6.47 4.99974C6.47 6.07689 5.59716 6.94974 4.52 6.94974Z"
                  fill="#85A5C1"
                  stroke="#85A5C1"
                  stroke-width="0.3"
                />
              </svg>
               <button className="btn-edit" onClick={modelResetPwdOpen}>
                <svg
                  className="icon-edit"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      opacity="0.6"
                      d="M12.2222 -0.00258039L9.87305 2.34961L13.6346 6.116L15.9838 3.76381L12.2222 -0.00258039Z"
                      fill="#5868B0"
                    />
                    <path
                      opacity="0.6"
                      d="M12.6981 7.06164L8.92739 3.28613L0.93758 11.2861L0 16.0004L4.70828 15.0616L12.6981 7.06164Z"
                      fill="#5868B0"
                    />
                  </g>
                </svg>
              </button> 
            </div>
            <div className="login-btn-wrap">
              <button className="btn">cancel</button>
              <button className="btn btn-default" onClick ={ e =>handleFormSubmission(e)}>
                save changes
              </button>
            </div>
          </form>
          <div className="flower-pot d-none d-lg-block">
            <img src={flowerPot} alt="img" />
          </div>
          <div className="idle-girl d-none d-lg-block">
            <img src={idleGirl} alt="img" />
          </div>
        </div>
        {/* profile section end */}
      </div>
      {/* main content end */}
    </div>
  </>
  );

}

export default Profile;