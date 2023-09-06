import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from './Rides.module.scss';
import AskItem from './AskItem';


const ConfirmedAsksList = (props) => {

  const {state} = useLocation();    
  const { rideItem } = state;
  const asks = useSelector((state) => state.ride.confirmedAsks);  
  console.log("state:", state)
  // console.log("offers from store:", offers)
  

  return (    
    <div className={s.list}>      
      <div>
        <div><h1>confirmed asks list</h1></div>
        {asks.length > 0 ? (
          <div className={s.itemsBlock}>
            {asks.map((item) => (
              <AskItem
                key={item._id}
                askItem={item}
                searchRidesParams={null}
                rideItem={rideItem}
              />
            ))}
          </div> ) : (<div>empty list</div>)}
      </div>
       
    </div>
  );
};

export default ConfirmedAsksList;
