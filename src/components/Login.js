import React, {Suspense,useEffect,useState} from "react";
import { useDispatch,useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'
import userLoginAction from '../actions/loginAction';
import Cookies from 'js-cookie'
import { Formik,useFormik } from "formik";
import * as Yup from "yup";
import { DisplayFormikState } from "./helper";
import './helper.css';

const Login = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setLoading] = useState(false);
  const [signupModal,setSignup] = useState(false);
  const [errorList,setErrorList] = useState([]);

  /**** Store DATA and Acation **********/
  const dispatch    = useDispatch() // creating dispatch
  const isLoading_  = useSelector(s => s.isLoading ) // getting store data
  const isLoggedIn  = useSelector(s => s.isLoggedIn ) // getting store data
  /******************** END ************/
  let   error = false

  const handleFormSubmission = async (values) =>{

    window.scrollTo(0, 0);
    let formData = new FormData();
    formData.append("email",`${values['email']}`)
    formData.append("password",`${values['password']}`)
    await userLoginAction(formData)(dispatch)
  }

  useEffect(()=>{

      if(isLoggedIn!==null) {
        if(isLoggedIn.status === "success" ) {
          toast.success(`${isLoggedIn.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
          });
          setTimeout(()=>{
            props.isOpenF();
            window.location.href = "/"
          },5000);
        } else if(isLoggedIn.status === "error") {
          toast.error(`${isLoggedIn.message}`, {
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
        if(isLoggedIn!==null)isLoggedIn.status = null
      }

  },[isLoggedIn])


  /*** close login modal and open signup modal ***/
  const openSignup = (e) => {
    e.preventDefault()
    props.isOpenF() // closing login modal
    props.openSignupModal() // open signup modal
  }


  const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });



    return (
        <React.Fragment>


        <form onsubmit="return false">

        <div className="overlay log-reg">
                  <ToastContainer
                      position="top-right"
                      autoClose={4000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                  />


        <div className="popup-content text-center log-p">
        {
          isLoading_? <Loader /> :null
        }

          <form>
              <button className="btn-close login-clg"
                style = {{
                  cursor :"pointer"
                }}
                onClick={e=> {
                props.isOpenF()
              }
            }>X</button>
            <div className="workmapLogo">
            <img src={workmapLogo} alt="img" />
            </div>
            <h1>Welcome Back</h1>


            <Formik
                initialValues={{ email: "",password:"" }}
                onSubmit={async values => {
                  handleFormSubmission(values)
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required("Please enter email*"),
                    password: Yup
                      .string()
                      .min(6)
                      .required('Please enter password*'),
                })}
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
                          id="email"
                          placeholder="Enter Email"
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
                    </div>


                      <div className="login-btn-wrap">
                      <button className="btn btn-default"

                      type="submit" disabled={isSubmitting}>Login</button>
                      </div>

                    </form>
                  );
                }}
              </Formik>

            <div className="signup-link-wrap">
              <span className="signup-link">
                Need an account? <a href="#"
                onClick = { openSignup }
                > Sign up here.</a>
              </span>
              <span className="frgt-pwd">
                <a href="/">Forgot password?</a>
              </span>
            </div>
          </form>
        </div>
      </div>
      </form>
      </React.Fragment>
    );
  }


export default Login;
