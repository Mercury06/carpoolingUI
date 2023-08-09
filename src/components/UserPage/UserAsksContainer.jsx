import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findMyAsksApiAction } from '../api/actions';
import s from './UserPage.module.scss';
import { Link } from 'react-router-dom';
import UserAsks from './UserAsks';
import { setRideOffersActionCreator } from '../../reducers/rideReducer';
const moment = require('moment');

const UserAsksContainer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [asks, setAsks] = useState(null);
 
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await findMyAsksApiAction(id);
      //console.log("asks inside useeffect:", data)
      setAsks(data);
    }
    fetchData().catch(console.error); //edit
  }, [id]);

  const onOffersClickHandler = async (e, id) => {
    e.stopPropagation();
    //alert(id);
    const result = asks.find ( i => i._id === id)
    const offers = result.offers;
    
    console.log("offers in find:", offers)
    dispatch(setRideOffersActionCreator(offers));
    //setRideOffersActionCreator(offers)
    // console.log("result in find:", result)    
    // console.log("offers in find:", result.offers)
    //const offers = await getOffers(id);
    //console.log("recieved offers:", offers)
  }

  return (
    <div className={s.container}>
      {asks && <h5>Found {asks.length} asks</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {asks && asks.length > 0 ? (
        asks.map((item, i) => {
          return (
            <UserAsks item={item} onOffersClickHandler={onOffersClickHandler} />
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
