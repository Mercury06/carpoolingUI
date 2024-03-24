
import React from 'react'; 
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import s from './Calendar2.module.scss';

const Calendar2 = (props) => {    
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()    
    const curr_month = `${monthNames[currentMonth]}`;
    const [shownMonthTitle, setShownMonthTitle] = React.useState(curr_month);
    const [shownYear, setShownYear] = React.useState(currentYear);
    // console.log("rerendered", shownMonthTitle)

    
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
    console.log("first_day", first_day)    
    
    let daysToRender = [];

    // for (let i = 0; i <= days_of_month[shownMonthTitle] + first_day.getDay() - 1; i++) {        
    //     daysToRender.push(i - first_day.getDay() + 1)       
    // }

    for (let i = 0; i <= days_of_month[monthNames.indexOf(shownMonthTitle)] + first_day.getDay() - 1; i++) {        
        daysToRender.push(i - first_day.getDay() + 1)       
    }

    const onForwardMonth = () => {
        const monthIndex = monthNames.indexOf(shownMonthTitle)
        console.log("monthIndex", monthIndex)
        // console.log("forward", monthNames[monthNames.indexOf(shownMonthTitle) + 1])
        if (monthNames.indexOf(shownMonthTitle) === 11) {
            console.log("index 11")
            setShownYear(shownYear + 1)
            setShownMonthTitle(monthNames[0])
        } else {
            setShownMonthTitle(monthNames[monthNames.indexOf(shownMonthTitle) + 1])
        }        
    }

    const onBackMonth = () => {
        const monthIndex = monthNames.indexOf(shownMonthTitle)
        console.log("monthIndex", monthIndex)
        // console.log("forward", monthNames[monthNames.indexOf(shownMonthTitle) + 1])
        if (monthNames.indexOf(shownMonthTitle) === 0) {
            console.log("index 0")
            setShownYear(shownYear - 1)
            setShownMonthTitle(monthNames[11])
        } else {
            setShownMonthTitle(monthNames[monthNames.indexOf(shownMonthTitle) - 1])
        } 
    }

    // month_names.forEach((e, index) => {
    //     let month = document.createElement('div')
    //     month.innerHTML = `<div data-month="${index}">${e}</div>`
    //     month.querySelector('div').onclick = () => {
    //         month_list.classList.remove('show')
    //         curr_month.value = index
    //         generateCalendar(index, curr_year.value)
    //     }
    //     month_list.appendChild(month)
    // }) 
    

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
                    <div class={s.calendar_days}>
                        {daysToRender.map((day) => (
                            <div>{day > 0 && day}</div>
                        ))}
                    </div>
                </div>               
            </div>        
        </>
    )
}

export default Calendar2;





