import React, { useEffect, useState } from 'react';
import s from './Messages.module.scss';
import Dialog from './Dialog';
import { useNavigate } from 'react-router-dom';

export default function Dialogs() {

  const [userDialogs, setUserDialogs] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // async function fetchData() {
    //   const data = await findMyRidesApiAction(id);
    //   setRides(data);
    // }
    // fetchData().catch(console.error);
    // console.log("ridesListUpdate:", ridesListUpdate);
  }, []);

  return <div className={s.main_container}>
    <div>
            <Dialog />
            <Dialog />
            <Dialog />
            <Dialog />
            <Dialog />

    </div>
    <div>
      <button onClick={()=>navigate("/messages")}>message room</button>
    </div>
            
          </div>  
}
