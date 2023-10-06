import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './Rides.module.scss';
import askFetch from './Helpers/askFetch';
import { confirmAsk } from './apiActions';
import { findAskItemApiAction, findAsksByIdArray } from '../api/actions';
import { useDispatch } from 'react-redux';
import { setRideAsksActionCreator } from '../../reducers/rideReducer';
const moment = require('moment');



const AskDetails = () => {    
    
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [fetchedAskItem, setFetchedAskItem] = useState(null);
    const {state} = useLocation();
    const { askItem, rideItem } = state;
    const askId = state.askItem._id;
    const confirmed = state.askItem.confirmed;
    const asksIdArray = rideItem.asks.map( el => el._id);   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("state inside details:", state)   
    
   
    useEffect(()=>{
        async function fetchData(askId){
          let result = await findAskItemApiAction(askId);
          setFetchedAskItem(result);
        };
        fetchData(askId);
    }, []);

    useEffect(()=>{        
        let confirmedAsksIdArray = state.rideItem.passengers.map((el) => el._id);
        console.log("confirmedAsksIdArray:", confirmedAsksIdArray)
        confirmedAsksIdArray.includes(state.askItem?._id) ? setFetched(true) : setFetched(false)
    }, [])

      

    // useEffect(() => {

    //   const interval = setInterval(() => {
    //     refreshData(askItem._id)
    //   }, 5000);

    //   return () => {
    //     console.log("return useEffect")
    //     clearInterval(interval)
    //   }        
    // }, []);
   

    const onBackClick = async (e) => {
      e.stopPropagation();
      let result = await findAsksByIdArray (asksIdArray); 
      if (result.status == 200 && result.data.length > 0) {
        dispatch(setRideAsksActionCreator(result.data));
        navigate("/asks-list", {state: { rideItem }}); 
      } else {
        navigate(-1);
      }      
    }

    const confirmHandler = async (e, state) => {
        //debugger
        e.stopPropagation();        
        console.log("confirmHandler:", state)
        setLoading(true);
        const confirmAskResult = await confirmAsk(state);
        
        console.log("result from confirm:", confirmAskResult)
        console.log("confirmAskResult.statusText:", confirmAskResult.statusText)
        if (confirmAskResult.statusText === "OK") {                    
            setTimeout( () => {  
                setLoading(false);
                setFetched(true);
                // console.log("modifyAskResult:", modifyAskResult)
            }, 1000)
        } else {
            setRejected(true);
        }
    }

  return (
    <>
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
                <b>seats need: </b>
                {state.askItem.seats_available}{' '}
              </div>
              <div>
                <b>date:</b>
                {moment(state.askItem.date).format('DD-MMM-YYYY')}{' '}
              </div>
              {
                // fetchedAskItem && fetchedAskItem.confirmed
                fetched 
                ? <>
                    <p>you confirmed this ask </p>
                    <div>
                      <button onClick={() => navigate("/messages", {state: {askItem: fetchedAskItem, 
                                                                            rideItem: state.rideItem, }})}>message</button>                                                                     
                    </div> 
                  </>                 
                : <div>
                    <div>
                      <button disabled={loading} onClick={ (e) => confirmHandler(e, state)}>confirm</button>
                    </div>      
                    {/* <div>
                      <button onClick={() => navigate(-1)}>Back</button>
                    </div>                    */}
                    <div>
                      <button onClick={(e) => onBackClick(e)}>Back</button>
                    </div> 
                  </div>               
              }
            </div>
        </div>
       </>)
}     
export default AskDetails;
       