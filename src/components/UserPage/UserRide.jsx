import React from 'react';
import s from './UserPage.module.scss';

const moment = require('moment');


const UserRide = (props) => {  
  
  const {item, onAsksClickHandler, onConfirmedClickHandler, prepareRideForDelete} = props;
  
  return (
   
            <div className={s.content}>
              <p>
                <strong>id:</strong> {item._id}
              </p>
              <p>
                <strong>from:</strong> {item.localityFrom.localityName}
              </p>
              <p>
                <strong>toward:</strong> {item.destination.localityName}
              </p>
              <p>
                <strong>date:</strong> {moment(item.date).format('DD-MMM-YYYY')}
              </p>
              <p>
                <strong>seats:</strong> {item.seats}
              </p>              
              <div className={s.offers_link} onClick={(e)=>onAsksClickHandler(e, item)}>
                <span>asks: {item.asks.length} </span>
              </div>
              <div className={s.offers_link} onClick={(e)=>onConfirmedClickHandler(e, item)}>
                <span>confirmed: {item.passengers.length} </span>
              </div>
              <div className={s.delete_btn_container} onClick={(e)=> prepareRideForDelete(e, item)}>
                {/* <div className={s.delete_btn} onClick={(item)=> prepareRideForDelete(item)}> */}
                <div className={s.delete_btn}>
                  <center><span>delete</span></center>
                </div>                
              </div>
            </div>            
          );
}        
export default UserRide;
