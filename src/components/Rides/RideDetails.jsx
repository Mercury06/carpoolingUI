import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import useWorker from './hooks/useWorker';
const moment = require('moment');




const RideDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rejected, setRejected] = useState(false);
    const {state} = useLocation();
    const askItem = state.askItem;
    const offerId = state.rideItem._id;   
    const navigate = useNavigate();
    //console.log("state inside details:", state)
    const {refreshData} = useWorker()
    
    

    useEffect(()=>{
        
        let asksIdArray = state.rideItem.asks.map((el) => el._id);
        console.log("asksIdArray:", asksIdArray)
        asksIdArray.includes(state.askItem?._id) ? setFetched(true) : console.log("NOT INCLUDES")

    }, [])

      

    useEffect(() => {

      const interval = setInterval(() => {
        refreshData(askItem._id)
      }, 5000);

      return () => {
        console.log("return useEffect")
        clearInterval(interval)
      }        
    }, []);
   

    
    const onAskClick = async (e, state) => {
        //debugger
        e.stopPropagation();
        setLoading(true);
        const result = await askFetch(state);
        console.log("result from click:", result.status)
        if (result.status === "OK") {            
            setTimeout(() => {  
                setLoading(false);
                setFetched(true);
            }, 1000)
        } else {
            setRejected(true);
        }
    }

  return (
   <div className={s.ride_container}>
    <h1>details</h1>
        <div >
        <div>
          <b>itemId: </b>
          {offerId}{' '}
        </div>
        <div>
          <b>from: </b>
          {state.rideItem.localityFrom.localityName}{' '}
        </div>
        <div>
          <b>to: </b>
          {state.rideItem.destination.localityName}{' '}
        </div>
        <div>
          <b>seats: </b>
          {state.rideItem.seats_available}{' '}
        </div>
        <div>
          <b>date:</b>
          {moment(state.rideItem.date).format('DD-MMM-YYYY')}{' '}
        </div>
        { fetched ?
            (<div>
                <p>you have already sent request</p>
            </div>) :
            (<div>      
                <button disabled={loading} onClick={(e) => onAskClick(e, state)}>ask</button>
            </div>)
        }         
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
