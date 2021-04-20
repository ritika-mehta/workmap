/* Sign Up Form */

import React, {Suspense,useEffect,useState} from "react";
import { useDispatch,useSelector } from 'react-redux'
import Login from "./Login";
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { BASE_URL } from "./Constants";
import { Formik,useFormik } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "./helper";
import './helper.css';
import createAccountAction from '../actions/SignUpAction';



const SignUp = (props) => {
const [loginFlag,setLoginFlag] = useState(false);
const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
// const [mobile,setMobile] = useState('');
const [errorList,setErrorList] = useState([]);



/****** Store DATA  ************/
const createAccount = useSelector(s => s.createAccount );
const Loading  = useSelector(s => s.isLoading )
const dispatch = useDispatch()
console.log("Loader",Loading)

/******** END *******/

useEffect(()=>{

    if(createAccount!==null) {
      if(createAccount.status === "success" ) {
        toast.success(`${createAccount.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
        });
        setTimeout(()=>{
          props.closeSignUp()
          props.openLoginModal()
        }
        ,5001)
      } else if(createAccount.status === "error") {
        toast.error(`${createAccount.message}`, {
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
      if(createAccount!==null)createAccount.status = null
    }

},[createAccount])


  let   error = false

  const modelOpen = (e) => {
    e.preventDefault()
    // props.isOpenF()
    //loginFlag = props.loginFlag;
    setLoginFlag(!loginFlag );
  };

  const closeModalLogIn=(e)=> {
    // const { loginFlag} = this.state
    setLoginFlag({loginFlag:!loginFlag})
  };

  const handleFormSubmission =(formValue) =>{

    window.scrollTo(0, 0);

    let formData = new FormData();
    formData.append("name",`${formValue['name']}`)
    formData.append("email",`${formValue['email']}`)
    formData.append("password",`${formValue['password']}`)
    // formData.append("mobile",`${mobile}`)
    createAccountAction(formData)(dispatch)

  }

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
  const openLoginModal = (e) => {
    e.preventDefault()
    props.closeSignUp()
    props.openLoginModal()
  }
  const closeSignUp = (e) => {
    e.preventDefault()
      props.closeSignUp()
  }


    return (<>

      <form onsubmit="return false">

      <div className="overlay sign-reg">
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


        <div className="signup-content text-center">
        { Loading ?  <Loader /> : null }
          <form>
          <button
            className="btn-close login-clg"  onClick={closeSignUp}>X</button>
            <h1>
              Create an account <img src={iconLappy} alt="img" />
            </h1>

            {/** Formic start ****/}
                <Formik
                  initialValues={{ email: "",name : "",password:"" }}
                  onSubmit={async (values,errors) => {
                    console.log("test errors",errors)
                    handleFormSubmission(values)

                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email()
                      .required("Please enter email*"),
                      name: Yup
                        .string()
                        .min(2)
                        .required("Please enter name*"),
                      password: Yup
                        .string()
                        .min(6)
                        .required('Please enter password*'),

                  })}
                  handleChange={ values =>{
                    console.log("error",values)
                  }}
                >
                  {props => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset
                    } = props;
                    return (
                      <form onSubmit={handleSubmit}>

                      <div className="form-group">
                          <input
                              name="name"
                              type="text"
                              className={`input-field ${
                                errors.name && touched.name
                                  ? "text-input error"
                                  : "text-input"
                              }`}
                              value={name}
                              onChange={ handleChange }
                              onBlur={handleBlur}
                              id="name"
                              placeholder="Name"
                              value={values.name}
                          />

                          {errors.name && touched.name && (
                            <div className="input-feedback">{errors.name}</div>
                          )}
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
                    </div>




                        <div className="form-group">
                            <input
                              id="email"
                              placeholder="Enter your email"
                              type="text"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`input-field ${
                                errors.email && touched.email
                                  ? "text-input error"
                                  : "text-input"
                              }`}
                            />
                            {errors.email && touched.email && (
                              <div className="input-feedback">{errors.email}</div>
                            )}

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
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className={`input-field ${
                              errors.password && touched.password
                                ? "text-input error"
                                : "text-input"
                            }`}
                            placeholder="Password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                          )}
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
                        </div>



                      {  /*
                        <button
                          type="button"
                          className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </button>   */}
                        <div className="login-btn-wrap">
                          <button
                            className="btn btn-default"
                            type="submit" disabled={isSubmitting}

                          >Sign up</button>
                        </div>

                        {/*<DisplayFormikState {...props} />*/}
                      </form>
                    );
                  }}
                </Formik>






              {/****            END      **/}



            {/* <div className="form-group">
              <input type="text" className="input-field"
               placeholder="Mob"
               maxLength="10"
               value={mobile}
               id="inputmobile"
               onChange={e=>setMobile(e.target.value)}
               onClick={e=>{ removeErroClass(e)} }
              />
               {
                 errorList.indexOf('errormobile') >= 0 ? <span style={{ color : "red"}}>Please enter mobile number correct </span> : null
               }
               </div> */}

            <div className="signup-link-wrap">
              <span className="signup-link">
                Have an account?<button className="btn btn-default"
                 onClick ={ openLoginModal }
                >
                   Sign in</button>
              </span>
            </div>
          </form>
          <div className="flower-pot d-none d-md-block">
            <img src={flowerPot} alt="img" />
          </div>
          <div className="idle-girl d-none d-md-block">
            <img src={idleGirl} alt="img" />
          </div>
        </div>
      </div>
      </form>
   </> );
  }

export default SignUp;
