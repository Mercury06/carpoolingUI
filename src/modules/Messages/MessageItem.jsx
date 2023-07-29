import React from 'react';
import s from './Messages.module.scss';

export default function Messages() {
  return <div className={s.messages_container}>
            <div className={s.messages_container_from}>from</div>
            <div className={s.messages_container_message}>message</div>
            <div className={s.messages_container_date}>date</div>
         </div>;
}
