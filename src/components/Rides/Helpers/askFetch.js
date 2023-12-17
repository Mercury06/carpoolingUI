import { askForSeat, createAsk } from "../apiActions";

export default async function askFetch(state) {
  //debugger;

  const rideItem = state.rideItem;
  const askItem = state.askItem;
  const searchRidesParams = state.searchRidesParams;
  // console.log("rideItemId:", rideItemId);
  // console.log("askItem:", askItem);
  // console.log("searchRidesParams:", searchRidesParams);
  if (askItem) {
    const applicant = askItem;
    const result = await askForSeat(rideItem, applicant);
    console.log("ask_without_create:", result);
    return result;
  } else {
    const createAskResult = await createAsk(searchRidesParams);
    //console.log("createAskResult", createAskResult);
    const applicant = createAskResult.result;
    //console.log("applicant:", applicant);
    const result = await askForSeat(rideItem, applicant);
    console.log("ask_with_create:", result);
    return { result, applicant };
  }
}
