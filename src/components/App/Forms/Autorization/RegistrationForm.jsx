import React from 'react';
import { AiOutlineMail, AiOutlineClose, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiLockAlt } from 'react-icons/bi';
import { Link } from "react-router-dom";
import usePasswordTogle from './usePasswordTogle';
import { useDispatch } from 'react-redux';
import validateForm from './validateForm';
import Loader from './Loader';
import { registration } from '../../../api/actions';
import s from './autorization.module.scss';

const RegistrationForm = (props) => {
  const {InputType, togleHandler, visible} = usePasswordTogle();  
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = React.useState({
    firstName: "" ,
    lastName: "" ,
    email: "" ,
    password: "" ,    
  });
  const [hasError, setHasError] = React.useState(true);
  const [submiting, setSubmiting] = React.useState(false);
  
  const [formError, setFormError] = React.useState({    
    firstName: "" ,
    lastName: "" ,
    email: "" ,
    password: "" ,    
  }); 

  React.useEffect(() => {    
    if(Object.values(formError).every(value => value === '') && Object.values(inputValues).every(value => value !== '')) { 
        setHasError(false)
    } else setHasError(true)   
  }, [inputValues, submiting]);
  ////////////////////////////////////////
  // console.log("formError after state changed", formError)
  // console.log("inputValues", inputValues)
  ////////////////////////////////////////
  function handleChange(e) { 
    // console.log("e.target.name", e.target.name)
    // console.log("e.target.value", e.target.value)       
    setInputValues(prev => {
      return {...prev, [e.target.name]: e.target.value}
    });
    const validateResult = validateForm(e);
    // console.log("Object.keys", Object.keys(validateResult)[0])
    // console.log("Object.values", Object.values(validateResult)[0])      
    setFormError(prev => {
      return {...prev, [Object.keys(validateResult)[0]]: Object.values(validateResult)[0] }
    }); 
  }
  
  function regSubmit(e, {...inputValues}) {
    //debugger;
    e.preventDefault();
    console.log("inputValues inside submit:", {...inputValues})
    console.log("errors:", formError)
    setSubmiting(true)
    dispatch(registration({...inputValues})); 
    setTimeout(() => {
      setSubmiting(false);
    }, 2000)    
    //setErrors(validationErrors);
    //setSubmitting(true);   
  } 
 
  return (
    <>
      <div className={s.wrapper}>
        <span className={s.icon_close}><AiOutlineClose /> </span>   
        <div className={s.form_box}>        
        <form onSubmit={(e)=>regSubmit(e, {...inputValues})}>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineUser /></span>
                <input type="text" value={inputValues.firstName} onChange={handleChange} name="firstName" placeholder=" "></input>                
                <label>first name</label>
            </div>
            <center><span><span className={s.span_error}>{formError.firstName}</span>&nbsp;</span></center>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineUser /></span>
                <input type="text" value={inputValues.lastName} onChange={handleChange} name="lastName" placeholder=" "></input>
                <label>last name</label>
            </div>
            <center><span><span className={s.span_error}>{formError.lastName}</span>&nbsp;</span></center>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineMail /></span>
                <input type="text" value={inputValues.email} onChange={handleChange} name="email" placeholder=" "></input>
                <label>email</label>
            </div>
            <center><span><span className={s.span_error}>{formError.email}</span>&nbsp;</span></center>
            <div className={s.input_box}>
                <span className={s.pre_icon} onClick={togleHandler}>{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
                <span className={s.icon}><BiLockAlt /></span>
                <input type={InputType} value={inputValues.password} onChange={handleChange} name="password" placeholder=" "></input>
                <label>password</label>
            </div>
            <center><span><span className={s.span_error}>{formError.password}</span>&nbsp;</span></center>            
            <div className={s.remember}>
                <label><input type="checkbox"></input>&nbsp;agree to the terms and conditions</label>                
            </div>
            <button type="submit" title={hasError ? "enter all empty fields" : "sign up"} className={s.btn} disabled={hasError ? true : false}>{ submiting ? <Loader /> : "SIGN UP"}</button>            
            <div className={s.login_register}><p>already have an account? <Link to="/login" className={s.register_link}>Login</Link></p></div>
        </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;


// const [formError, setFormError] = React.useState({
//   hasError: false,
//   completed: true,
//   firstName: "" ,
//   lastName: "" ,
//   email: "" ,
//   password: "" ,    
// });

// const validateResult = validateForm(e);
// // console.log("Object.keys", Object.keys(validateResult)[0])
// // console.log("Object.values", Object.values(validateResult)[0])      
// setFormError(prev => {
//   return {...prev, [Object.keys(validateResult)[0]]: Object.values(validateResult)[0] }
// }); 

// function blurHandler(e) {  
  //   // console.log('onBlur',e.target.name)   
  //   // const value = inputValues[e.target.name];
  //   // const value = e.target.value;
  //   // console.log('valuE', value)
  //   // console.log("validation", validateForm(value, e))
  //   const validateResult = validateForm(e);
  //   setFormError(prev => {
  //     return {...prev, [Object.keys(validateResult)[0]]: Object.values(validateResult)[0] }
  //   });       
  // }