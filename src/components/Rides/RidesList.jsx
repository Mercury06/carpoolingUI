import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { Button } from 'antd';
import { askForSeat, createAsk } from './apiActions';
import cn from 'classnames';
import { CheckIcon } from '../assets/svg/BoxIcons';

const RidesList = () => {

  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const rides = useSelector((state) => state.ride.rides);
  const searchRidesParams = useSelector((state) => state.ride.searchRidesParams);
  const {user} = searchRidesParams;
  

  async function addAskToRideHandler(e, rideId) {
    e.stopPropagation();
    // console.log("INSIDE HANDLER")
    // console.log("rideId:", rideId)
    // console.log("user:", user)
    // console.log("searchRidesParams:", searchRidesParams)
    //const startTime = new Date ();
    const createAskResult = await createAsk(searchRidesParams);
    const applicant = createAskResult.result;
    //console.log("applicant:", applicant)
    await askForSeat(rideId, applicant);  
    //const endTime = new Date ();
    //console.log("result_time:", endTime - startTime);
     
  }

  const subscribeHandler = async (e) => {
    e.stopPropagation();
    setLoading(true);
    console.log(e.currentTarget);
    const result = await createAsk(searchRidesParams);
    if (result.status === 'OK') {
      setTimeout(() => {
        console.log('result:', result.status);
        setLoading(false);
        setFetched(true);
      }, 1000);
    }
    return;
  };

  return (
    <div className={s.list}>
      <div>
        {rides.length > 0 ? (
          <div className={s.itemsBlock}>
            {rides.map((item) => (
              <RideItem
                key={item._id}
                itemId={item._id}
                pointA={item.localityFrom.localityName}
                pointB={item.destination.localityName}
                seats={item.seats_available}
                date={item.date}
                addAskToRideHandler={addAskToRideHandler}
              />
            ))}
          </div>
        ) : (
          <div className={s.subscribe}>
            <center>
              <h4>
                didn`t find a trip? just {'  '}
                <br></br>
                {fetched ? (
                  <CheckIcon />
                ) : (
                  <Button
                    type="primary"
                    onClick={subscribeHandler}
                    //style={{ backgroundColor: 'gray', borderRadius: '1px' }}
                    className={cn(s.button, {
                      [s.button__loading]: loading === true,
                    })}
                  >
                    <span className={s.button__text}>SUBSCRIBE</span>
                  </Button>
                )}
              </h4>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default RidesList;
