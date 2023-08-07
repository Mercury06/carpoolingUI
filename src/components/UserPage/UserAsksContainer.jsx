import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findMyAsksApiAction, getOffers } from '../api/actions';
import s from './UserPage.module.scss';
import { Link } from 'react-router-dom';
import UserAsks from './UserAsks';
const moment = require('moment');

const UserAsksContainer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [asks, setAsks] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await findMyAsksApiAction(id);

      setAsks(data);
    }
    fetchData().catch(console.error); //edit
  }, [id]);

  const onOffersClickHandler = async (e, id) => {
    e.stopPropagation();
    alert(id);
    const offers = await getOffers(id);
    console.log("recieved offers:", offers)
  }

  return (
    <div className={s.container}>
      {asks && <h5>Found {asks.length} asks</h5>}
      {/* {id && <h5>user id: {id}</h5>} */}
      {asks && asks.length > 0 ? (
        asks.map((item, i) => {
          return (
            <UserAsks item={item} onOffersClickHandler={onOffersClickHandler} />
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

export default UserAsksContainer;
