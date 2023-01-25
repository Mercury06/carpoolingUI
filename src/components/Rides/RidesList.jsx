import React from 'react';
import AskForm from '../App/Forms/Search/AskForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const RidesList = () => {
  const rides = useSelector((state) => state.ride.rides);
  //const dispatch = useDispatch();
  //console.log('rides from state:', rides);

  useEffect(() => {}, []);
  return (
    <>
      <AskForm />
      <div>
        {(rides !== undefined) & (rides.length > 0) ? (
          <div>
            <h6>rides list</h6>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default RidesList;
