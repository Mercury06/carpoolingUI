import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RideItem from './RideItem';
import s from './Rides.module.scss';
import { useLocation } from 'react-router-dom';
import { askForSeat } from './apiActions';

import askClickHandler from './Helpers/askClickHandler';



const OffersList = (props) => {

  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const {state} = useLocation();  
  
  const offers = useSelector((state) => state.ride.rideOffers);
  const { askItem } = state;
  
  

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
                askClickHandler={askClickHandler}
              />
            ))}
          </div> ) : (<div>empty list</div>)};
      </div>
       
    </div>
  );
};

export default OffersList;
