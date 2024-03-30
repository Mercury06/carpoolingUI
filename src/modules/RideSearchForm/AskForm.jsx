import React from 'react';

import { useSelector } from 'react-redux';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { ClearIcon } from '../../components/assets/svg/BoxIcons';
import useForm from './hooks/useForm';
// import { setSuggestedRides } from '../../../../reducers/rideReducer';
// import { findLocality } from '../../../api/actions';

import s from './askForm.module.scss';
import Calendar2 from '../../components/App/Calendar2/Calendar2';
import moment from 'moment';


const AskForm = (props) => {
  
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

  const userId = useSelector((state) => state.user.currentUser.id);
  const suggestedRides = useSelector((state) => state.ride.suggestedRides);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openCalendar, setOpenCalendar] = React.useState(false);
  
  console.log("selectedDate in main state", selectedDate) 
  // console.log("initialState data", initialState)
  // const dispatch = useDispatch();

  React.useEffect(() => {
    initialState.user = userId;
    // initialState.date = selectedDate;    
    // console.log('suggestedRides:', suggestedRides);
  }, [suggestedRides]);

  React.useEffect(() => {
    props.setRenderFlag(true)   
    return () => { 
      props.setRenderFlag(false)    
    };
  }, []);
  

  const {
    findRidesHandleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    onChangeDateHandler,   
    onSuggestSelect1,
    onSuggestSelect2,
    targetName,
    inputValues,
    setInputValues,
    inputRef1,
    inputRef2,
    onClickClear,  
    
  } = useForm(initialState, setOpenCalendar);

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
            <div className={s.calendar_btn}>              
              {/* <button type="button" onClick={() => setOpenCalendar(!openCalendar)} id="id1">{moment(initialState.date).format("DD MMM YYYY")}</button> */}
              <button type="button" onClick={() => setOpenCalendar(!openCalendar)}>{inputValues.date ? moment(inputValues.date).format("DD MMM YYYY") : moment(new Date ()).format("DD MMM YYYY")}</button>       
            </div>
            <div className={s.search_btn}>              
              <button disabled={isSubmitting} type="submit">Find ride</button>       
            </div>        
          </form>
        </div>
        <div>
            {/* <Calendar /> */}
            {openCalendar && <Calendar2 setOpenCalendar={setOpenCalendar} inputValues={inputValues} setInputValues={setInputValues} 
                                        selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
        </div>
      </div>
      
    </>
  );
};

export default AskForm;
