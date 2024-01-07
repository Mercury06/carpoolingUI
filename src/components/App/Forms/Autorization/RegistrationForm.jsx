import React from 'react';
import { AiOutlineMail, AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { Link } from "react-router-dom";
import s from './autorization.module.scss';
import usePasswordTogle from './usePasswordTogle';
import { useDispatch } from 'react-redux';
import validateForm from './validateForm';

const RegistrationForm = (props) => {
  const {InputType, togleHandler, visible} = usePasswordTogle();  
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = React.useState({
    firstName: "" ,
    lastName: "" ,
    email: "" ,
    password: "" ,    
  });
  const [formError, setFormError] = React.useState({});
  ////////////////////////////////////////
  console.log("formError after state changed", formError)
  ////////////////////////////////////////
  function handleChange(e) {       
    setInputValues(prev => {
      return {...prev, [e.target.name]: e.target.value}
    });
    const value = inputValues[e.target.name];
    setFormError(validateForm(e))         
  }
  function blurHandler(e) {  
    // console.log('onBlur',e.target.name)   
    // const value = inputValues[e.target.name];
    // const value = e.target.value;
    // console.log('valuE', value)
    // console.log("validation", validateForm(value, e))
    setFormError(validateForm(e))
  }
  function LoginSubmit(e, {...inputValues}) {
    //debugger;
    e.preventDefault();
    //console.log("inputValues inside submit:", {...inputValues})
    // dispatch(login({ ...inputValues })); 
    //setErrors(validationErrors);
    //setSubmitting(true);   
  } 
 
  return (
    <>
      <div className={s.wrapper}>
        <span className={s.icon_close}><AiOutlineClose /> </span>        
        
        <div className={s.form_box_register}>
        {/* <h2>Registratien</h2> */}
        <form >
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineUser /></span>
                <input type="text" value={inputValues.firstName} onChange={handleChange} onBlur={blurHandler} name="firstName"></input>                
                <label>first name</label>
            </div>
            <center><span><span className={s.span_error}>{formError.firstName}</span>&nbsp;</span></center>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineUser /></span>
                <input type="text" value={inputValues.lastName} onChange={handleChange} onBlur={blurHandler} name="lastName"></input>
                <label>last name</label>
            </div>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineMail /></span>
                <input type="text" value={inputValues.email} onChange={handleChange} onBlur={blurHandler} name="email"></input>
                <label>email</label>
            </div>
            <div className={s.input_box}>
                <span className={s.pre_icon} onClick={togleHandler}>{visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                <span className={s.icon}><BiLockAlt /></span>
                <input type={InputType} value={inputValues.password} onChange={handleChange} onBlur={blurHandler} name="password"></input>
                <label>password</label>
            </div>            
            <div className={s.remember}>
                <label><input type="checkbox"></input>agree to the terms and conditions</label>                
            </div>
            <button type="submit" className={s.btn}>SIGN UP</button>
            {/* <div className={s.login_register}><p>already have an account?<a href="#" className={s.register_link}>Login</a></p></div> */}
            <div className={s.login_register}><p>already have an account? <Link to="/login" className={s.register_link}>Login</Link></p></div>
        </form>
        </div>
      </div>
    </>
  );
};



export default RegistrationForm;
