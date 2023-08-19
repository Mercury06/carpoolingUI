import React, { useEffect, useState } from 'react';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { findOffers } from '../api/actions';
const moment = require('moment');




const RideDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rejected, setRejected] = useState(false);
    const {state} = useLocation();   
    const navigate = useNavigate();
    // console.log("state inside details:", state)

    useEffect(()=>{
        // console.log("state in useEffect:", state.rideItem.asks)
        let asksIdArray = state.rideItem.asks.map((el) => el._id);
        console.log("asksIdArray:", asksIdArray)
        // asksIdArray.includes(state.askItem?._id) ? console.log("INCLUDES") && setFetched(true) : console.log("NOT INCLUDES")
        asksIdArray.includes(state.askItem?._id) ? setFetched(true) : console.log("NOT INCLUDES")

    }, [])

        
    const onBackClickHandler = async () => {
      const fetchedOffers = await findOffers(offerId);
        navigate(-1)  
    }
    
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
          {state.rideItem._id}{' '}
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
          <button onClick={() => onBackClickHandler()}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
