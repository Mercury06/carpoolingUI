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

export const askForSeat = async (rideItemId, applicant) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/settings/addasktoride",
      {
        rideItemId,
        applicant,
      }
    );
    return response.data.result;
  } catch (e) {
    alert(e.response.data.message);
  }
};
