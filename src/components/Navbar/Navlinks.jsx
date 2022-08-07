import React from 'react';
import s from './Navlinks.module.scss';

const Navlinks = ({ open }) => {
  return (
    <div className={s.ul_container} open={open}>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Sign In</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
};

export default Navlinks;
