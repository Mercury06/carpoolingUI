import React, { useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
// import { AiOutlineUser } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../api/actions';
import { Constants } from "../../../utils/constants";

import s from './autorization.module.scss';

const LoginForm = (props) => {

  const dispatch = useDispatch();

  function googleResponseHandler(res) {
    console.log("googleResponse", res)
    // setUser(response.data.user);
    // localStorage.setItem("token", response.data.token);
  }

  useEffect(() => {    
    global.google.accounts.id.initialize({
      client_id: Constants.GOOGLE_AUTH_CLIENT_ID,
      callback: googleResponseHandler
    });
    global.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large', type: "standard",}
    );
  }, []);   
 
  const [inputValues, setInputValues] = React.useState({
    password: "" ,
    username: ""    
  });

  async function handleChange(e) {       
    setInputValues(prev => {
      return {...prev, [e.target.name]: e.target.value}
    });       
  }

  function LoginSubmit(e, {...inputValues}) {
    //debugger;
    e.preventDefault();
    //console.log("inputValues inside submit:", {...inputValues})
    dispatch(login({ ...inputValues })); 
    //setErrors(validationErrors);
    //setSubmitting(true);   
  } 

  return (
    <>
      <div className={s.wrapper}>
        <span className={s.icon_close}><AiOutlineClose /> </span>
        <div className={s.form_box}>
        {/* <h2>Loginn</h2> */}
        <form onSubmit={(e)=>LoginSubmit(e, {...inputValues})}>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineMail /></span>
                <input type="email" value={inputValues.username} onChange={handleChange} name="username" required></input>
                <label>email</label>
            </div>
            <div className={s.input_box}>
                <span className={s.icon}><BiLockAlt /></span>
                <input type="password" value={inputValues.password} onChange={handleChange} name="password" required></input>
                <label>password</label>
            </div>
            <div className={s.remember}>
                <label><input type="checkbox"></input>remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className={s.btn}>SIGN IN</button>
            <div className={s.login_register}><p> or continue with </p></div>           
            <center><div id='signInDiv'>google sign in</div></center>  
            
            <div className={s.login_register}><p>Don`t have an account? <Link to="/registration" className={s.register_link}>Register</Link></p></div>
        </form>
        </div>
      </div>
    </>
  );
};


export default LoginForm;

 // useEffect(() => {
  //   window.gapi.load("auth2", function() {
  //     window.gapi.auth2.init({client_id: Constants.GOOGLE_AUTH_CLIENT_ID}).then(() => console.log('init OK'), (err) => console.log('init ERR', err))
  //     // window.gapi.auth2.init({client_id: '99588860046-ue37e5ge53vd4ev3ucc0hs0980fmdip4.apps.googleusercontent.com'}).then(() => console.log('init OK'), (err) => console.log('init ERR', err))
  //   })
  // }, []);
  // useEffect(() => {
  //   window.gapi.load("client:auth2", function() {
      
  //     window.gapi.auth2.init({client_id: '99588860046-eqtjffkvog8gv9k9r0jk4e8ambgim1ds.apps.googleusercontent.com', cookiepolicy: 'single_host_origin',}).then(() => console.log('init OK'), (err) => console.log('init ERR', err))
  //   })
  // }, []);

   // function googleSignIn () {
  //   const authOk = googleUser => {
  //     console.log("auth OK", googleUser.getBasicProfile().getName())
  //   }

  //   const authErr = (err) => console.log("auth err", err)

  //   const GoogleAuth = window.gapi.auth2.getAuthInstance()

  //   GoogleAuth.signIn({
  //     scope: 'profile email'
  //   }).then(authOk, authErr)
  // }