import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './Registration.module.scss';

const RegistrationForm = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <Field placeholder={'Login'} name={'login'} component={'input'} />
        </div>
        <div>
          <Field placeholder={'Password'} name={'password'} component={'input'} />
        </div>
        <div>
          <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
        </div>
        <div>
          <button>Sign up</button>
        </div>
      </form>
    </>
  );
};

const RegistrationReduxForm = reduxForm({ form: 'registration' })(RegistrationForm);

const Registration = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={s.registration}>
      <h1>Registration</h1>
      <RegistrationReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Registration;
