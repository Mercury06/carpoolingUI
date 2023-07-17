import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

import { BiLockAlt } from 'react-icons/bi';

import s from './autorization.module.scss';

const LoginForm = (props) => {
  return (
    <>
      <div className={s.wrapper}>
        <span className={s.icon_close}><AiOutlineClose /> </span>
        <div className={s.form_box}>
        <h2>Loginn</h2>
        <form >
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineMail /></span>
                <input type="email" required></input>
                <label>email</label>
            </div>
            <div className={s.input_box}>
                <span className={s.icon}><BiLockAlt /></span>
                <input type="password" required></input>
                <label>password</label>
            </div>
            <div className={s.remember}>
                <label><input type="checkbox"></input>remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className={s.btn}>Login</button>
            <div className={s.login_register}><p>Don`t have an account?<a href="#" className={s.register_link}>Register</a></p></div>
        </form>
        </div>
        
      </div>
    </>
  );
};



export default LoginForm;
