import { findRidesByParamsApiAction } from '../components/api/actions';

const SET_RIDES = 'SET_RIDES';
const SET_SEARCH_RIDES_PARAMS = 'SET_SEARCH_RIDES_PARAMS';
const SET_SUGGEST_RIDES = 'SET_SUGGEST_RIDES';

const defaultState = {
  rides: [],
  searchRidesParams: [],
  suggestedRides: [],
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

    default:
      return state;
  }
}

export const setRidesActionCreator = (rides) => ({ type: SET_RIDES, payload: rides });
export const setSearchRidesParamsActionCreator = (rides) => ({
  type: SET_SEARCH_RIDES_PARAMS,
  payload: rides,
});
export const setSuggestedRidesActionCreator = (rides) => ({
  type: SET_SUGGEST_RIDES,
  payload: rides,
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
