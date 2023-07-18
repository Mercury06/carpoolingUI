import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { BiLockAlt } from 'react-icons/bi';

import s from './autorization.module.scss';

const RegistrationForm = (props) => {
  return (
    <>
      <div className={s.wrapper}>
        <span className={s.icon_close}><AiOutlineClose /> </span>        
        
        <div className={s.form_box_register}>
        {/* <h2>Registratien</h2> */}
        <form >
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineUser /></span>
                <input type="text" required></input>
                <label>username</label>
            </div>
            <div className={s.input_box}>
                <span className={s.icon}><AiOutlineMail /></span>
                <input type="text" required></input>
                <label>email</label>
            </div>
            <div className={s.input_box}>
                <span className={s.icon}><BiLockAlt /></span>
                <input type="password" required></input>
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
