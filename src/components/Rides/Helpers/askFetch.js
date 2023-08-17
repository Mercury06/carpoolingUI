import { askForSeat, createAsk } from "../apiActions";

export default async function askFetch(
  e,
  state
  // rideItemId,
  // askItem,
  // searchRidesParams
) {
  //debugger;
  e.stopPropagation();

  const rideItemId = state.rideItem._id;
  const askItem = state.askItem;
  const searchRidesParams = state.searchRidesParams;
  console.log("rideItemId:", rideItemId);
  console.log("askItem:", askItem);
  console.log("searchRidesParams:", searchRidesParams);
  if (askItem) {
    const applicant = askItem;
    const result = await askForSeat(rideItemId, applicant);
    console.log("ask_without_create:", result);
    return result;
  } else {
    const createAskResult = await createAsk(searchRidesParams);
    //console.log("createAskResult", createAskResult);
    const applicant = createAskResult.result;
    //console.log("applicant:", applicant);
    const result = await askForSeat(rideItemId, applicant);
    console.log("ask_with_create:", result);
    return result;
  }
}
