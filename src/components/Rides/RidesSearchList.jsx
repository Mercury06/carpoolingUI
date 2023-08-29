import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { Button } from 'antd';
import { createAsk } from './apiActions';
import cn from 'classnames';
import { CheckIcon } from '../assets/svg/BoxIcons';
import askClickHandler from './Helpers/askFetch';
import { useLocation } from 'react-router-dom';

const RidesSearchList = () => {

  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const rides = useSelector((state) => state.ride.rides);
  const searchRidesParams = useSelector((state) => state.ride.searchRidesParams);
  const {user} = searchRidesParams;
  const {state} = useLocation();
  const askItem = state?.askItem
  console.log("state:", state)
  console.log("askItem in ride details:", askItem)
  
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
                rideItem={item}
                searchRidesParams={searchRidesParams}
                askItem={askItem || null}
                askClickHandler={askClickHandler}
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

export default RidesSearchList;
