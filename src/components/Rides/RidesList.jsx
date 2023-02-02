import React, { useState } from 'react';
import AskForm from '../App/Forms/Search/AskForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { Button, Space } from 'antd';

const RidesList = () => {
  const rides = useSelector((state) => state.ride.rides);

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
                {/* <Link to="/subscribe">subscribe</Link> */}
                <Space wrap>
                  <Button type="primary" style={{ backgroundColor: 'gray', borderRadius: '1px' }}>
                    Subscribe
                  </Button>
                </Space>
              </h4>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default RidesList;
