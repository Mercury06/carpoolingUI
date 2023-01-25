import axios from 'axios';
import { stopSubmit } from 'redux-form';
import { setSuggestedRidesActionCreator } from '../../reducers/rideReducer';
import { setUser } from './../../reducers/userReducer';

// export const registration = async ({ ...form }) => {
//   //debugger
//   try {
//     //const response = await axios.post("http://localhost:9000/api/auth/registration", { ...form})
//     // console.log(response.data.message)
//   } catch (e) {
//     alert(e.response.data.message);
//   }
// };

export const login = ({ ...form }) => {
  //debugger;
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', { ...form });
      //console.log(response);
      if (response.status === 200) {
        console.log('response.status:', response.status);
        dispatch(setUser(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
    } catch (e) {
      console.log('error:', e);
      let message = e.response.data.message;
      dispatch(stopSubmit('login', { _error: message }));
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:9000/api/auth/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.response.data.message);
      localStorage.removeItem('token');
    }
  };
};

export const createRide = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post('http://localhost:9000/api/settings/createride', {
      ...form,
    });
    return response.data.message;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const createAsk = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post('http://localhost:9000/api/settings/createask', {
      ...form,
    });
    return response.data.message;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const findMyRidesApiAction = (id) => {
  return axios.get(`http://localhost:9000/api/settings/findmyrides/${id}`).then((response) => {
    return response.data;
  });
};

export const findRidesByParamsApiAction = async ({ date, localityFrom, destination }) => {
  //debugger;
  const pointA = localityFrom.localityName;
  const pointB = destination.localityName;
  return axios
    .get(
      `http://localhost:9000/api/settings/findridesby?date=${date}&localityFrom=${pointA}&destination=${pointB}`,
    )
    .then((response) => {
      return response.data;
    });
};

export const findLocs = async () => {
  //debugger
  try {
    const response = await axios.get('http://localhost:9000/api/settings/findlocs');
    const data = response.data;
    console.log(data);
    return data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export function findLocality(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/settings/findlocality?search=${search}`,
      );

      dispatch(setSuggestedRidesActionCreator(response.data));
      return response.data;
    } catch (e) {
      alert(e.message);
      dispatch(setSuggestedRidesActionCreator([]));
    }
  };
}
