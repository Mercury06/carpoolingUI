import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
// import { AiOutlineUser } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../api/actions';



import s from './autorization.module.scss';

const LoginForm = (props) => {

  const dispatch = useDispatch();

  const [inputValues, setInputValues] = React.useState({
    password: "" ,
    username: ""
    
  });

  async function handleChange(e) {    
    // console.log("e.target.name:", e.target.name)
    // console.log("e.target.value:", e.target.value)
    setInputValues(prev => {
      return {...prev, [e.target.name]: e.target.value}
    });    
   
  }
 
  // console.log("email:", inputValues.email)
  // console.log("password:", inputValues.password)
  //console.log("inputValues:", inputValues)

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
            {/* <div className={s.login_register}><p>Don`t have an account? <a href="#" className={s.register_link}>Register</a></p></div> */}
            <div className={s.login_register}><p>Don`t have an account? <Link to="/registration" className={s.register_link}>Register</Link></p></div>
        </form>
        </div>
      </div>
    </>
  );
};



export default LoginForm;
