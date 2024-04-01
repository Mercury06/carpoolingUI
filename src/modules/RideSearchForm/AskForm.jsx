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
  const element = React.useRef();  
  const observer = React.useRef();
  const [scrolled, setScrolled] = React.useState(false);
 
  
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

 

  // React.useEffect(() => {
  //   // console.log("observer on start", observer)
  //   // console.log("element on start", element)

  //   const options = {
  //     rootMargin: "-70px",
  //     threshold: 0.9
  //   }
  //   var cb = function(entries, observer) {
  //     // console.log("element in observer", element.current)
  //     let entry = entries[0]      
  //     console.log("entry.target", entry.target)
  //     console.log("entry", entry.isIntersecting)


  //     if (!entry.isIntersecting) {
  //       setScrolled(true)
       
  //       console.log("setScrolled true")
  //     } 
  //     else {
  //       setScrolled(false)
  //       console.log("setScrolled false")
  //     }
    
  //   }
  //   observer.current = new IntersectionObserver(cb, options)
  //   observer.current.observe(element.current)

  // }, []);

  React.useLayoutEffect(() => {   
    
    const options = {
      rootMargin: "-120px",
      threshold: 0.5
    }
    var cb = function(entries, observer) {
    
      let entry = entries[0]  
      if (!entry.isIntersecting) {
        console.log("intersecting")
        setScrolled(true)
      }
      else {
        console.log("not intersecting")
        setScrolled(false)
      }    
    }
    observer.current = new IntersectionObserver(cb, options)
    observer.current.observe(element.current)

  }, []);

  const {
    findRidesHandleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,       
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
      <div ref={element} className={s.askForm__wrapper}>
        <div className={s.slogan}>
          <p>Ride your best way</p>
        </div>        
        {/* <div ref={element} className={s.container}> */}        
        {/* <div ref={element} className={`${s.container} ${scrolled ? s.scroll_top : ""}`}> */}
        <div className={`${s.container} ${scrolled ? s.scroll_top : ""}`}>
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
