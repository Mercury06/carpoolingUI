import { useCallback, useRef } from "react";
import { findAskItemApiAction, findOffers } from "../../api/actions";
import { setRideOffersActionCreator } from "../../../reducers/rideReducer";
import { useDispatch } from "react-redux";

function useWorker() {
  //debugger;
  //const timer = useRef();
  const dispatch = useDispatch();

  async function askItemRefresh(askItemId) {
    //console.log("askItemId in hook:", askItemId);
    const refreshedAskItem = await findAskItemApiAction(askItemId);
    console.log("refreshedAskItem:", refreshedAskItem);
    //console.log("Array.isArray(obj):", Array.isArray(refreshedAskItem));
    const offersFromAskArray = refreshedAskItem[0].offers;
    console.log("offersArray:", offersFromAskArray);
    const offersId = offersFromAskArray.map((el) => el._id);
    console.log("offersId in hook:", offersId);
    const fetchedOffers = await findOffers(offersId);
    console.log("fetchedOffers:", fetchedOffers);
    dispatch(setRideOffersActionCreator(fetchedOffers));
    console.log("dispatched");
  }
  //console.log("askItemRefresh:", askItemRefresh);
  return { askItemRefresh };
}

export default useWorker;
