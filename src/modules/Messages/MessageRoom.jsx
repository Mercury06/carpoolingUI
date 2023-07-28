import React from 'react';
import s from './Messages.module.scss';
import Dialog from './Dialog';
import TextArea from 'antd/es/input/TextArea';

export default function MessageRoom() {
  return (
    <div className={s.room_container}>
        <h1>message room</h1>
        <TextArea className={s.ant_input}/>
    </div>
  );
}
