import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import useFormValidation from '../../../../Hooks/useFormValidation';

import s from './searchForm.module.scss';
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

const RideCreateForm = (props) => {
  const userId = useSelector((state) => state.user.currentUser.id);
  const suggestedRides = useSelector((state) => state.ride.suggestedRides);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    initialState.user = userId;
    initialState.date = modifiedInitialStateDate;
    console.log('suggestedRides:', suggestedRides);
  }, [suggestedRides]);

  const {
    createRideHandleSubmit,
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
        <form className={s.form} onSubmit={createRideHandleSubmit}>
          {/* <h3>Create ride form</h3> */}
          <div className={s.input__block}>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="localityFrom"
              value={inputValues.localityFrom.localityName}
              className={s.input}
              autoComplete="off"
              placeholder="from..."
            />

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
          </div>
          {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
          <div className={s.input__block}>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={inputValues.destination.localityName}
              className={s.input}
              name="destination"
              autoComplete="off"
              placeholder="to..."
            />

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
          </div>
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
            <button type="submit">Create Ride</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RideCreateForm;
