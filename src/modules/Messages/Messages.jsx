import React from 'react';
import s from './Messages.module.scss';
import Dialog from './Dialog';

export default function Messages() {
  return (
    <div className={s.main_container}>
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
    </div>
  );
}
