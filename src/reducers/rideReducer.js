import { findRidesByParamsApiAction } from "./../modules/RideSearchForm/apiActions";

const SET_RIDES = "SET_RIDES";
const SET_SEARCH_RIDES_PARAMS = "SET_SEARCH_RIDES_PARAMS";
const SET_SUGGEST_RIDES = "SET_SUGGEST_RIDES";
const SET_RIDE_OFFERS = "SET_RIDE_OFFERS";

const defaultState = {
  rides: [],
  searchRidesParams: [],
  suggestedRides: [],
  rideOffers: [],
};

export default function rideReducer(state = defaultState, action) {
  //debugger;
  switch (action.type) {
    case SET_RIDES:
      return {
        ...state,
        rides: action.payload,
      };
    case SET_SEARCH_RIDES_PARAMS:
      return {
        ...state,
        searchRidesParams: action.payload,
      };
    case SET_SUGGEST_RIDES:
      return {
        ...state,
        suggestedRides: action.payload,
      };
    case SET_RIDE_OFFERS:
      return {
        ...state,
        rideOffers: action.payload,
      };

    default:
      return state;
  }
}

export const setRidesActionCreator = (rides) => ({
  type: SET_RIDES,
  payload: rides,
});
export const setSearchRidesParamsActionCreator = (params) => ({
  type: SET_SEARCH_RIDES_PARAMS,
  payload: params,
});
export const setSuggestedRidesActionCreator = (rides) => ({
  type: SET_SUGGEST_RIDES,
  payload: rides,
});
export const setRideOffersActionCreator = (offers) => ({
  type: SET_RIDE_OFFERS,
  payload: offers,
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
