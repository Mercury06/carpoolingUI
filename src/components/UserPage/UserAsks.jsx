import React  from 'react';
import s from './UserPage.module.scss';
import { Link } from 'react-router-dom';
const moment = require('moment');

const UserAsks = (props) => {
  const {item, onOffersClickHandler} = props;

  return ( 
            <div className={s.content} key={item._id}>
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
             
              <div className={s.offers_link} onClick={(e)=>onOffersClickHandler(e, item._id)}>
                <div><strong>offers: <p>{item.offers.length}</p></strong> </div>
              </div>
            </div>
  );
}

export default UserAsks;
