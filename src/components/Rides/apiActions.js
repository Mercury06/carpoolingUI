import axios from "axios";

export const createAsk = async ({ ...form }) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/createask",
      {
        ...form,
      }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const findRideById = async (rideItemId) => {
  //debugger;
  try {
    const response = await axios.get(
      `http://localhost:9000/api/busines/findridebyid/${rideItemId}`
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const askForSeat = async (rideItem, applicant) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/addasktoride",
      {
        rideItem,
        applicant,
      }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const confirmAsk = async (state) => {
  //debugger;
  //console.log("state in debug", state);
  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/confirm-ask",
      { state }
    );
    return response;
  } catch (e) {
    alert(e.response);
  }
};

export const unconfirmAsk = async (payload) => {
  //debugger;
  console.log("state in unconfirmAsk", payload);
  // const rideItem = payload.rideItem;
  // const askItem = payload.askItem;
  // console.log("rideItem in debug", rideItem);
  // console.log("askItem in debug", askItem);

  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/unconfirm-ask",
      { payload }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};
