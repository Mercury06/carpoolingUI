import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { setSuggestedRides } from '../../../../reducers/rideReducer';
import { findLocality } from '../../../api/actions';
import Bookride from './Bookride';
import s from './rideSearchForm.module.scss';

// в эту форму поиска поездки входит localities, date
const RideSearchForm = (props) => {
  return (
    <>
      <div className={s.container}>
        <form onSubmit={props.handleSubmit}>
          <div>
            <Field placeholder={'From'} name={'fromLocality'} component={'input'} />
          </div>
          <div>
            <Field placeholder={'to'} name={'toLocality'} component={'input'} />
          </div>
          <div>
            <Field name={'date'} component={ReactDatePicker} />
          </div>
          <div>
            <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
          </div>
          <div>{props.error}</div>
          <div>
            <button>Search</button>
          </div>
        </form>
      </div>
    </>
  );
};

const SearchReduxForm = reduxForm({ form: 'search' })(RideSearchForm);

const Search = (props) => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    let search = e.fromLocality;
    console.log('search:', search);
    if (!search) {
      dispatch(setSuggestedRides([]));
    } else {
      dispatch(findLocality(search));
    }
  };
  const onSubmit = (formData, ...props) => {
    console.log('formData:', formData);
    console.log('props:', props);
  };
  return (
    <div className={s.registration}>
      <SearchReduxForm onSubmit={onSubmit} onChange={onChange} />
    </div>
  );
};

export default Search;
