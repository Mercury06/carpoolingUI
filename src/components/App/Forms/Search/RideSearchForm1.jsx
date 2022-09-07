import moment from 'moment';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import useFormValidation from '../../../../Hooks/useFormValidation';

import s from './rideSearchForm.module.scss';
import validateAuth from './validateAuth';

const initialState = {
  //можно ли поместить внутрь компоненты
  localityFrom: '',
  destination: '',
  user: '',
  date: '',
};

const RideSearchForm1 = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [modifiedDate, setModifiedDate] = useState();
  const userId = useSelector((state) => state.user.currentUser.id);

  const dispatch = useDispatch();

  React.useEffect(() => {
    initialState.user = userId;
  }, []);

  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting } =
    useFormValidation(initialState, validateAuth);

  const onChangeDateHandler = (value) => {
    setStartDate(value);
    const modifiedDate = moment(value).format('YYYY-MM-DD');
    setModifiedDate(modifiedDate);
    initialState.date = modifiedDate;
    console.log('initialState.date:', initialState.date);
    //console.log(initialState);
  };
  return (
    <>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <h3>Create ride form</h3>
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="localityFrom"
              value={values.email}
              className={errors.email && 'error-input'}
              autoComplete="off"
              placeholder="Your email address"
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={errors.password && 'error-input'}
              name="destination"
              type="password"
              placeholder="Choose a safe password"
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <div>
            <ReactDatePicker
              selected={startDate}
              onChange={onChangeDateHandler}
              dateFormat="dd MMM yyy"
              minDate={new Date()}
            />
          </div>
          <div>
            <button disabled={isSubmitting} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RideSearchForm1;
