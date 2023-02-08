import axios from 'axios';

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

export const createAsk = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post('http://localhost:9000/api/settings/createask', {
      ...form,
    });
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};
