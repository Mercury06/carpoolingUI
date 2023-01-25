import React from 'react';
import AskForm from '../App/Forms/Search/AskForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RideItem from './RideItem';

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
    <>
      <AskForm />
      <div>
        {rides.length > 0 ? (
          <div>
            {/* {arr.map((i) => (
              <div>
                <div>data1: {i.city}</div>
                <div>data2: {i.year}</div>
              </div>
            ))} */}
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
    </>
  );
};

export default RidesList;
