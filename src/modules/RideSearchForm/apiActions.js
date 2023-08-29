import axios from "axios";

export const findRidesByParamsApiAction = async ({
  date,
  localityFrom,
  destination,
}) => {
  //debugger;
  const pointA = localityFrom.localityName;
  const pointB = destination.localityName;
  return axios
    .get(
      `http://localhost:9000/api/settings/findridesbysearchparams?date=${date}&localityFrom=${pointA}&destination=${pointB}`
    )
    .then((response) => {
      return response.data;
    });
};
