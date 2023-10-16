import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRide, findAsksByIdArray, findConfirmedAsksByIdArray, findMyRidesApiAction } from '../api/actions';
import s from './UserRide.module.scss';
import { useNavigate } from "react-router-dom";
import { setConfirmedAsksActionCreator, setRideAsksActionCreator } from '../../reducers/rideReducer';
import Modal from '../App/Modal/Modal';
import UserRideCard from './UserRideCard';
const moment = require('moment');

const UserRidesContainer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [rides, setRides] = useState(null);
  const[ modalActive, setModalActive ] = useState(false);
  const[ rideForDelete, setRideForDelete] = useState(null);
  const[ ridesListUpdate, setRidesListUpdate ] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await findMyRidesApiAction(id);
      setRides(data);
    }
    fetchData().catch(console.error);
    //console.log("ridesListUpdate:", ridesListUpdate);
  }, [id, ridesListUpdate]);

  const onAsksClickHandler = async (e, item) => {
    e.stopPropagation(); 
    let asksIdArray = item.asks.map( el => el._id);   
    let fetchedAsks = await findAsksByIdArray(asksIdArray);   
    dispatch(setRideAsksActionCreator(fetchedAsks.data));
    navigate("/asks-list", {state: { rideItem: item }});     
  }

  const onConfirmedClickHandler = async (e, item) => {
    e.stopPropagation();
    let confirmedAsksIdArray = item.passengers.map( el => el._id);    
    let fetchedConfirmedAsks = await findAsksByIdArray(confirmedAsksIdArray);    
    dispatch(setConfirmedAsksActionCreator(fetchedConfirmedAsks.data));
    navigate("/confirmed-asks", {state: { rideItem: item }});     
  }

  const prepareRideForDelete = (e, item) => {
    e.stopPropagation();
    //console.log("item from cb:", item);
    setRideForDelete(item);
    setModalActive(true);
  }

  const deleteRideHandler = async (e, rideForDelete) => {
    e.stopPropagation();
    //console.log("rideItem delete handler:", rideForDelete)
    const result = await deleteRide(rideForDelete);
    //console.log("result from delete_ride");
    setModalActive(false);
    setRidesListUpdate(!ridesListUpdate)    
  }

  return (
    <>
    <div className={s.container}>
      {rides && <><h5>You have {rides.length} registered rides</h5></>}
      
      {rides && rides.length > 0 ? (
        rides.map((item, i) => {
          return (  
            <UserRideCard item={item} key={i} onAsksClickHandler={onAsksClickHandler} 
                                              onConfirmedClickHandler={onConfirmedClickHandler}  
                                              prepareRideForDelete={prepareRideForDelete} />
          );
        })
      ) : (
        <div>
          {' '}
          <h3>list is empty</h3>
        </div>
      )}
      
    </div>
    { modalActive && <Modal>
               <h1>Are you shure you want to delete this ride? </h1>
               { rideForDelete.passengers && rideForDelete.passengers.length > 0 && <h1>you have {rideForDelete.passengers.length} registered travelers</h1>}
               <div><button className={s.btn_modal} onClick={(e)=>deleteRideHandler(e, rideForDelete)}>Ok</button></div>
                <div><button className={s.btn_modal} onClick={()=>setModalActive(false)}>Cancel</button></div></Modal>}
    </>
  );
};

export default UserRidesContainer;
