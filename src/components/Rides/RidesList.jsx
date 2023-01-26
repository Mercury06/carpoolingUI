import React from 'react';
import AskForm from '../App/Forms/Search/AskForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RideItem from './RideItem';
import s from './Rides.module.scss';

const RidesList = () => {
  const rides = useSelector((state) => state.ride.rides);
  //const dispatch = useDispatch();
  console.log('rides from state:', rides);
  const arr = [
    { city: 'city1', year: '1971' },
    { city: 'city2', year: '1973' },
  ];

  useEffect(() => {}, []);
  return (
    <div className={s.list}>
      <AskForm />
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
          <div>try again</div>
        )}
      </div>
    </div>
  );
};

export default RidesList;
