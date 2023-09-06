import React from 'react';
import s from './UserPage.module.scss';

const moment = require('moment');


const UserRide = (props) => {  
  
  const {item, onAsksClickHandler, onConfirmedClickHandler} = props;
  
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
                <div><strong>asks: <p>{item.asks.length}</p></strong> </div>
              </div>
              <div className={s.offers_link} onClick={(e)=>onConfirmedClickHandler(e, item)}>
                <div><strong>confirmed: <p>{item.passengers.length}</p></strong> </div>
              </div>
            </div>            
          );
}        
export default UserRide;
