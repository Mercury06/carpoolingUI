import React from 'react';
import s from './Messages.module.scss';
import Dialog from './MessageItem';
import MessageRoom from './MessageRoom';

export default function Messages() {
  return (
    <div className={s.main_container}>
      <MessageRoom />
      {/* <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog />
      <Dialog /> */}
    </div>
  );
}
