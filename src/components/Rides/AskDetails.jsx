import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import useWorker from './hooks/useWorker';
import { confirmAsk, modifyAskAfterConfirmApiAction } from './apiActions';
const moment = require('moment');




const AskDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rejected, setRejected] = useState(false);
    const {state} = useLocation();
    const askItem = state.askItem;
    const askId = state.askItem._id;
    const confirmed = state.askItem.confirmed;   
    const navigate = useNavigate();
    // console.log("state inside details:", state)
    // console.log("confirmed flag:", confirmed)
    
    
    

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
   

    
    const confirmHandler = async (e, state) => {
        //debugger
        e.stopPropagation();
        // console.log("confirmHandler:", state)
        //setLoading(true);
        const confirmAskResult = await confirmAsk(state);
        
        //console.log("result from confirm:", result)
        // console.log("result from click:", result.status)
        if (confirmAskResult.status === "OK") {    
          const modifyAskResult = await modifyAskAfterConfirmApiAction(state);        
            setTimeout( () => {  
                setLoading(false);
                setFetched(true);
                //console.log("modifyAskResult:", modifyAskResult)
            }, 1000)
        } else {
            setRejected(true);
        }
    }

  return (
    <div>
         {
      confirmed ? (<div className={s.ride_container}>
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
              <b>seats need: </b>
              {state.askItem.seats_available}{' '}
            </div>
            <div>
              <b>date:</b>
              {moment(state.askItem.date).format('DD-MMM-YYYY')}{' '}
            </div>
            <div>ask confirmed</div>                 
            <div>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
            
          </div>
    
       </div>) : (<div className={s.ride_container}>
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
              <b>seats need: </b>
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
                    <button disabled={loading} onClick={(e) => confirmHandler(e, state)}>confirm</button>
                </div>)
            }         
            <div>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
            
          </div>
    
       </div>)
    }
   
    </div>
   
  );
};

export default AskDetails;
