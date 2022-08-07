import React, { useState } from 'react';
import s from './Burger.module.scss';
import Navlinks from './Navlinks';

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={s.burger_container} open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      <Navlinks open={open} />
    </>
  );
};

export default Burger;
