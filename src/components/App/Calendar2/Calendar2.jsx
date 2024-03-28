import React from 'react'; 
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import s from './Calendar2.module.scss';


const Calendar2 = ({setOpenCalendar, setInputValues, inputValues}) => {    
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()    
    const curr_month = `${monthNames[currentMonth]}`;
    const [shownMonthTitle, setShownMonthTitle] = React.useState(curr_month);
    const [shownYear, setShownYear] = React.useState(currentYear); 
    console.log("shownMonthTitle", shownMonthTitle)  
    console.log("shownYear", shownYear)  

    
    const isLeapYear = (shownYear) => {
        // isLeap = new Date(year, 1, 29).getMonth() == 1
        return (shownYear % 4 === 0 && shownYear % 100 !== 0 && shownYear % 400 !== 0) || (shownYear % 100 === 0 && shownYear % 400 === 0)
    }

    const getFebDays = (currentYear) => {
        return isLeapYear(currentYear) ? 29 : 28
    }

    const days_of_month = [
        31,
        getFebDays(shownYear),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];   
    // console.log("shownYear try", shownYear)  
    // console.log("shownMonthTitle try", monthNames.indexOf(shownMonthTitle))  
    const first_day = new Date(shownYear, monthNames.indexOf(shownMonthTitle), 1)
    // console.log("first_day", first_day)    
    
    let daysToRender = [];

    // for (let i = 0; i <= days_of_month[shownMonthTitle] + first_day.getDay() - 1; i++) {        
    //     daysToRender.push(i - first_day.getDay() + 1)       
    // }

    for (let i = 0; i <= days_of_month[monthNames.indexOf(shownMonthTitle)] + first_day.getDay() - 1; i++) {        
        daysToRender.push(i - first_day.getDay() + 1)       
    }

    const onForwardMonth = () => {       
        if (monthNames.indexOf(shownMonthTitle) === 11) {           
            setShownYear(shownYear + 1)
            setShownMonthTitle(monthNames[0])
        } else {
            setShownMonthTitle(monthNames[monthNames.indexOf(shownMonthTitle) + 1])
        }        
    }

    const onBackMonth = () => { 
        if (monthNames.indexOf(shownMonthTitle) === 0) {            
            setShownYear(shownYear - 1)
            setShownMonthTitle(monthNames[11])
        } else {
            setShownMonthTitle(monthNames[monthNames.indexOf(shownMonthTitle) - 1])
        } 
    }

    // function checkDay(day) {
    //     let dayToRender = new Date (shownYear, monthNames.indexOf(shownMonthTitle), day).getDate()
    //     // console.log("dayToRender", dayToRender)
    //     // console.log("cheking in function", dayToRender)        
    //     if (dayToRender < new Date().getDate()) {
    //         console.log("dayToRender less", dayToRender)
    //         return true

    //     } else if (dayToRender >= new Date().getDate()) {
    //         console.log("dayToRender more", dayToRender)
    //         return false
    //     }      
    // }

    // function checkDay(day) {
    //     let dayToRender = new Date (shownYear, monthNames.indexOf(shownMonthTitle), day)
    //     // console.log("dayToRender", dayToRender)
    //     // console.log("cheking in function", dayToRender)
    //     if(dayToRender.getDate() == new Date().getDate()) {
    //         return false
    //     } else if (dayToRender < new Date()) {
    //         console.log("dayToRender less", dayToRender.getDate())
    //         return true
    //     } else if ( dayToRender > new Date() ) { 
    //         console.log("dayToRender more", dayToRender.getDate()) // || 
    //         return false
    //     }      
    //     // if (dayToRender.getDate() == new Date().getDate()) {
    //     //     console.log("equal", dayToRender)
    //     // }
    // }
    function checkDay(day) {
        let dayToRender = new Date (shownYear, monthNames.indexOf(shownMonthTitle), day)
        // console.log("dayToRender", dayToRender)       
     
        // console.log("cheking in function", dayToRender)
        if(dayToRender.getDate() == new Date().getDate() && dayToRender.getMonth() == new Date().getMonth() && dayToRender.getFullYear() == new Date().getFullYear()) {
            // console.log("current day", dayToRender.getDate())
            return s.div_curr_date
        } else if (dayToRender < new Date()) {
            // console.log("dayToRender less", dayToRender.getDate())
            return s.div_past_date
        } else if ( dayToRender > new Date() ) { 
            // console.log("dayToRender more", dayToRender.getDate())
            return s.div_future_date
        }           
    }

    const setDate = (e) => {
       
        let day = e.target.id;
        console.log("day", day);
    
        if (day && day > 0 && new Date (shownYear, monthNames.indexOf(shownMonthTitle), day).getDate() >= new Date().getDate()) { 
            console.log("new date", new Date())
            console.log("DAY", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day) )
    
      
            let formattedMonth = (monthNames.indexOf(shownMonthTitle) + 1);
            console.log("currentMonth", formattedMonth)        
            let modifiedDate = shownYear + '-' + (formattedMonth <= 9 ? '0' + formattedMonth : formattedMonth) + '-' + (day <= 9 ? '0' + day : day);
            console.log("modifiedDate in handler", modifiedDate);
            setInputValues({
                ...inputValues,
                date: modifiedDate,
            });
            setOpenCalendar(false);
        } else {
          console.log("no id");
          return
        }
    };
 

    return (
        <>
            <div class={s.calendar}>
                <div class={s.calendar_header}>
                    <div class={s.month_picker} id="month-picker">
                        <div onClick={onBackMonth}>
                            <span>
                                <h3><MdArrowBackIosNew /></h3>
                            </span>
                        </div>
                        <div class={s.month_and_year}>
                            <div>
                                <span><h3>{shownMonthTitle}</h3></span>
                            </div>
                            <div className={s.year}>
                                <span><h3>{shownYear}</h3></span>
                            </div>
                        </div>
                        <div onClick={onForwardMonth}>
                            <span>
                                <h3><MdArrowForwardIos /></h3>
                            </span>
                        </div>                        
                    </div>     
                </div>
                <div class={s.calendar_body}>
                    <div class={s.calendar_week_day}>
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class={s.calendar_days} onClick={(e) => setDate(e)}>
                        {/* {daysToRender.map((day) => checkDay(day) ? <div id={day} className={s.day}>{day > 0 && day}</div> : <div id={day} className={s.day}>{day*2}</div>
                            // checkDay(day) ? (<div id={day} className={s.day}>{day > 0 && day}</div>) : (<div id={day} className={s.day}>{shownYear}</div>) 
                            // (checkDay(day) ? <div id={day} className={s.day}>{day > 0 && day}</div> : <div id={day} className={s.day}>{day*2}</div>)
                            )                          
                        } */}
                        {/* {daysToRender.map((day) => (<div id={day} className={s.day}>{day > 0 && day}</div>))  */}
                           
                        {/* {daysToRender.map((day) => (<div id={day} className={checkDay(day) ? s.div_past_date : s.div}>{day > 0 && day}</div>))} */}
                        {daysToRender.map((day) => (<div id={day} className={checkDay(day)}>{day > 0 && day}</div>))}
                        
                    </div>
                </div>               
            </div>        
        </>
    )
}

export default Calendar2;





