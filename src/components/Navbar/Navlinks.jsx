import React from 'react';
import s from "./Navlinks.module.css"

const Navlinks = ({ open }) => {
    return (
        <div className={s.ul_container} open={open}>
            {/* <ul open={open}> */}
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Sign In</li>
                <li>Sign Up</li>
            {/* </ul> */}
        </div>
      
    )
  }
  
  export default Navlinks