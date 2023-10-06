import React, { useEffect, useState } from 'react';
import s from './Rides.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { findRideById, unconfirmAsk } from './apiActions';
const moment = require('moment');

const ConfirmedOffer = () => {
    
  //debugger;
  
  // const [confirmedOffer, setConfirmedOffer] = useState(null);
  const {state} = useLocation();
  console.log("STATE:", state);
  const { askItem, confirmedOffer } = state;
  // const confirmedOfferId = confirmedOfferItem._id;
  
  const navigate = useNavigate();

  const payload = {
    askItem,
    confirmedOffer,
  }
  console.log("payload:", payload);
  console.log("confirmedOffer after useEfect:", confirmedOffer); 
 
    // useEffect(() => {
    //     async function fetchData(confirmedOfferId) {

    //     const data = await findRideById(confirmedOfferId);
    //     setConfirmedOffer(data);
    //     }
    //     fetchData(confirmedOfferId).catch(console.error); //edit
    // }, []); 

    const cancelHandler = async (e) => {
        //console.log("payload in handler:", payload)
        const result = await unconfirmAsk(payload);
        console.log("result:", result);
        navigate("/myasks");
    }

  return (
    <>
    {
        confirmedOffer ? 
        (<div className={s.ride_container}>          

            <div className={s.content}>
              <div>Confirmed Offer</div>
              <div>
                <b>itemId: </b>
                {confirmedOffer._id}{' '}
              </div>
              <div>
                <b>from: </b>
                {confirmedOffer.localityFrom.localityName}{' '}
              </div>
              <div>
                <b>to: </b>
                {confirmedOffer.destination.localityName}{' '}
              </div>
              <div>
                <b>seats: </b>
                {confirmedOffer.seats_available}{' '}
              </div>
              <div>
                <b>date:</b>
                {moment(confirmedOffer.date).format('DD-MMM-YYYY')}{' '}
              </div>
              <div>
              <button onClick={()=>navigate("/messages", {state: {askItem: state.askItem, rideItem: state.confirmedOffer}})}>messages</button>              
              </div>  
              <div>
                <button onClick={() => navigate(-1)}>Back</button>
              </div>
              <div>
                <button onClick={cancelHandler}>Cancel confirm</button>
              </div>          
             
              
            </div>
            
          </div>) : (
            <div>
              {' '}
              <h3>list is empty</h3>          
            </div>
          )
    }
    </>
    
  );
};

export default ConfirmedOffer;
