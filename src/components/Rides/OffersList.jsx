import React from 'react';
import { useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { useLocation } from 'react-router-dom';



const OffersList = (props) => {

  
  const {state} = useLocation();    
  const { askItem } = state;
  const offers = useSelector((state) => state.ride.rideOffers);  
  console.log("state:", state)
  

  return (
    <div className={s.list}>
      <div>
        {offers.length > 0 ? (
          <div className={s.itemsBlock}>
            {offers.map((item) => (
              <RideItem
                key={item._id}
                rideItem={item}
                searchRidesParams={null}
                askItem={askItem}
              />
            ))}
          </div> ) : (<div>empty list</div>)};
      </div>
       
    </div>
  );
};

export default OffersList;