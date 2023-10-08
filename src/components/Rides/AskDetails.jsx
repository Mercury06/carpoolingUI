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
    const [confirmed, setConfirmed] = useState(false);
    const [rejected, setRejected] = useState(false);
    // const [fetchedAskItem, setFetchedAskItem] = useState(null);
    const {state} = useLocation();
    const { askItem, rideItem } = state;
    // const askId = state.askItem._id;
    // const confirmed = askItem.confirmed && askItem.agreeded[0]._id === rideItem._id;
    const asksIdArray = rideItem.asks.map( el => el._id);   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("state inside details:", state);
    console.log("confirmed?:", confirmed)
    // console.log("askItem.agreeded[0]._id === rideItem._id:", askItem.agreeded[0]._id === rideItem._id)
      
   
    useEffect(() => {
      if (askItem.confirmed && askItem.agreeded[0]._id === rideItem._id) {
        setConfirmed(true);
      }
    }, [confirmed])
    // useEffect(()=>{
    //     async function fetchData(askId){
    //       let result = await findAskItemApiAction(askId);
    //       setFetchedAskItem(result);
    //     };
    //     fetchData(askId);
    // }, [fetched]);

    // useEffect(()=>{        
    //     let confirmedAsksIdArray = rideItem.passengers.map((el) => el._id);
    //     // console.log("confirmedAsksIdArray:", confirmedAsksIdArray)
    //     confirmedAsksIdArray.includes(state.askItem?._id) 
    //     // && fetchedAskItem.confirmed 
    //     // && fetchedAskItem.agreeded[0]._id == rideItem._id 
    //     // ? setFetched(true)
    //     ? console.log("*****MATCHED*****") 
    //     : setFetched(false)
    // }, [])

    
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
        console.log("***confirmHandler clicked***:", state)
        setLoading(true);
        try {
          let fetchedAskItem = await findAskItemApiAction(state.askItem._id);
          console.log("fetchedAskItem***:", fetchedAskItem);
          if (!fetchedAskItem.confirmed){
            const confirmAskResult = await confirmAsk(state);
            console.log("***result from confirm***:", confirmAskResult);
            if (confirmAskResult.status === 200) {
              setConfirmed(true);
            } 
          } else {
            return
          }
        } catch (err) {
          console.log("confirmation exeption:", err);
        } finally {
          setLoading(false);
        }    
    }

  return (
    <>
        <div className={s.ride_container}>
        <h1>ask details</h1>
            <div >
              <div>
                <b>itemId: </b>
                {state.askItem._id}{' '}
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
                confirmed 
                ? <>
                    <p>you confirmed this ask </p>
                    <div>
                      <button onClick={() => navigate("/messages", {state: {askItem: askItem, 
                                                                            rideItem: rideItem, }})}>message</button>                                                                     
                    </div> 
                    <div>
                      <button onClick={(e) => onBackClick(e)}>Back</button>
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
       