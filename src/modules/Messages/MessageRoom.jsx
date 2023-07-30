import React from 'react';
import s from './Messages.module.scss';
// import Dialog from './MessageItem';
//import TextArea from 'antd/es/input/TextArea';
import Input from './Input';

export default function MessageRoom() {
  return (
    <div className={s.room_container}>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        {/* <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1>
        <h1>message room</h1> */}
        <div className={s.input_message_container}>
        <Input />
        <button>Send</button>
        </div>
        
        {/* <Dialog /> */}
        {/* <TextArea className={s.ant_input}/> */}
    </div>
  );
}
