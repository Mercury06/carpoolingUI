import React from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { ClearIcon } from '../../components/assets/svg/BoxIcons';
import useForm from './hooks/useForm';
// import { setSuggestedRides } from '../../../../reducers/rideReducer';
// import { findLocality } from '../../../api/actions';

import s from './askForm.module.scss';
import Calendar from '../../components/App/Calendar/Calendar';
import Calendar2 from '../../components/App/Calendar2/Calendar2';


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

const AskForm = (props) => {
  const userId = useSelector((state) => state.user.currentUser.id);
  const suggestedRides = useSelector((state) => state.ride.suggestedRides);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    initialState.user = userId;
    initialState.date = modifiedInitialStateDate;
    console.log('suggestedRides:', suggestedRides);
  }, [suggestedRides]);

  const {
    findRidesHandleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    startDate,
    onChangeDateHandler,
    onSuggestSelect1,
    onSuggestSelect2,
    targetName,
    inputRef1,
    inputRef2,
    onClickClear,
    modifiedInitialStateDate,
    inputValues,
  } = useForm(initialState);

  return (
    <>
      <div className={s.askForm__wrapper}>
        <div className={s.slogan}>
          <p>Ride your best way</p>
        </div>
        <div className={s.container}>
          <form className={s.form} onSubmit={findRidesHandleSubmit}>
            {/* <h3>Find ride</h3> */}
            <div className={s.input__block}>
              <div className={s.input__row}>
                <input
                  ref={inputRef1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="localityFrom"
                  value={inputValues.localityFrom.localityName}
                  className={s.input}
                  autoComplete="off"
                  placeholder="From"
                />
                <div className={s.geoIcon}>
                  <BsFillGeoAltFill />
                </div>
                {inputValues.localityFrom.localityName && (
                  <div
                    className={s.clearIcon}
                    // style={{ cursor: 'pointer' }}
                    onClick={() => onClickClear('input1')}
                  >
                    <ClearIcon />
                  </div>
                )}
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
            </div>
            {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
            <div className={s.input__block}>
              <div className={s.input__row}>
                <input
                  ref={inputRef2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={inputValues.destination.localityName}
                  className={s.input}
                  name="destination"
                  autoComplete="off"
                  placeholder="To"
                />
                <div className={s.geoIcon}>
                  <BsFillGeoAltFill />
                </div>
                {inputValues.destination.localityName && (
                  <div
                    className={s.clearIcon}
                    //style={{ cursor: 'pointer' }}
                    onClick={() => onClickClear('input2')}
                  >
                    <ClearIcon />
                  </div>
                )}
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
            </div>
            {/* <div>
              <ReactDatePicker
                selected={startDate}
                onChange={onChangeDateHandler}
                dateFormat="dd MMM yyy"
                minDate={new Date()}
                // className={s.date__picker}
                style={{ position: 'relative' }}
              />
            </div> */}
            <div className={s.calendar_btn}>              
              <button type="button" id="id1">Date</button>       
            </div>
            <div className={s.search_btn}>              
              <button disabled={isSubmitting} type="button">Find ride</button>       
            </div>        
          </form>
        </div>
        <div>
            {/* <Calendar /> */}
            <Calendar2 />
        </div>
      </div>
      
    </>
  );
};

export default AskForm;
