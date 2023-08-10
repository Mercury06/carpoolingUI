import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';


const OffersList = () => {

  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  
  const offers = useSelector((state) => state.ride.rideOffers);
  
  //const {user} = searchRidesParams;
  

  useEffect(()=>{

  })

  return (
    <div className={s.list}>
      <div>
        {offers.length > 0 ? (
          <div className={s.itemsBlock}>
            {offers.map((item) => (
              <RideItem
                key={item._id}
                itemId={item._id}
                pointA={item.localityFrom.localityName}
                pointB={item.destination.localityName}
                seats={item.seats_available}
                date={item.date}
                //addAskToRideHandler={addAskToRideHandler}
              />
            ))}
          </div> ) : (<div>empty list</div>)};
      </div>
       
    </div>
  );
};

export default OffersList;
