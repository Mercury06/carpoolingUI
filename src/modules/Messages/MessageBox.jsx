import React from 'react';
import s from './Messages.module.scss';
import MessageRoom from './MessageRoom';

export default function MessageBox() {

  const initialState = {
    // participants: [{}, {}],
    // referedRide: {},
    body: "",    
  };

  return (
    <div className={s.main_container}>
      <MessageRoom />      
    </div>
  );
}
