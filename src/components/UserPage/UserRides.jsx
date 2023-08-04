import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findMyRidesApiAction } from '../api/actions';
//import { Card, Space } from 'antd';
import s from './UserPage.module.scss';

const moment = require('moment');


const UserRides = () => {
  const user = useSelector((state) => state.user.currentUser);

  const id = user.id;
  const [rides, setRides] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      const data = await findMyRidesApiAction(id);

      setRides(data);
    }
    fetchData().catch(console.error);
  }, [id]);
  //console.log("fetched rides:", rides)
  return (
    <div className={s.container}>
      {rides && <h5> You have {rides.length} rides</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {rides && rides.length > 0 ? (
        rides.map((item, i) => {
          return (
            <div className={s.content} key={i}>
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
              <p>
                <strong>asks:</strong> {item.asks.length}
              </p>
            </div>
            
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

export default UserRides;
