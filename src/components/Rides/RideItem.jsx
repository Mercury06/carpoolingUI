import React from 'react';
import s from './Rides.module.scss';
//import avaPhoto from './../../assets/images/ava-rez.jpg';
const moment = require('moment');

const RideItem = (props) => {
  // const onClickItem = () => {
  //     onItem ({id, name, status, species, type, gender, originName, locationName, image, created})
  //     setModal (true);
  //     setSelectedId (onItem);
  // }
  //debugger;
  const { itemId, pointA, pointB, seats, date, askItem, addAskToRideHandler } = props;
  return (
    <div className={s} onClick={() => {}}>
      <div className={s.avatar}>hv</div>

      <div className={s.content}>
        <div>
          <b>itemId: </b>
          {itemId}{' '}
        </div>
        <div>
          <b>from: </b>
          {pointA}{' '}
        </div>
        <div>
          <b>to: </b>
          {pointB}{' '}
        </div>
        <div>
          <b>seats: </b>
          {seats}{' '}
        </div>
        <div>
          <b>date:</b>
          {moment(date).format('DD-MMM-YYYY')}{' '}
        </div>
        <div>
          <button onClick={(e) => addAskToRideHandler(e, askItem)}>ask</button>
        </div>
      </div>
      
    </div>
  );
};

export default RideItem;
