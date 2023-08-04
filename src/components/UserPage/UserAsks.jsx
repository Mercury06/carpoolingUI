import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findMyAsksApiAction } from '../api/actions';
import s from './UserPage.module.scss';
const moment = require('moment');

const UserAsks = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [asks, setAsks] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await findMyAsksApiAction(id);

      setAsks(data);
    }
    fetchData().catch(console.error);
  }, [id]);

  return (
    <div className={s.container}>
      {asks && <h5>Found {asks.length} asks</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {asks && asks.length > 0 ? (
        asks.map((item, i) => {
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
                <strong>offers:</strong> {item.offers.length}
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

export default UserAsks;
