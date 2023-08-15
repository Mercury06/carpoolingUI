import React from 'react';
import s from './Rides.module.scss';
import { Link } from 'react-router-dom';
const moment = require('moment');

const RideItem = (props) => {
    
  //debugger;
  const { rideItem, askItem, searchRidesParams } = props;
 
  return (
    <div className={s} onClick={() => {}}>      

      <div className={s.content}>
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
          <Link to="/ride-details" state={{rideItem, askItem, searchRidesParams: searchRidesParams || null }}>ride details</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default RideItem;
