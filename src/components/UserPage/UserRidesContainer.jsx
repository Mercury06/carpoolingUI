import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findAsksByIdArray, findMyRidesApiAction } from '../api/actions';
import s from './UserPage.module.scss';
import { useNavigate } from "react-router-dom";
import { setRideAsksActionCreator, setRideOffersActionCreator } from '../../reducers/rideReducer';
import UserRide from './UserRide';
const moment = require('moment');

const UserRidesContainer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [rides, setRides] = useState(null);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await findMyRidesApiAction(id);
      setRides(data);
    }
    fetchData().catch(console.error);
  }, [id]);

  const onAsksClickHandler = async (e, item) => {
    e.stopPropagation();
    console.log("onAsksClickHandler:", item)
    //const id = item._id;    
    const asksIdArray = item.asks.map( el => el._id);    
    console.log("asksIdArray:", asksIdArray)
    const fetchedAsks = await findAsksByIdArray(asksIdArray);    
    console.log("fetchedAsks:", fetchedAsks)
    dispatch(setRideAsksActionCreator(fetchedAsks));
    navigate("/asks-list", {state: { rideItem: item }});     
  }

  return (
    <div className={s.container}>
      {rides && <h5>Found {rides.length} rides</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {rides && rides.length > 0 ? (
        rides.map((item, i) => {
          return (
            <UserRide item={item} key={i} onAsksClickHandler={onAsksClickHandler} />
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

export default UserRidesContainer;
