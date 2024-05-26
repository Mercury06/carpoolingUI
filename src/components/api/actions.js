import axios from "axios";

// import { setSuggestedRidesActionCreator } from "../../reducers/rideReducer";
import { setNotifications, setUser } from "./../../reducers/userReducer";

const serverApi = axios.create({
  baseURL: "http://localhost:9001",
  // timeout: 5000,
  // headers: {
  //     'Content-Type': 'application/json',
  // }
});

export const registration = ({ ...form }) => {
  // debugger;
  return async (dispatch) => {
    try {
      const response = await serverApi.post("/api/auth/registration", {
        ...form,
      });

      console.log(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const login = ({ ...form }, setFormError) => {
  //debugger;
  return async (dispatch) => {
    try {
      const response = await serverApi
        .post("/api/auth/login", { ...form })
        .catch((err) => setFormError(err.response.data));

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
      }
    } catch (e) {
      console.log("error:", e.response);
      // let message = e.response.data;
      // dispatch(stopSubmit("login", { _error: message }));
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await serverApi.get("/api/auth/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.statusText === "OK" && response.status !== 403) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
        alert("set new token!"); //edit
      } else {
        localStorage.removeItem("token");
        alert("removed token!"); //edit
      }
    } catch (e) {
      console.log("not authorized:", e.response);
      localStorage.removeItem("token");
    }
  };
};

export const fetchNotifications = (userId) => async (dispatch) => {
  try {
    const response = await serverApi
      .get(`/api/busines/find-notifications/${userId}`)
      .then((response) => response.data);
    dispatch(setNotifications(response.notifications));
  } catch (e) {
    console.log(":", e.response);
  }
};

export const findMyRidesApiAction = async (id) => {
  return serverApi.get(`/api/busines/findmyrides/${id}`).then((response) => {
    return response.data;
  });
};

export const deleteRide = async (rideItemId) => {
  //debugger;
  try {
    const response = await serverApi.post("/api/busines/delete-ride", {
      payload: rideItemId,
    });
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const findOffers = async (offersIdArray) => {
  // debugger;
  return serverApi
    .post("/api/busines/findoffers", offersIdArray)
    .then((response) => {
      return response.data;
    });
};

export const findAsksByIdArray = async (asksIdArray) => {
  // debugger;
  return serverApi
    .post("/api/busines/findasks", asksIdArray)
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    });
};

export const findMyAsksApiAction = async (id) => {
  return serverApi.get(`/api/busines/findmyask/${id}`).then((response) => {
    return response.data;
  });
};

export const findAskItemApiAction = async (id) => {
  return serverApi.get(`/api/busines/findaskbyid/${id}`).then((response) => {
    return response.data;
  });
};

export const findLocs = async () => {
  //debugger
  try {
    const response = await serverApi.get("/api/busines/findlocs");
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
    const response = await serverApi.post("/api/busines/fetch-dialog", {
      ...payload,
    });
    return response;
  } catch (e) {
    console.log("error:", e);
  }
};

export const sendMessage = async ({ ...payload }) => {
  // debugger;

  try {
    const response = await serverApi.post("/api/busines/update-dialog", {
      ...payload,
    });
    console.log("response in action:", response);
    return response;
  } catch (e) {
    console.log("error:", e.response);
  }
};

export async function findLocality(search) {
  console.log("search in actions:", search);
  try {
    const response = await serverApi.get(
      `/api/busines/findlocality?search=${search}`
    );
    return response.data;
  } catch (e) {
    alert(e.message);
  }
}
