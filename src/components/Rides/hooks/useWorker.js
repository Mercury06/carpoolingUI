import { findAskItemApiAction, findOffers } from "../../api/actions";
import { setRideOffersActionCreator } from "../../../reducers/rideReducer";
import { useDispatch } from "react-redux";

function useWorker() {
  //debugger;
  //const timer = useRef();
  const dispatch = useDispatch();

  async function refreshData(askItemId) {
    //console.log("askItemId in hook:", askItemId);
    const refreshedAskItem = await findAskItemApiAction(askItemId);
    const offersFromAskArray = refreshedAskItem[0].offers;
    const offersId = offersFromAskArray.map((el) => el._id);
    const fetchedOffers = await findOffers(offersId);
    dispatch(setRideOffersActionCreator(fetchedOffers));
    console.log("dispatched");
  }

  return { refreshData };
}

export default useWorker;
