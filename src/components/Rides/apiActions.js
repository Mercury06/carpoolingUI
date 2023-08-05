import axios from "axios";

export const createAsk = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/settings/createask",
      {
        ...form,
      }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const askForSeat = async (rideId, applicant) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/settings/addasktoride",
      {
        rideId,
        applicant,
      }
    );
    return response.data.result;
  } catch (e) {
    alert(e.response.data.message);
  }
};
