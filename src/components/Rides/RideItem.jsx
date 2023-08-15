import React from 'react';
import s from './Rides.module.scss';
import { Link } from 'react-router-dom';
//import avaPhoto from './../../assets/images/ava-rez.jpg';
const moment = require('moment');

const RideItem = (props) => {
  // const onClickItem = () => {
  //     onItem ({id, name, status, species, type, gender, originName, locationName, image, created})
  //     setModal (true);
  //     setSelectedId (onItem);
  // }
  //debugger;
  const { rideItem, askItem, askClickHandler, searchRidesParams } = props;
 
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
          <Link to="/ride-details" state={{rideItem, askItem, searchRidesParams: searchRidesParams || null, pathFrom: "/offers-list"}}>ride details</Link>
        </div>
      </div>
      
    </div>
  );
};

export default RideItem;
