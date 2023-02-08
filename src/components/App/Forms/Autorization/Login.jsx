import React from 'react';
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../../api/actions';
import s from './autorization.module.scss';

const LoginForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field placeholder={'e-mail'} name={'username'} component={'input'} />
        </div>
        <div>
          <Field placeholder={'password'} name={'password'} component={'input'} />
        </div>
        <div>
          <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
        </div>
        <div>{props.error}</div>
        <div>
          <button>Sign in</button>
        </div>
      </form>
    </>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const dispatch = useDispatch();
  const onSubmit = (formData, ...props) => {
    //console.log(formData);
    dispatch(login({ ...formData }));
  };
  return (
    <div className={s.registration}>
      <center>
        <h1>Login</h1>
      </center>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
