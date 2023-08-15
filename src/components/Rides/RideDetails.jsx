import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import RideItem from './RideItem';
import s from './Rides.module.scss';
import askClickHandler from './Helpers/askClickHandler';
import { useLocation } from 'react-router-dom';
const moment = require('moment');
// import { askForSeat } from './apiActions';





const RideDetails = () => {    
   
    const {state} = useLocation();
    console.log("state:", state)
    console.log("pathFrom:", state.pathFrom)
    
    console.log("rideItem:", state.rideItem)
    console.log("askItem:", state.askItem)
    console.log("searchRidesParams:", state.searchRidesParams)
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
          <button onClick={(e) => askClickHandler(e, state.rideItem._id, state.askItem, state.searchRidesParams)}>ask</button>
        </div>
        
      </div>

   </div>
  );
};

export default RideDetails;
