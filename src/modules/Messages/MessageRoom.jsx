import React, { useState } from 'react';
import s from './Messages.module.scss';
// import Dialog from './MessageItem';
//import TextArea from 'antd/es/input/TextArea';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../../components/api/actions';
import { useSelector } from 'react-redux';


export default function MessageRoom() {
  const author = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  console.log("message text:", message)
  const payload = {
    participants: [{}, {}],
    referedRide: {},
    author: author,
    content: message,    
  };

  const onSendMessage = async (e) => {
    e.stopPropagation();
    console.log("payload in handler:", payload);
    await sendMessage(payload);

  }
  return (
    <div className={s.room_container}>
      <button onClick={()=>navigate(-1)}>Back</button>
        <div className={s.text_container}>
            <div className={s.text_container_body}>
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
              <h1>message room</h1>
              <h1>message room</h1>
              <h1>message room</h1>
              <h1>message room</h1>
              <h1>message room</h1>
            </div>
            
        </div>
        
        <div className={s.input_message_container}>
            <Input value={message} setTextValue={setMessage} />
            <button onClick={onSendMessage}>Send</button>
        </div>
       
    </div>
  );
}
