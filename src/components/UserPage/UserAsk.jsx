import React  from 'react';
import s from './UserRide.module.scss';
const moment = require('moment');

const UserAsk = (props) => {
  const {item, onOffersClickHandler, showConfirmedHandler} = props;  
  const confirmed = item.confirmed;
  //console.log("confirmed:", confirmed)

  return ( 
            <div className={s.content}>
               <p>
                <strong>itemId:</strong> {item._id}
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
              {/* {
                confirmed ? (<p>your ask confirmed</p>) : (<div className={s.offers_link} onClick={(e)=>onOffersClickHandler(e, item)}>
                <div><strong>offers: <p>{item.offers.length}</p></strong> </div>
              </div>)
              } */}
              {
                confirmed ? (<div className={s.offers_link} onClick={(e)=>showConfirmedHandler(e, item)}>
                <div><strong><p>your ask confirmed</p></strong> </div>
              </div>) : (<div className={s.offers_link} onClick={(e)=>onOffersClickHandler(e, item)}>
                <div><strong>offers: <p>{item.offers.length}</p></strong> </div>
              </div>)
              }
            </div>
  );
}

export default UserAsk;
