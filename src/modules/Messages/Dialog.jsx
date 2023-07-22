import React from 'react';
import s from './Messages.module.scss';

export default function Dialog() {
  return <div className={s.dialog_container}>
            <div className={s.dialog_container_from}>from</div>
            <div className={s.dialog_container_message}>message</div>
            <div className={s.dialog_container_date}>date</div>
         </div>;
}
