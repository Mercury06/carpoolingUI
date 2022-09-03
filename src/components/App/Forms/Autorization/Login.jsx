import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../../api/actions';
import s from './autorization.module.scss';

const LoginForm = (props) => {
  // const [form, setForm] = useState({ username: '', password: '' });
  // //const[response, setResponse] = useState('')

  // const changeHandler = (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  //   // console.log(form)
  // };
  // const dispatch = useDispatch();

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
    console.log(formData);
    console.log('props:', props);
    dispatch(login({ ...formData }));
  };
  return (
    <div className={s.registration}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
