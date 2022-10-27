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
  localityFrom: {
    localityName: '',
    id: '',
  },
  destination: {
    localityName: '',
    id: '',
  },
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

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    startDate,
    onChangeDateHandler,
    onSuggestSelect1,
    onSuggestSelect2,
    targetName,
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
              value={inputValues.localityFrom.localityName}
              className={s.input}
              autoComplete="off"
              placeholder="where are you now..."
            />
          </div>
          {inputValues.localityFrom.localityName !== '' &&
          suggestedRides.length > 0 &&
          targetName === 'localityFrom' ? (
            <div className={s.input__popup}>
              <ul>
                {suggestedRides.map((item, i) => {
                  return (
                    <li key={i} onClick={(e) => onSuggestSelect1(e, { item })}>
                      {item.locality}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={inputValues.destination.localityName}
              className={s.input}
              name="destination"
              autoComplete="off"
              placeholder="where are you going..."
            />
          </div>
          {inputValues.destination.localityName !== '' &&
          suggestedRides.length > 0 &&
          targetName === 'destination' ? (
            <div className={s.input__popup}>
              <ul>
                {suggestedRides.map((item, i) => {
                  return (
                    <li key={i} onClick={(e) => onSuggestSelect2(e, { item })}>
                      {item.locality}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div>
            <ReactDatePicker
              selected={startDate}
              onChange={onChangeDateHandler}
              dateFormat="dd MMM yyy"
              minDate={new Date()}
              // className={s.date__picker}
              style={{ position: 'relative' }}
            />
          </div>
          <div>
            {/* <button disabled={isSubmitting} type="submit"> */}
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RideSearchForm1;
