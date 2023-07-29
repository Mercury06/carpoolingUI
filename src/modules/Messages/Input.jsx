import React from 'react';
import s from './Messages.module.scss';
// import Dialog from './MessageItem';

export default function Input() {
  return (
    <div className={s.input_message}>
        <input
        type="text"
        placeholder="Type something..."
        // onChange={(e) => setText(e.target.value)}
        onChange={() => {}}
        value={"text"}
      />
    </div>
  );
}



