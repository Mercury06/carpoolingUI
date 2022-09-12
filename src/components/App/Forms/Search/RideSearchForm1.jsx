import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import useFormValidation from '../../../../Hooks/useFormValidation';
// import { setSuggestedRides } from '../../../../reducers/rideReducer';
// import { findLocality } from '../../../api/actions';

import s from './rideSearchForm.module.scss';
import validateAuth from './validateAuth';

const initialState = {
  localityFrom: '',
  destination: '',
  user: '',
  date: '',
};

const RideSearchForm1 = (props) => {
  const userId = useSelector((state) => state.user.currentUser.id);
  const suggestedRides = useSelector((state) => state.ride.suggestedRides);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    initialState.user = userId;
    initialState.date = modifiedInitialStateDate;
    console.log('suggestedRides:', suggestedRides);
  }, [suggestedRides]);

  // const searchHandler = (e) => {
  // let search = e.target.value;
  // if (search === 0) {
  //   dispatch(setSuggestedRides([]));
  //   return;
  // }
  //setForm({ ...form, [e.target.name]: e.target.value })
  // setFromInputValue(search);
  // console.log(inputValue)
  //   dispatch(findLocality(search));
  // };

  // const onSuggestSelect = (e, { item }) => {
  //   setSelectedItem(item);
  //   setFromInputValue(item);
  //   dispatch(setSuggestedRides([]));
  // };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    startDate,
    onChangeDateHandler,
    modifiedInitialStateDate,
    inputValues,
  } = useFormValidation(initialState, validateAuth);

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
              value={inputValues.localityFrom}
              className={errors.email && 'error-input'}
              autoComplete="off"
              placeholder="where are you now..."
            />
          </div>
          <br></br>
          {suggestedRides && suggestedRides.length > 0 ? (
            suggestedRides.map((item, i) => {
              return (
                // <p key={i} onClick={(e) => onSuggestSelect(e, { item })}>
                <p key={i}>{item.locality}</p>
              );
            })
          ) : (
            <div>
              {' '}
              <h3>list is empty</h3>
            </div>
          )}
          {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={inputValues.destination}
              className={errors.password && 'error-input'}
              name="destination"
              type="text"
              placeholder="where are you going..."
            />
          </div>
          <br></br>
          {suggestedRides && suggestedRides.length > 0 ? (
            suggestedRides.map((item, i) => {
              return (
                // <p key={i} onClick={(e) => onSuggestSelect(e, { item })}>
                <p key={i}>{item.locality}</p>
              );
            })
          ) : (
            <div>
              {' '}
              <h3>list is empty</h3>
            </div>
          )}
          {/* {errors.password && <p className="error-text">{errors.password}</p>} */}
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
