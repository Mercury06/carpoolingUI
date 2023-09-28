import React from 'react';
import s from './Messages.module.scss';
// import Dialog from './MessageItem';

export default function Input({textValue, setTextValue}) {
  return (
    <div className={s.input_message}>
        <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
      />
    </div>
  );
}



