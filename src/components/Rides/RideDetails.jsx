import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';

import { findOffers } from '../api/actions';
import { setRideOffersActionCreator } from '../../reducers/rideReducer';
import useWorker from './hooks/useWorker';
const moment = require('moment');




const RideDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rejected, setRejected] = useState(false);
    //const dispatch = useDispatch();
    const {state} = useLocation();
    const askItem = state.askItem;
    const offerId = state.rideItem._id;   
    const navigate = useNavigate();
    console.log("state inside details:", state)
    // console.log("window:", window.navigator);
    const {askItemRefresh} = useWorker()
    
    

    useEffect(()=>{
        // console.log("state in useEffect:", state.rideItem.asks)
        let asksIdArray = state.rideItem.asks.map((el) => el._id);
        console.log("asksIdArray:", asksIdArray)
        asksIdArray.includes(state.askItem?._id) ? setFetched(true) : console.log("NOT INCLUDES")

    }, [])

    // useEffect(()=>{
    //  if (window.Worker) {
    //   console.log("Worker ok")
    //   const worker = new Worker(new URL("./Helpers/worker.js", import.meta.url))
    //   //console.log("created worker:", worker)
    //   worker.postMessage(state.rideItem)
    //  }
    // }, [])
    

    useEffect(() => {
      
      const interval = setInterval(() => {
        askItemRefresh(askItem._id)
      }, 5000);

      return () => {
        console.log("return useEffect")
        clearInterval(interval)
      }        
    }, []);
   

    
        
    const onBackClickHandler = async (askItem) => {
        //const fetchedOffers = await findOffers(offerId); //ridesID array  should be
        // console.log("fetchedOffers:", fetchedOffers)
        // dispatch(setRideOffersActionCreator(fetchedOffers));
        // navigate("/offers-list", {state: { askItem, message: "updated offers" }})
        navigate(-1);  
        // const result = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        // console.log("resultFetch:", result)
        // const blob = await result.blob()
        // console.log("resultBlob:", blob)
        // const objUrl = URL.createObjectURL(blob)
        // console.log("objUrl:", objUrl)
        // try {
        //   console.log("clicked back")
        //   const result = fetch("http://localhost:9000/api/settings/timer")
        //   console.log("resulty:", result)
        //   console.log("without waiting")

        // } catch (e) {
        //   console.log("e:", e)
        // }

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
          <button onClick={onBackClickHandler}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
