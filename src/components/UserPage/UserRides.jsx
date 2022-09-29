import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findMyRides } from '../api/actions';

import s from './UserPage.module.scss';

const UserRides = () => {
  const user = useSelector((state) => state.user.currentUser);
  const id = user.id;
  const [rides, setRides] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log('id:', id);
      const response = await axios.get(`http://localhost:9000/api/settings/findmyrides/${id}`);
      const data = response.data;
      setRides(data);
      console.log('rides_data:', data);
    }
    fetchData();
  }, []);
  return <div className={s.content}>User rides</div>;
};

export default UserRides;
