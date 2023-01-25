import { findRidesByParamsApiAction } from '../components/api/actions';

const SET_RIDES = 'SET_RIDES';
const SET_SUGGEST_RIDES = 'SET_SUGGEST_RIDES';

const defaultState = {
  rides: [],
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
export const setSuggestedRidesActionCreator = (rides) => ({
  type: SET_SUGGEST_RIDES,
  payload: rides,
});

export const findRidesByParamsThunkCreator = ({ ...form }) => {
  debugger;
  return async (dispatch) => {
    try {
      const rides = await findRidesByParamsApiAction({ ...form });
      console.log('from thunk:', rides);

      dispatch(setRidesActionCreator(rides));
    } catch (e) {
      alert(e.response.data);
    }
  };
};
