import { askForSeat, createAsk } from "../apiActions";

export default async function askClickHandler(
  e,
  rideItemId,
  askItem,
  searchRidesParams
) {
  e.stopPropagation();
  //   console.log(rideItemId);
  //   console.log(askItem);
  //   console.log(searchRidesParams);

  if (askItem) {
    const applicant = askItem;
    const result = await askForSeat(rideItemId, applicant);
    console.log("ask_without_create:", result);
  } else {
    const createAskResult = await createAsk(searchRidesParams);
    //console.log("createAskResult", createAskResult);
    const applicant = createAskResult.result;
    //console.log("applicant:", applicant);
    const result = await askForSeat(rideItemId, applicant);
    console.log("ask_with_create:", result);
  }
}
