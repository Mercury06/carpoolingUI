import { useDispatch } from "react-redux";
import { setRideOffersActionCreator } from "../../../reducers/rideReducer";

//export default function sendOnWorker() {
// const dispatch = useDispatch();
//("use strict");
onmessage = (e) => {
  //const data = e.data;
  //console.log("data:");

  console.log("e:", e.data);
  //console.log("self:", self);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
  xhr.responseType = "json";
  xhr.onload = function () {
    const data = xhr.response;
    console.log("response:", data);
  };
  xhr.onerror = () => {
    console.log("onerror:", xhr.response);
  };
  xhr.send();
  //dispatch(setRideOffersActionCreator(fetchedOffers))
};
//}
