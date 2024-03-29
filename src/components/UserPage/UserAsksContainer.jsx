import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findMyAsksApiAction, findOffers } from '../api/actions';
import s from './UserRide.module.scss';
import { useNavigate } from "react-router-dom";
import { setRideOffersActionCreator } from '../../reducers/rideReducer';
import UserAsk from './UserAsk';
const moment = require('moment');

const UserAsksContainer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [asks, setAsks] = useState(null);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await findMyAsksApiAction(id);
      //console.log("asks inside useeffect:", data)
      setAsks(data);
    }
    fetchData().catch(console.error); //edit
  }, [id]);

  const onOffersClickHandler = async (e, item) => {
    e.stopPropagation();
    //console.log("onOffersClickHandler:", item.offers)
    const id = item._id;
    //const result = asks.find ( i => i._id === id)
    //console.log("offers in find:", result)
    //const offersId = result.offers.map( el => el._id);
    const offersId = item.offers.map( el => el._id);
    console.log("offersId:", offersId)
    const fetchedOffers = await findOffers(offersId);    
    console.log("fetchedOffers:", fetchedOffers)
    dispatch(setRideOffersActionCreator(fetchedOffers));
    navigate("/offers-list", {state: { askItem: item  }});    
  }

  const showConfirmedHandler = async (e, item) => {
    e.stopPropagation();
    console.log("askItem:", item);
    console.log("confirmed_offer:", item.agreeded[0]);
    const confirmedOffer = item.agreeded[0];  
    navigate("/confirmed-offer", {state: { askItem: item, confirmedOffer: confirmedOffer }});    
  }

  return (
    <div className={s.container}>
      {asks && <h5>Found {asks.length} asks passenger side</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {asks && asks.length > 0 ? (
        asks.map((item, i) => {
          return (
            <UserAsk item={item} key={i} onOffersClickHandler={onOffersClickHandler} 
            showConfirmedHandler={showConfirmedHandler} />
          );
        })
      ) : (
        <div>
          {' '}
          <h3>list is empty</h3>          
        </div>
      )}
    </div>
  );
};

export default UserAsksContainer;
