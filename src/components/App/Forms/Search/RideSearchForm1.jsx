import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import useFormValidation from '../../../../Hooks/useFormValidation';
// import { setSuggestedRides } from '../../../../reducers/rideReducer';
// import { findLocality } from '../../../api/actions';

import s from './rideSearchForm.module.scss';
import validateAuth from './validateAuth';

// const initialState = {
//   localityFrom: '',
//   destination: '',
//   user: '',
//   date: '',
// };

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
    //console.log('initialState:', initialState);
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
              value={inputValues.localityFrom.localityName}
              className={errors.email && 'error-input'}
              autoComplete="off"
              placeholder="where are you now..."
            />
          </div>
          <br></br>
          {/* {suggestedRides && suggestedRides.length > 0 ? ( */}
          {inputValues.localityFrom.localityName !== '' && suggestedRides.length > 0
            ? suggestedRides.map((item, i) => {
                return (
                  // <p key={i} onClick={(e) => onSuggestSelect(e, { item })}>
                  <div className="item" key={i}>
                    {item.locality}
                  </div>
                );
              })
            : null}
          {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={inputValues.destination.localityName}
              className={errors.password && 'error-input'}
              name="destination"
              type="text"
              placeholder="where are you going..."
            />
          </div>
          <br></br>
          {/* {suggestedRides && suggestedRides.length > 0 ? ( */}
          {inputValues.destination.localityName !== '' && suggestedRides.length > 0
            ? suggestedRides.map((item, i) => {
                return (
                  // <p key={i} onClick={(e) => onSuggestSelect(e, { item })}>
                  <div className="item" key={i}>
                    {item.locality}
                  </div>
                  // <p key={i}>{item.locality}</p>
                );
              })
            : null}
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
