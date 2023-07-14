import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import rideReducer from "./rideReducer";
import { reducer as formReducer } from "redux-form";
//import appReducer from './appReducer'

const rootReducer = combineReducers({
  ride: rideReducer,
  user: userReducer,
  form: formReducer,
  // app: appReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
