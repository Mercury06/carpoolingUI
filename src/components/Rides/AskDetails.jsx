import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import useWorker from './hooks/useWorker';
const moment = require('moment');




const AskDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    // const [rejected, setRejected] = useState(false);
    const {state} = useLocation();
    const askItem = state.askItem;
    const askId = state.askItem._id;   
    const navigate = useNavigate();
    console.log("state inside details:", state)
    // const {refreshData} = useWorker()
    
    

    // useEffect(()=>{
        
    //     let asksIdArray = state.rideItem.asks.map((el) => el._id);
    //     console.log("asksIdArray:", asksIdArray)
    //     asksIdArray.includes(state.askItem?._id) ? setFetched(true) : console.log("NOT INCLUDES")

    // }, [])

      

    // useEffect(() => {

    //   const interval = setInterval(() => {
    //     refreshData(askItem._id)
    //   }, 5000);

    //   return () => {
    //     console.log("return useEffect")
    //     clearInterval(interval)
    //   }        
    // }, []);
   

    
    const onAskClick = async (e, state) => {
        //debugger
        // e.stopPropagation();
        // setLoading(true);
        // const result = await askFetch(state);
        // console.log("result from click:", result.status)
        // if (result.status === "OK") {            
        //     setTimeout(() => {  
        //         setLoading(false);
        //         setFetched(true);
        //     }, 1000)
        // } else {
        //     setRejected(true);
        // }
    }

  return (
   <div className={s.ride_container}>
    <h1>ask details</h1>
        <div >
        <div>
          <b>itemId: </b>
          {askId}{' '}
        </div>
        <div>
          <b>from: </b>
          {state.askItem.localityFrom.localityName}{' '}
        </div>
        <div>
          <b>to: </b>
          {state.askItem.destination.localityName}{' '}
        </div>
        <div>
          <b>seats: </b>
          {state.askItem.seats_available}{' '}
        </div>
        <div>
          <b>date:</b>
          {moment(state.askItem.date).format('DD-MMM-YYYY')}{' '}
        </div>
        { fetched ?
            (<div>
                <p>you have already sent request</p>
            </div>) :
            (<div>      
                <button disabled={loading} onClick={(e) => onAskClick(e, state)}>confirm</button>
            </div>)
        }         
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default AskDetails;
