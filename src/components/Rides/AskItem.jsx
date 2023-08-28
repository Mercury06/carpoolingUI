import React from 'react';
import s from './Rides.module.scss';
import { Link } from 'react-router-dom';
const moment = require('moment');

const AskItem = (props) => {
    
  //debugger;
  const { askItem, searchRidesParams, rideItem } = props;
//   console.log("askItem:", askItem);
//   console.log("searchRidesParams:", searchRidesParams);
//   console.log("rideItem:", rideItem);
 
  return (
    <div className={s}>      

      <div className={s.content}>
        <div>
          <b>itemId: </b>
          {askItem._id}{' '}
        </div>
        <div>
          <b>from: </b>
          {askItem.localityFrom.localityName}{' '}
        </div>
        <div>
          <b>to: </b>
          {askItem.destination.localityName}{' '}
        </div>
        <div>
          <b>seats: </b>
          {askItem.seats_available}{' '}
        </div>
        <div>
          <b>date:</b>
          {moment(askItem.date).format('DD-MMM-YYYY')}{' '}
        </div>        
        <div>
          <Link to="/ask-details" state={{ askItem, rideItem, searchRidesParams: searchRidesParams || null }}>ride details</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default AskItem;
