import React from 'react';
import s from './Messages.module.scss';
import MessageRoom from './MessageRoom';
import { useLocation } from 'react-router-dom';

export default function MessageBox() {

  const {state} = useLocation();
  console.log("state through:", state)


  return (
    <div className={s.main_container}>
      <MessageRoom />      
    </div>
  );
}
