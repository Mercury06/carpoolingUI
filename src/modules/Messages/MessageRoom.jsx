import React, { useEffect, useState } from 'react';
import s from './Messages.module.scss';
// import Dialog from './MessageItem';
//import TextArea from 'antd/es/input/TextArea';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { fetchDialog, sendMessage } from '../../components/api/actions';
import { useSelector } from 'react-redux';


export default function MessageRoom(props) {
  const author = useSelector((store) => store.user.currentUser);
  console.log("author:", author)
  const navigate = useNavigate();
  const [dialogId, setDialogId] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");  
  console.log("message text:", text)
  // console.log("state in MessageRoom:", props.state)
  const refferedAskId = props.state.askItem._id;
  const driver = props.state.rideItem.user;
  const passenger = props.state.askItem.user;
  const referedAskId = props.state.askItem._id;
  // console.log("refferedAskId", refferedAskId);
  // console.log("dialogId", dialogId);
  // console.log("messages", messages);

  const payload = {
    participants: [driver, passenger],
    referedAsk: referedAskId,
    author: author.id,
    content: text,    
  };

  useEffect(() => {
    async function fetchMessages(payload) {
      let result = await fetchDialog (payload);
      // if (result) {
      //   setDialogId(result.data.data._id);
      //   setMessages(result.data.data.body);
      // }
      // setMessages(result.data);
      console.log("result in useEffect:", result);
    };
    fetchMessages(payload)
  }, [refferedAskId]); //id?

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
              { messages && messages.length > 0 && messages.map((item, i) => {
                return (            
                  <p key={i}>messages: {messages.content}</p>       
                );
              })}             
            </div>            
        </div>
        
        <div className={s.input_message_container}>
            <Input value={text} setTextValue={setText} />
            <button onClick={onSendMessage}>Send</button>
        </div>
       
    </div>
  );
}
