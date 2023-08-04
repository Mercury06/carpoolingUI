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

export const askForSeat = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/settings/addasktoride",
      {
        ...form,
      }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};
