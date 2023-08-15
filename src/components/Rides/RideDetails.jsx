import React, { useEffect, useState } from 'react';
import s from './Rides.module.scss';
import askClickHandler from './Helpers/askClickHandler';
import { useLocation, useNavigate } from 'react-router-dom';
const moment = require('moment');




const RideDetails = () => {    
    
    const {state} = useLocation();   
    const navigate = useNavigate();    

    const onBackClickHandler = () => {
        navigate(-1)    
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
        <div>
            <p>you have already sent request</p>
        </div>
        <div>
          <button disabled={true} onClick={(e) => askClickHandler(e, state.rideItem._id, state.askItem, state.searchRidesParams)}>ask</button>
        </div>
        <div>
          <button onClick={onBackClickHandler}>Back</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
