import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findMyAsksApiAction } from '../api/actions';
import s from './UserPage.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UserAsks from './UserAsks';
import { setRideOffersActionCreator } from '../../reducers/rideReducer';
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
    //console.log("onOffersClickHandler:", item)
    const id = item._id;
    const result = asks.find ( i => i._id === id)
    const offers = result.offers;
    
    //console.log("offers in find:", offers)
    dispatch(setRideOffersActionCreator(offers));
    navigate("/offers-list", {state: { askItem: item }});
    
  }

  return (
    <div className={s.container}>
      {asks && <h5>Found {asks.length} asks</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {asks && asks.length > 0 ? (
        asks.map((item, i) => {
          return (
            <UserAsks item={item} index={i} onOffersClickHandler={onOffersClickHandler} />
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
