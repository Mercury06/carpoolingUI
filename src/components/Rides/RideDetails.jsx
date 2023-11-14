import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import useWorker from './hooks/useWorker';
import { findRideById } from './apiActions';
const moment = require('moment');




const RideDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [applicant, setApplicant] = useState(null);
    const [rejected, setRejected] = useState(false);
    const {state} = useLocation();    
    const askItem = state.askItem;
    const offerId = state.rideItem._id;   
    const navigate = useNavigate();
    const {refreshData} = useWorker();
    
    

    useEffect(()=>{        
        
        async function fetchData(offerId) {
          const fetchedRideItem = await findRideById(offerId)
          // console.log("fetchedRideItem in useEffect:", fetchedRideItem)
          let asksIdArray = fetchedRideItem.asks.map((el) => el._id);
          // console.log("asksIdArray in useEffect:", asksIdArray)
          asksIdArray.includes(state.askItem?._id) ? setFetched(true) : console.log("NOT INCLUDES")
        }
        fetchData(offerId);//edit
        
    }, [loading, fetched])
      

    // useEffect(() => {

    //   if (askItem) {
    //     const interval = setInterval(() => {
    //       // console.log("askItem._id", askItem._id)
    //       refreshData(askItem._id)
    //     }, 5000);
  
    //     return () => {
    //       console.log("return useEffect")
    //       clearInterval(interval)
    //     }        
    //   }
      
    // }, []);
   

    
    const onAskClick = async (e, state) => {
        //debugger
        console.log("state:", state)
        e.stopPropagation();
        setLoading(true);
        const { result, applicant } = await askFetch(state);
        console.log("result from click:", result.status)
        // console.log("result from click:", result)
        // console.log("applicant from click:", applicant)
        if (result.status === "OK") {   
          console.log("result.status.OK:", result)         
            setTimeout(() => {  
                setLoading(false);
                setFetched(true);
                setApplicant(applicant);
                console.log("applicant after response:", applicant)
            }, 1000)
        } else {
            setRejected(true);
        }
    }

    const onBackClick = () => {
      console.log("applicant:", applicant)
      // let state;
      // navigate("/rides-search", { state: { askItem: applicant || askItem}});
      navigate(state.path, { state: { askItem: applicant || askItem}})
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
          <button onClick={onBackClick}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
