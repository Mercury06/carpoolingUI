import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findMyRidesApiAction } from '../api/actions';
import s from './UserPage.module.scss';
const moment = require('moment');

const SubscribePage = () => {
  // const searchRidesParams = useSelector((state) => state.ride.searchRidesParams);
  // const rideReducer = useSelector((state) => state.ride);
  // const [ridesParams, setRidesParams] = useState(null);
  //console.log('searchRidesParams before useEffect:', searchRidesParams);
  console.log('external');
  useEffect(() => {
    // async function () {
    //     await setRidesParams(searchRidesParams);
    //     console.log('ridesParams:', searchRidesParams);
    // }
    // console.log('searchRidesParams:', searchRidesParams);
    // console.log('rideReducer:', rideReducer);
    console.log('inside useeffect');
  }, []);

  return (
    <div className={s.container}>
      <center>
        <h1>You successfully subscribed!</h1>
      </center>
    </div>
  );
};

export default SubscribePage;
