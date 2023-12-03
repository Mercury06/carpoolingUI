import axios from "axios";
import { stopSubmit } from "redux-form";
// import { setSuggestedRidesActionCreator } from "../../reducers/rideReducer";
import { setUser } from "./../../reducers/userReducer";

// export const registration = async ({ ...form }) => {
//   //debugger
//   try {
//     //const response = await axios.post("http://localhost:9000/api/auth/registration", { ...form})
//     // console.log(response.data.message)
//   } catch (e) {
//     alert(e.response.data.message);
//   }
// };

export const login = ({ ...form }) => {
  //debugger;
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        { ...form }
      );
      //console.log(response);
      if (response.status === 200) {
        // console.log('response.status:', response.status);
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
      }
    } catch (e) {
      console.log("error:", e);
      let message = e.response.data;
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:9000/api/auth/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log("not authorized:", e.response);
      localStorage.removeItem("token");
    }
  };
};

export const findMyRidesApiAction = async (id) => {
  return axios
    .get(`http://localhost:9000/api/busines/findmyrides/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const deleteRide = async (rideItemId) => {
  //debugger;
  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/delete-ride",
      { payload: rideItemId }
    );
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const findOffers = async (offersIdArray) => {
  // debugger;
  return axios
    .post("http://localhost:9000/api/busines/findoffers", offersIdArray)
    .then((response) => {
      return response.data;
    });
};

export const findAsksByIdArray = async (asksIdArray) => {
  // debugger;
  return axios
    .post("http://localhost:9000/api/busines/findasks", asksIdArray)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    });
};

export const findMyAsksApiAction = async (id) => {
  return axios
    .get(`http://localhost:9000/api/busines/findmyask/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const findAskItemApiAction = async (id) => {
  return axios
    .get(`http://localhost:9000/api/busines/findaskbyid/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const findLocs = async () => {
  //debugger
  try {
    const response = await axios.get(
      "http://localhost:9000/api/busines/findlocs"
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const fetchDialog = async (payload) => {
  // debugger;

  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/fetch-dialog",
      { ...payload }
    );
    return response;
  } catch (e) {
    console.log("error:", e);
  }
};

export const sendMessage = async ({ ...payload }) => {
  // debugger;

  try {
    const response = await axios.post(
      "http://localhost:9000/api/busines/update-dialog",
      { ...payload }
    );
    console.log("response in action:", response);
    return response;
  } catch (e) {
    console.log("error:", e.response);
  }
};

// export function findLocality(search) {
//   return async (dispatch) => {
//     try {
//       function fetchData() {
//         const data = axios.get(`http://localhost:9000/api/settings/findlocality?search=${search}`);
//         return data;
//       }
//       const response = await fetchData();

//       dispatch(setSuggestedRidesActionCreator(response.data));
//       return response.data;
//     } catch (e) {
//       alert(e.message);
//       dispatch(setSuggestedRidesActionCreator([]));
//     }
//   };
// }
// export async function findLocality(search) {
//   debugger;
//   return async (dispatch) => {
//     try {
//       function fetchData() {
//         const data = axios.get(`http://localhost:9000/api/settings/findlocality?search=${search}`);
//         return data;
//       }
//       const response = await fetchData();
//       console.log('response in api:', response);
//       //dispatch(setSuggestedRidesActionCreator(response.data));
//       return response.data;
//     } catch (e) {
//       alert(e.message);
//     }
//   };
// }

export async function findLocality(search) {
  //debugger;

  try {
    const response = await axios.get(
      `http://localhost:9000/api/busines/findlocality?search=${search}`
    );

    console.log("response in api:", response);
    //dispatch(setSuggestedRidesActionCreator(response.data));
    return response.data;
  } catch (e) {
    alert(e.message);
  }
}
