import React from 'react';
import { useSelector } from 'react-redux';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { ClearIcon } from '../../components/assets/svg/BoxIcons';
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FaCalendarWeek } from "react-icons/fa";
import useForm from './hooks/useForm';
// import { setSuggestedRides } from '../../../../reducers/rideReducer';


import s from './askForm.module.scss';
import Calendar2 from '../../components/App/Calendar2/Calendar2';
import moment from 'moment';


const AskForm = (props) => {
  
  const userId = props.userId;
  
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
  
  const suggestedRides = useSelector((state) => state.ride.suggestedRides);
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format("YYYY-MM-DD"));
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const element = React.useRef();  
  const observer = React.useRef();
  const [scrolled, setScrolled] = React.useState(false);
  // console.log("suggestedRides", suggestedRides)


  React.useEffect(() => {
     
    initialState.date = selectedDate;
    setInputValues({
      ...inputValues,
      user: userId,
    });
    
  }, [suggestedRides, userId]);

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
      rootMargin: "-136px",
      threshold: 0.5
    }
    var cb = function(entries, observer) {
    
      let entry = entries[0]  
      if (!entry.isIntersecting) {
        // console.log("intersecting")
        setScrolled(true)
      }
      else {
        // console.log("not intersecting")
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
    suggestMode,
    searching,
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
                <div className={s.geoIcon1}>
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
              {/* {inputValues.localityFrom.localityName !== '' &&
              suggestedRides.length > 0 &&
              targetName === 'localityFrom' ? (
                <div className={s.input__popup}>
                  <div className={s.list_container}>
                    <ul>
                      <li><span className={s.loader}></span></li>
                      {suggestedRides.map((item, i) => {
                        return (
                          <li key={i} onClick={(e) => onSuggestSelect1(e, { item })}>
                            {item.locality}
                          </li>
                          
                        );
                      })}
                    </ul>
                  </div>                 
                </div>
              ) : null} */}
             
             {inputValues.localityFrom.localityName !== '' && targetName === 'localityFrom' && suggestMode ?
              (
                <div className={s.input__popup}>
                  <div className={s.list_container}>
                    <ul>
                      { searching && <li><span className={s.loader}></span></li>}
                        
                         {suggestedRides.map((item, i) => {
                            return (<li key={i} onClick={(e) => onSuggestSelect1(e, { item })}><span>{item.locality}</span></li>);
                          })} 
                          
                      
                      {/* { searching
                        ? <li><span className={s.loader}></span></li>
                        : suggestedRides ? <span><h6>result</h6></span> : <span><h6>No result</h6></span>  
                      }  */}
                       {/* { loading
                        ? <li><span className={s.loader}></span></li>
                        : <li><span className={s.span_result}><center><h4>No result</h4></center></span></li>
                        }  */}
                    </ul>
                  </div>                 
                </div>
              ) : null}
            </div>
            {/* {errors.email && <p className="error-text">{errors.email}</p>} */}
            <div className={s.exchangeIcon}>
              <LiaExchangeAltSolid size={22} />
            </div>
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
                <div className={s.geoIcon2}>
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
              {/* {inputValues.destination.localityName !== '' &&
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
              ) : null} */}
              {inputValues.destination.localityName !== '' && targetName === 'destination' && suggestMode ?
              (
                <div className={s.input__popup}>
                  <div className={s.list_container}>
                    <ul>
                      { searching && <li><span className={s.loader}></span></li>}
                        
                         {suggestedRides.map((item, i) => {
                            return (<li key={i} onClick={(e) => onSuggestSelect2(e, { item })}><span>{item.locality}</span></li>);
                          })} 
                          
                      
                      {/* { searching
                        ? <li><span className={s.loader}></span></li>
                        : suggestedRides ? <span><h6>result</h6></span> : <span><h6>No result</h6></span>  
                      }  */}
                       {/* { loading
                        ? <li><span className={s.loader}></span></li>
                        : <li><span className={s.span_result}><center><h4>No result</h4></center></span></li>
                        }  */}
                    </ul>
                  </div>                 
                </div>
              ) : null}
            </div>  
               <div className={s.calendar_wrapper}>
                    
            <div className={s.calendar_btn}>     
                      
              {/* <button type="button" onClick={() => setOpenCalendar(!openCalendar)} id="id1">{moment(initialState.date).format("DD MMM YYYY")}</button> */}
              <button type="button" onClick={() => setOpenCalendar(!openCalendar)}>
                {/* <span className={s.calendarIcon}>
                  <FaCalendarWeek size={16}/>
                </span>  */}
                <div className={s.calendarBtn}>
                  <div className={s.calendarIcon}>
                    <FaCalendarWeek size={16}/>
                  </div> 
                  <div className={s.calendarDate}>
                    <span > 
                      {inputValues.date ? moment(inputValues.date).format("DD MMM YYYY") : moment(new Date ()).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>               
                  
                  </button> 
            </div>
            <div>            
                {openCalendar && <Calendar2 openCalendar={openCalendar} setOpenCalendar={setOpenCalendar} inputValues={inputValues} setInputValues={setInputValues} 
                                        selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
            </div>
            </div>   
            <div className={s.search_btn}>              
              <button disabled={isSubmitting} type="submit">Find ride</button>       
            </div>                      
          </form>          
        </div>       
      </div>
      
    </>
  );
};

export default AskForm;
