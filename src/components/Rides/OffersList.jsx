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
  
  
  //const {user} = searchRidesParams;

  // async function askOnClickHandler(e, rideId) {
  //   e.stopPropagation();
  //   alert("inside offer")
  //   //console.log("itemfromrouter:", askItem)    
  //   await askForSeat(rideId, askItem);           
  // }
  

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
                rideItemId={item._id}
                pointA={item.localityFrom.localityName}
                pointB={item.destination.localityName}
                seats={item.seats_available}
                date={item.date}
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
