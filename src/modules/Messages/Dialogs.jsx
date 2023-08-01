import React from 'react';
import s from './Messages.module.scss';
import Dialog from './Dialog';

export default function Dialogs() {
  return <div className={s.main_container}>
            <Dialog />
          </div>  
}
