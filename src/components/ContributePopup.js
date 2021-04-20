import React, {Suspense,useEffect,useState} from "react";
import { useDispatch,useSelector } from 'react-redux'
import addContentAction from '../actions/AddContentAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'
import contributelImg from "../assets/img/contribute-img.png";
const jwtDecode = require('jwt-decode');
const Contribute = (props) => {

  const [url,setUrl] = useState('');
  const [isLoading,setLoading] = useState(false);

  /****** Store DATA  ************/
  const isContentAdd = useSelector(s => s.isContentAdd );
  const Loading  = useSelector(s => s.isLoading )
  const dispatch = useDispatch()
  console.log("Loader",Loading)

  /******** END *******/
  let   error = false


    useEffect(()=>{

        if(isContentAdd!==null) {
          if(isContentAdd.status === "success" ) {
            toast.success(`${isContentAdd.message}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: false,
            });
            setTimeout(()=>{props.isOpenF();setLoading(false) },5000)
          } else if(isContentAdd.status === "error") {
            toast.error(`${isContentAdd.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: false,
            });
          }
        }
        return ()=>{   /***  Clean up effect hooks ***/
          if(isContentAdd!==null)isContentAdd.status = null
        }

    },[isContentAdd])



  const handleFormSubmission =(e) =>{
    e.preventDefault();
    window.scrollTo(0, 0);
    let urlRegx = /[(http(s)?):\/\/()?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

    if(url === "" || urlRegx.test(url) == false ) {
       document.getElementById('inputurl').classList.add('ErrorForm')
       error=true
    }
    if(error) {
       return;
    }
    let formData = new FormData();
    let user = {}
    formData.append("url",`${url}`)  //user_id
    console.log("form data",formData)
    if(localStorage.getItem('user') !==null) {
      user = JSON.parse(localStorage.getItem('user'))
      formData.append("user_id",user.id)
      console.log("userrrrrrr",user.id)

    } else {
      //   user not login   here you can redirect as your need
      //   this block is
    }
    addContentAction(formData)(dispatch)

  }

  const removeErroClass = (e) => {
    try {
       let Targetclass = e.target.className
       if(Targetclass.includes("ErrorForm")){
         document.getElementById(e.target.id).classList.remove('ErrorForm')
       }

    } catch(e) {
       console.log("error")
    }
  }


    return (
      <div className="overlay"
    //     onClick={e=> {
    //     props.isOpenF()
    //   }
    // }
    >
        <div className="contribute-popup d-flex flex-wrap">
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
          {
            Loading ? <Loader /> :null
          }
        <button className="btn-close"  onClick={e=> {
        props.isOpenF()
      }
      }>x</button>
          <div className="contribute-img d-flex justify-content-center align-items-center">
            <img src={contributelImg} alt="img" />
          </div>
          <form>
            <h2>Contribute Content</h2>
            <p>
            Share any article, video, podcasts, webinar & case studies.
            </p>
            <div className="form-group">
              <label className="label">
                <span>Paste your link here</span>
              </label>
              <input
                type="text"
                placeholder="paste url"
                className="input-field"
                id="inputurl"
                value={url}
                onChange={e=> setUrl(e.target.value)}
                onClick={e=> {removeErroClass(e)}}
              />
            </div>
            <div className="login-btn-wrap text-center">
              <button className="btn btn-default" onClick= {e=> handleFormSubmission(e)}>
                add Content</button>
            </div>
          </form>
        </div>
      </div>
    );
  }


export default Contribute;
