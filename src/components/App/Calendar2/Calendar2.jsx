import React from 'react'; 
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import s from './Calendar2.module.scss';


const Calendar2 = ({openCalendar, setOpenCalendar, setInputValues, inputValues, selectedDate, setSelectedDate }) => {    
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()    
    const curr_month = `${monthNames[currentMonth]}`;
    const [shownMonthTitle, setShownMonthTitle] = React.useState(curr_month);
    const [shownYear, setShownYear] = React.useState(currentYear);
    // const [monthToggleFlag, setMonthToggleFlag] = React.useState(false);  
    
    // console.log("shownMonthTitle", shownMonthTitle)  
    // console.log("shownYear", shownYear)
    console.log("curr_month", shownMonthTitle)      

    
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
        if (monthNames.indexOf(shownMonthTitle) === new Date().getMonth() && shownYear === new Date().getFullYear()) {
            console.log("returned", new Date().getFullYear())
            return
        } else {
            if (monthNames.indexOf(shownMonthTitle) === 0) {            
                setShownYear(shownYear - 1)
                setShownMonthTitle(monthNames[11])
            } else {
                setShownMonthTitle(monthNames[monthNames.indexOf(shownMonthTitle) - 1])
            } 
        }        
    } 

    function checkDay(day) {
        // console.log("daysToRender", daysToRender) 
        if (day > 0) {
            // console.log("day > 0", day)

            let dayToRender = new Date (shownYear, monthNames.indexOf(shownMonthTitle), day)
        // let formattedSelectedDate = dayToRender.getDate() == new Date().getDate() && dayToRender.getMonth() == new Date().getMonth() && dayToRender.getFullYear() == new Date().getFullYear()
        // console.log("daysToRender.getDate()", dayToRender.getDate())
            let formattedSelectedDate = new Date (selectedDate)
        // console.log("dayToRender", dayToRender)    
        // console.log("formattedSelectedDate", formattedSelectedDate)
        // console.log("selectedDate in function*****", new Date(selectedDate))
       
        if(dayToRender.getDate() == new Date().getDate() && dayToRender.getMonth() == new Date().getMonth() && dayToRender.getFullYear() == new Date().getFullYear()) {
            // console.log("dayToRender current", dayToRender)
            if(dayToRender.getDate() == formattedSelectedDate.getDate() && dayToRender.getMonth() == formattedSelectedDate.getMonth() && dayToRender.getFullYear() == formattedSelectedDate.getFullYear()) {
                return s.div_curr_date_selected
            }
            return s.div_curr_date
            // console.log("current day", dayToRender.getDate())           
        } else if (dayToRender < new Date()) {
            // console.log("dayToRender less", dayToRender.getDate())
            return s.div_past_date
        } else if ( dayToRender > new Date()) { 
            // console.log("dayToRender future", dayToRender)
            if(dayToRender.getDate() == formattedSelectedDate.getDate() 
                && dayToRender.getMonth() == formattedSelectedDate.getMonth() 
                && dayToRender.getFullYear() == formattedSelectedDate.getFullYear() ) 
                // && dayToRender.getDate() !== new Date(selectedDate).getDate()
                // && dayToRender.getMonth() !== new Date(selectedDate).getMonth()
                // && dayToRender.getFullYear() !== new Date(selectedDate).getFullYear()) 
                {
                return s.div_future_date_selected
            }
            return s.div_future_date
        }
        } else {
            // console.log("day <= 0", day)
        }
    }

    const setDate = (e) => {
        // console.log("selectedDate in function", selectedDate)  
        let day = e.target.id;
        console.log("day", day);
        // console.log("SHOWN", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day).getDate());
        // console.log("SHOWN2", new Date().getDate());
        // console.log("SHOWN3", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day) >= new Date());


        // console.log("shownYear", shownYear);
        // console.log("monthNames.indexOf(shownMonthTitle)", monthNames.indexOf(shownMonthTitle));
        // console.log("newed", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day));
        // console.log("shownMonthTitle", shownMonthTitle);
        // console.log("currMonth", monthNames[new Date().getMonth()]);
        // console.log("compare mnths", shownMonthTitle === monthNames[new Date().getMonth()]);
        // console.log("newed", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day));
        // console.log("today", new Date());
        // console.log("newed < today", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day) < new Date());
        // console.log("newed = today", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day) == new Date());
        // console.log("newed > today", new Date (shownYear, monthNames.indexOf(shownMonthTitle), day) > new Date());
        
        // if (day && day > 0 && new Date (shownYear, monthNames.indexOf(shownMonthTitle), day).getDay() >= new Date().getDay()) {
        if (day && day > 0) {
            if (new Date (shownYear, monthNames.indexOf(shownMonthTitle), day).getDay() < new Date().getDay() 
                && shownMonthTitle === monthNames[new Date().getMonth()]) {
                    return
            }
            let formattedMonth = (monthNames.indexOf(shownMonthTitle) + 1);
            // console.log("formattedMonth", formattedMonth)        
            let modifiedDate = shownYear + '-' + (formattedMonth <= 9 ? '0' + formattedMonth : formattedMonth) + '-' + (day <= 9 ? '0' + day : day);
            // console.log("modifiedDate in handler", modifiedDate);
            setInputValues({
                ...inputValues,
                date: modifiedDate,
            });
            
            setSelectedDate(modifiedDate);
            // console.log("SETTY", new Date(modifiedDate))            
            setOpenCalendar(false);
            return
        } else {
          console.log("no id");
          return
        }
    };
 

    return (
        <>
            {/* <div class={s.calendar}> */}
            <div className={`${s.calendar} ${openCalendar ? "" : s.hidden}`}>
                <div class={s.calendar_header}>
                    <div class={s.month_picker} id="month-picker">
                        <div onClick={onBackMonth} class={s.arrow}>
                            <span>
                                {/* <h3><MdArrowBackIosNew color="orange" /></h3> */} 
                                {/* <h3><MdArrowBackIosNew color={`${s.container} ${scrolled ? s.scroll_top : ""}`} /></h3> */}
                                <h3><MdArrowBackIosNew color={ new Date().getMonth() == monthNames.indexOf(shownMonthTitle) && new Date().getFullYear() == shownYear ? "grey"  : "orange"} /></h3>
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
                        <div onClick={onForwardMonth} class={s.arrow}>
                            <span>
                                <h3><MdArrowForwardIos color="orange"/></h3>
                            </span>
                        </div>                        
                    </div>     
                </div>
                <div class={s.calendar_body}>
                    <div class={s.calendar_week_day}>
                        <div>Su</div>
                        <div>Mo</div>
                        <div>Tu</div>
                        <div>We</div>
                        <div>Th</div>
                        <div>Fr</div>
                        <div>Sa</div>
                    </div>
                    <div class={s.calendar_days} onClick={(e) => setDate(e)}>
                        {/* {daysToRender.map((day) => checkDay(day) ? <div id={day} className={s.day}>{day > 0 && day}</div> : <div id={day} className={s.day}>{day*2}</div>
                            // checkDay(day) ? (<div id={day} className={s.day}>{day > 0 && day}</div>) : (<div id={day} className={s.day}>{shownYear}</div>) 
                            // (checkDay(day) ? <div id={day} className={s.day}>{day > 0 && day}</div> : <div id={day} className={s.day}>{day*2}</div>)
                            )                          
                        } */}
                        {/* {daysToRender.map((day) => (<div id={day} className={s.day}>{day > 0 && day}</div>))  */}
                           
                        {/* {daysToRender.map((day) => (<div id={day} className={checkDay(day) ? s.div_past_date : s.div}>{day > 0 && day}</div>))} */}
                        {daysToRender.map((day) => (<div tabIndex="-1" id={day} className={checkDay(day)}>{day > 0 && day}</div>))}                       
                        
                    </div>
                </div>               
            </div>        
        </>
    )
}

export default Calendar2;





