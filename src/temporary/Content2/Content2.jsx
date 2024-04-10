import React, { useEffect, useState } from 'react';

import s from './Content2.module.scss';


const Content2 = () => {    
    
    const lineRef = React.useRef();
    const timelineRef = React.useRef();    
    const lineObserver = React.useRef();
    const ref1 = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    const ref4 = React.useRef(); 


    React.useEffect(() => {     
        // console.log("ref1", ref1.current)
        const elemRefs = [ref1.current, ref2.current, ref3.current, ref4.current]
        // console.log("elemRefs in hook", elemRefs)
        // const options = {
        //   rootMargin: "-136px",
        //   threshold: 0.1
        // }
        const options = {
            // rootMargin: "-136px 0px -120px 0px",
            rootMargin: "300px 0px -120px 0px",
            threshold: 0.1
          }
        
        var cb = function(entries, observer) {
           
            let entry = entries[0]  
          if (!entry.isIntersecting) { 
            // console.log("not IIntersecting", entry)  
            entry.target.style.removeProperty('opacity', "1")
            entry.target.style.removeProperty('transform', "none")                       
          }
          else {
            // console.log("IIntersecting", entry)            
            console.log("not IIntersecting", entry.target.id)   
            entry.target.style.setProperty('opacity', "1")
            entry.target.style.setProperty('transform', "none")              
          }    
        }       
              
     
        elemRefs.forEach((i) => {
            if (i && i instanceof Element) {
                console.log("element", i)
                // const observer = new IntersectionObserver(cb, options)  
                // observer.observe(i)
                lineObserver.current = new IntersectionObserver(cb, options)            
                lineObserver.current.observe(i)              
            }    
        })        

        
        // lineObserver.current.observe(timelineRef.current)
       
      }, []);       


  return (    
   
    <div className={s.container}>
        <div className={s.top_section}>
            <h1>Animated TimeLine</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat incidunt distinctio, 
                necessitatibus inventore dolorum fugit rerum 
                dolore accusamus nesciunt voluptates
            </p>
        </div>
        <div ref={timelineRef} className={s.timelineBlock}>
            <div ref={lineRef} className={s.line}></div>

            <div ref={ref1} id="a1" className={s.section1}>
            {/* <div ref={ref1} id="a1" className={`${s.section1} ${scrolled ? s.show_mode : ""}`}> */}
                <div className={s.bead}></div>
                <div className={s.content}>
                    <h2>STEP 1</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat incidunt distinctio, 
                necessitatibus inventore dolorum fugit rerum 
                dolore accusamus nesciunt voluptates
                        
                    </p>
                </div>
            </div>

            <div ref={ref2} id="a2" className={s.section2}>
            {/* <div ref={ref2} id="a2" className={`${s.section2} ${scrolled ? s.show_mode : ""}`}> */}
                <div className={s.bead}></div>
                <div className={s.content}>
                    <h2>STEP 2</h2>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat incidunt distinctio, 
                necessitatibus inventore dolorum fugit rerum 
                dolore accusamus nesciunt voluptates
                    </p>
                </div>
            </div>

            <div ref={ref3} id="a3" className={s.section3}>
            {/* <div ref={ref3} id="a3" className={`${s.section3} ${scrolled ? s.show_mode : ""}`}> */}
                <div className={s.bead}></div>
                <div className={s.content}>
                    <h2>STEP 3</h2>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat incidunt distinctio, 
                necessitatibus inventore dolorum fugit rerum 
                dolore accusamus nesciunt voluptates
                </p>
                </div>
            </div>

            <div ref={ref4} id="a4" className={s.section4}>
            {/* <div ref={ref4} id="a4" className={`${s.section4} ${scrolled ? s.show_mode : ""}`}> */}
                <div className={s.bead}></div>
                <div className={s.content}>
                    <h2>STEP 4</h2>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat incidunt distinctio, 
                necessitatibus inventore dolorum fugit rerum 
                dolore accusamus nesciunt voluptates
                    </p>
                </div>
            </div>

            {/* <div className={s.section}>
                <div className={s.bead}></div>
                <div className={s.content}>
                    <h2>Web Development</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Animi ab repellendus pariatur? Maxime eius excepturi
                          soluta doloremque, rerum vitae
                         similique cumque, numquam voluptatibus exercitationem 
                         quod accusantium quo asperiores et reprehenderit!
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Animi ab repellendus pariatur? Maxime eius excepturi
                          soluta doloremque, rerum vitae
                         similique cumque, numquam voluptatibus exercitationem 
                         quod accusantium quo asperiores et reprehenderit!
                    </p>
                </div>
            </div> */}
        </div>
    </div>
  
  )
};

export default Content2;



// document.querySelectorAll('.social-item').forEach((i) => {
//     if (i) {
//         const observer = new IntersectionObserver((entries) => {
//             observerCallback(entries, observer, i)
//         },
//         {threshold: 1});    
//         observer.observe(i);
//     }
// })


  // console.log("timelineRef.current", timelineRef.current)   
            // timelineRef.current.style.setProperty('background', 'tomato')
            
            // console.log("boundingClientRect.top", entry.boundingClientRect.top)
            // window.addEventListener('scroll', () => {
            //     console.log("event scroll", lineRef.current.boundingClientRect)
            // })
            // setInterval(() => {
            //     per = per + 10;
            //     lineRef.current.style.setProperty('bottom', `calc(100% - ${per}px)`)
            //     console.log("per", per)
            // }, 2000);    