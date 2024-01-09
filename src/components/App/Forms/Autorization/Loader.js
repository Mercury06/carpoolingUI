import React, { useEffect, useRef, useState } from "react";
import s from "./autorization.module.scss";

const Loader = () => {
  return (
    <span className={s.loader}>
      <div className={s.bar1}></div>
      <div className={s.bar2}></div>
      <div className={s.bar3}></div>
      <div className={s.bar4}></div>
      <div className={s.bar5}></div>
      <div className={s.bar6}></div>
    </span>
  );
};

export default Loader;
