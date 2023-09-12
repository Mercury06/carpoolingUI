import React, { useEffect, useState } from 'react';
import s from './Rides.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { findRideById } from './apiActions';
const moment = require('moment');

const ConfirmedOffer = (props) => {
    
  //debugger;
  const { } = props;
  const [confirmedOffer, setConfirmedOffer] = useState(null);
  const {state} = useLocation();
  const { item, confirmedOfferId } = state;
  const navigate = useNavigate();
//   console.log("confirmedOfferId:", confirmedOfferId);
//   console.log("confirmedOffers in useState:", confirmedOffer);
 
    useEffect(() => {
        async function fetchData() {
        const data = await findRideById(confirmedOfferId);
        setConfirmedOffer(data);
        }
        fetchData().catch(console.error); //edit
    }, [confirmedOfferId]); 

    const removeHandler = () => {
        
    }

  return (
    <>
    {
        confirmedOffer ? 
        (<div className={s.ride_container}>          

            <div className={s.content}>
              <div>Confirmed Offer</div>
              <div>
                <b>itemId: </b>
                {confirmedOffer[0]._id}{' '}
              </div>
              <div>
                <b>from: </b>
                {confirmedOffer[0].localityFrom.localityName}{' '}
              </div>
              <div>
                <b>to: </b>
                {confirmedOffer[0].destination.localityName}{' '}
              </div>
              <div>
                <b>seats: </b>
                {confirmedOffer[0].seats_available}{' '}
              </div>
              <div>
                <b>date:</b>
                {moment(confirmedOffer[0].date).format('DD-MMM-YYYY')}{' '}
              </div>
              <div>
                <button onClick={() => navigate(-1)}>Back</button>
              </div>
              <div>
                <button onClick={() => removeHandler()}>Remove</button>
              </div>          
              {/* <div>
                <Link to="/ask-details" state={{ askItem, rideItem, searchRidesParams: searchRidesParams || null }}>ask details</Link>
              </div> */}
              
            </div>
            
          </div>) : (
            <div>
              {' '}
              <h3>list is empty</h3>          
            </div>
          )
    }
    </>
    
  );
};

export default ConfirmedOffer;
