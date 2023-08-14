import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import RideItem from './RideItem';
import s from './Rides.module.scss';
import { useLocation } from 'react-router-dom';
// import { askForSeat } from './apiActions';

// import askClickHandler from './Helpers/askClickHandler';



const RideDetails = (props) => {  
  
    const { rideItem, askItem, askClickHandler, searchRidesParams } = props;
    //const {state} = useLocation(); 
    // const data = location.state;
    const location = useLocation();
    console.log("state as props:", location)
  return (
   <div className={s.ride_container}>
    <h1>details</h1>
        {/* <div >
        <div>
          <b>itemId: </b>
          {rideItem._id}{' '}
        </div>
        <div>
          <b>from: </b>
          {rideItem.localityFrom.localityName}{' '}
        </div>
        <div>
          <b>to: </b>
          {rideItem.destination.localityName}{' '}
        </div>
        <div>
          <b>seats: </b>
          {rideItem.seats_available}{' '}
        </div>
        <div>
          <b>date:</b>
          {moment(rideItem.date).format('DD-MMM-YYYY')}{' '}
        </div>
        <div>
          <button onClick={(e) => askClickHandler(e, rideItem._id, askItem, searchRidesParams)}>ask</button>
        </div>
        
      </div> */}

   </div>
  );
};

export default RideDetails;
