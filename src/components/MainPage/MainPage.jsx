import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Bookride from '../App/Forms/Search/Bookride';
import s from './mainPage.module.scss';

const SearchForm = ({ handleSubmit }) => {
  // const [form, setForm] = useState({ username: '', password: '' });
  // //const[response, setResponse] = useState('')

  // const changeHandler = (event) => {
  //   setForm({ ...form, [event.target.name]: event.target.value });
  //   // console.log(form)
  // };
  // const dispatch = useDispatch();

  return (
    <>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <Field placeholder={'e-mail'} name={'username'} component={Bookride} />
          </div>
          <div>
            <Field placeholder={'password'} name={'password'} component={'input'} />
          </div>
          <div>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
          </div>
          <div>
            <button>Search</button>
          </div>
        </form>
      </div>
    </>
  );
};

const SearchReduxForm = reduxForm({ form: 'search' })(SearchForm);

const Search = (props) => {
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={s.registration}>
      <SearchReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Search;
