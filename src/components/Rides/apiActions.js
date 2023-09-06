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

export const findRideById = async (rideItemId) => {
  //debugger;
  try {
    const response = await axios.get(
      `http://localhost:9000/api/settings/findridebyid/${rideItemId}`
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
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const confirmAsk = async (state) => {
  //debugger;
  //console.log("state in debug", state);
  const rideItem = state.rideItem;
  const askItem = state.askItem;
  // console.log("rideItem._id in debug", state.rideItem._id);
  // console.log("askItem in debug", state.askItem);
  try {
    const response = await axios.post(
      "http://localhost:9000/api/settings/confirm-ask",
      {
        rideItem,
        askItem,
      }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const modifyAskAfterConfirmApiAction = async (state) => {
  debugger;
  console.log("state in debug", state);
  // const rideItemId = state.rideItem._id;
  // const askItem = state.askItem;
  // console.log("rideItem._id in debug", state.rideItem._id);
  // console.log("askItem in debug", state.askItem);
  // try {
  //   const response = await axios.post(
  //     "http://localhost:9000/api/settings/confirm-ask",
  //     {
  //       rideItemId,
  //       askItem,
  //     }
  //   );
  //   return response.data;
  // } catch (e) {
  //   alert(e.response.data.message);
  // }
};
