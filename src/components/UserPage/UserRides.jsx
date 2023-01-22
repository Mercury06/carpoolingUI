import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setUserRidesAction } from '../../reducers/rideReducer';
import s from './UserPage.module.scss';
const moment = require('moment');

const UserRides = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [rides, setRides] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:9000/api/settings/findmyrides/${id}`);
      const data = response.data;
      setRides(data);
      //debugger;
    }
    fetchData().catch(console.error);
  }, [id]);

  return (
    <div>
      {rides && <h1>Found {rides.length} results</h1>}
      {id && <h1>user id: {id}</h1>}
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
