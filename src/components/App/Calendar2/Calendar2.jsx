
import React from 'react'; 

import s from './Calendar2.module.scss';

const Calendar2 = (props) => {
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    console.log("currMonth", currentMonth)
    console.log("currYear", currentYear)

    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   
    
    const isLeapYear = (currYear) => {
        // isLeap = new Date(year, 1, 29).getMonth() == 1
        return (currYear % 4 === 0 && currYear % 100 !== 0 && currYear % 400 !== 0) || (currYear % 100 === 0 && currYear % 400 === 0)
    }

    const getFebDays = (currYear) => {
        return isLeapYear(currYear) ? 29 : 28
    }

    const days_of_month = [
        31,
        getFebDays(currentYear),
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

    const curr_month = `${month_names[currentMonth]}`;

    // const first_day = new Date(currentYear, currentMonth, 1)
    const first_day = new Date(currentYear, 2, 1)
    
    let daysToRender = [];

    for (let i = 0; i <= days_of_month[currentMonth] + first_day.getDay() - 1; i++) {        
        daysToRender.push(i - first_day.getDay() + 1)       
    }

    // let month_list = calendar.querySelector('.month-list')

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
    
    
    const showMonthes = () => {
        // month_list.classList.add('show')
    }


    // document.querySelector('#prev-year').onclick = () => {
    //     --curr_year.value
    //     generateCalendar(curr_month.value, curr_year.value)
    // }

    // document.querySelector('#next-year').onclick = () => {
    //     ++curr_year.value
    //     generateCalendar(curr_month.value, curr_year.value)
    // }

    return (
        <>
            <div class={s.calendar}>
                <div class={s.calendar_header}>
                    <span class="month-picker" id="month-picker" onClick={showMonthes}>{curr_month}</span>
                        <div class="year-picker">
                            <span class="year-change" id="prev-year">
                                <pre>prev</pre>
                            </span>
                            <span id="year">{currentYear}</span>
                            <span class="year-change" id="next-year">
                                <pre>next</pre>
                            </span>
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
                {/* <div class="calendar-footer">
                    <div class="toggle">
                        <span>Dark Mode</span>
                        <div class="dark-mode-switch">
                            <div class="dark-mode-switch-ident"></div>
                        </div>
                    </div>
                </div>
                 <div class="month-list"></div> */}
            </div>
        
        </>
    )
}

export default Calendar2;





