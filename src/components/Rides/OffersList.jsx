import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import RideItem from './RideItem';
import s from './Rides.module.scss';


const OffersList = (props) => {

  const {state} = useLocation();    
  const { askItem } = state;
  const offers = useSelector((state) => state.ride.rideOffers);  
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("state:", state)
  // console.log("offers from store:", offers)
  

  return (
    <div className={s.list}>
      <h1>offered rides</h1>
      <div>
        {offers.length > 0 ? (
          <div className={s.itemsBlock}>
            {offers.map((item) => (
              <RideItem
                key={item._id}
                rideItem={item}
                searchRidesParams={null}
                askItem={askItem}
                path={location.pathname}
              />
            ))}
          </div> ) : (<div><div>empty list</div> <button onClick={() => navigate(-1)}>back</button></div>)}
      </div>
       
    </div>
  );
};

export default OffersList;
