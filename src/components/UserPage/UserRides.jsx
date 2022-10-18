import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './UserPage.module.scss';
const moment = require('moment');

const UserRides = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [rides, setRides] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(`http://localhost:9000/api/settings/findmyrides/${id}`);
  //     const data = await response.data;
  //     if (data) {
  //       setRides(data);
  //     } else {
  //       setRides([
  //         {
  //           localityFrom: {
  //             localityName: 'New Orlean',
  //             id: '6260413bf25174950eb09a52',
  //           },
  //           destination: {
  //             localityName: 'Los Angeles',
  //             id: '626e5943b749f1042b21d252',
  //           },
  //           _id: '63282a5dff6daa6582a18481',
  //           user: '625474cdaeaabfaac86eda54',
  //           seats: 1,
  //           date: '2022-09-19T00:00:00.000Z',
  //           completed: false,
  //           createdAt: '2022-09-19T08:37:49.602Z',
  //           updatedAt: '2022-09-19T08:37:49.602Z',
  //           __v: 0,
  //         },
  //       ]);
  //     }
  //   }
  //   fetchData().catch(console.error);
  // }, [id]);

  useEffect(() => {
    function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function json(response) {
      return response.json();
    }

    fetch(`http://localhost:9000/api/settings/findmyrides/${id}`)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        setRides(data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }, [id]);

  return (
    <div>
      {rides && <h1>Found {rides.length} results</h1>}
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
