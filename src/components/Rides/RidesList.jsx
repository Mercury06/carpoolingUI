import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { Button } from 'antd';
import { createAsk } from '../api/actions';
import cn from 'classnames';
import { CheckIcon } from '../assets/svg/BoxIcons';

const RidesList = () => {
  const [loading, setLoading] = useState(false);
  const rides = useSelector((state) => state.ride.rides);
  const searchRidesParams = useSelector((state) => state.ride.searchRidesParams);

  const subscribeHandler = async (e) => {
    e.stopPropagation();
    setLoading(true);
    //await createAsk(searchRidesParams);
    return;
  };
  // const wrapperClasses = cn(s.button, {
  //   {s.button--loading}: loading,
  // })

  return (
    <div className={s.list}>
      <div>
        {rides.length > 0 ? (
          <div className={s.itemsBlock}>
            {rides.map((item) => (
              <RideItem
                key={item._id}
                pointA={item.localityFrom.localityName}
                pointB={item.destination.localityName}
                seats={item.seats_available}
                date={item.date}
              />
            ))}
          </div>
        ) : (
          <div className={s.subscribe}>
            <center>
              <h4>
                didn`t find a trip? just {'  '}
                <br></br>
                <Button
                  type="primary"
                  onClick={subscribeHandler}
                  //style={{ backgroundColor: 'gray', borderRadius: '1px' }}
                  //className={cn(s.button, s.success)}
                  //className={s.button}
                  className={cn(s.button, {
                    [s.button__loading]: loading === true,
                  })}
                >
                  <span className={s.button__text}>Subscribe</span>
                </Button>
              </h4>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default RidesList;
