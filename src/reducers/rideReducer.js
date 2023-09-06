import { findRidesByParamsApiAction } from "./../modules/RideSearchForm/apiActions";

const Actions = Object.freeze({
  SET_RIDES: "SET_RIDES",
  SET_SEARCH_RIDES_PARAMS: "SET_SEARCH_RIDES_PARAMS",
  SET_SUGGEST_RIDES: "SET_SUGGEST_RIDES",
  SET_RIDE_OFFERS: "SET_RIDE_OFFERS",
  SET_RIDE_ASKS: "SET_RIDE_ASKS",
  SET_CONFIRMED_ASKS: "SET_CONFIRMED_ASKS",
});
// const SET_RIDES = "SET_RIDES";
// const SET_SEARCH_RIDES_PARAMS = "SET_SEARCH_RIDES_PARAMS";
// const SET_SUGGEST_RIDES = "SET_SUGGEST_RIDES";
// const SET_RIDE_OFFERS = "SET_RIDE_OFFERS";
// const SET_RIDE_ASKS = "SET_RIDE_ASKS";
// const SET_CONFIRMED_ASKS = "SET_CONFIRMED_ASKS";

const defaultState = {
  rides: [],
  searchRidesParams: [],
  suggestedRides: [],
  rideOffers: [],
  rideAsks: [],
  confirmedAsks: [],
};

export default function rideReducer(state = defaultState, action) {
  //debugger;
  switch (action.type) {
    case "SET_RIDES":
      return {
        ...state,
        rides: action.payload,
      };
    case "SET_SEARCH_RIDES_PARAMS":
      return {
        ...state,
        searchRidesParams: action.payload,
      };
    case "SET_SUGGEST_RIDES":
      return {
        ...state,
        suggestedRides: action.payload,
      };
    case "SET_RIDE_OFFERS":
      return {
        ...state,
        rideOffers: action.payload,
      };
    case "SET_RIDE_ASKS":
      return {
        ...state,
        rideAsks: action.payload,
      };
    case "SET_CONFIRMED_ASKS":
      return {
        ...state,
        confirmedAsks: action.payload,
      };
    default:
      return state;
  }
}

export const setRidesActionCreator = (rides) => ({
  type: Actions.SET_RIDES,
  payload: rides,
});
export const setSearchRidesParamsActionCreator = (params) => ({
  type: Actions.SET_SEARCH_RIDES_PARAMS,
  payload: params,
});
export const setSuggestedRidesActionCreator = (rides) => ({
  type: Actions.SET_SUGGEST_RIDES,
  payload: rides,
});
export const setRideOffersActionCreator = (offers) => ({
  type: Actions.SET_RIDE_OFFERS,
  payload: offers,
});
export const setRideAsksActionCreator = (asks) => ({
  type: Actions.SET_RIDE_ASKS,
  payload: asks,
});
export const setConfirmedAsksActionCreator = (asks) => ({
  type: Actions.SET_CONFIRMED_ASKS,
  payload: asks,
});

export const findRidesByParamsThunkCreator = ({ ...form }) => {
  //debugger;
  return async (dispatch) => {
    try {
      const rides = await findRidesByParamsApiAction({ ...form });
      dispatch(setRidesActionCreator(rides));
    } catch (e) {
      alert(e.response.data);
    }
  };
};
