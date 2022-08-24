import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { Field, reduxForm } from 'redux-form';
import { login } from './../../../api/actions';
import s from './autorization.module.scss';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  //const[response, setResponse] = useState('')

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    // console.log(form)
  };
  const dispatch = useDispatch();

  return (
    <div className="authorization">
      <div className="authorization__header">
        <h4>Login</h4>
      </div>
      <input
        onChange={changeHandler}
        type="text"
        name="username"
        placeholder="Username"
        autoFocus="autofocus"
      />
      <br></br>
      <input onChange={changeHandler} type="password" name="password" placeholder="Password" />{' '}
      <br></br>
      <button className="authorization__btn" onClick={() => dispatch(login({ ...form }))}>
        Sign in
      </button>
      {/* <button className="authorization__btn" onClick={() => login({...form})}>Sign in</button> */}
      {/* { response && <div className="authorization_response">{response}</div>} 
              <div><NavLink to="/registration">Don`t have an account? Register</NavLink></div> */}
    </div>
  );
};

export default Login;
