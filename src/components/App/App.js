import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth, fetchNotifications } from "./../api/actions";
import Layout from "../Layout/Layout.jsx";
import { Constants } from "../utils/constants.js";
// import Login from "./Forms/Autorization/Login.jsx";
// import Registration from "./Forms/Autorization/Registration.jsx";
//import SubscribePage from '../UserPage/subcribePage';
import AskForm from "./../../modules/RideSearchForm/index";
import RideCreateForm from "./../../modules/RideCreateForm/index";

import MessageBox from "../../modules/Messages/MessageBox";
import LoginForm from "./Forms/Autorization/LoginForm";
import RegistrationForm from "./Forms/Autorization/RegistrationForm";
import UserAsksContainer from "../UserPage/UserAsksContainer";
import OffersList from "../Rides/OffersList";
import RideDetails from "../Rides/RideDetails";
import RidesSearchList from "../Rides/RidesSearchList";
import UserRidesContainer from "../UserPage/UserRidesContainer";
import AsksList from "../Rides/AsksList";
import AskDetails from "../Rides/AskDetails";
import ConfirmedAsksList from "../Rides/ConfirmedAsksList";
import ConfirmedOffer from "../Rides/ConfirmedOffer";
import Notifications from "../../modules/Messages/Notifications";
// import { sseInitializer } from "../utils/sseInitializer.js";
import { useSseInitializer } from "../utils/useSseInitializer.js";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user.currentUser);
  const [message, setmessage] = useState(null);
  // const eventData = useSseInitializer(isAuth, currentUser);
  useSseInitializer(isAuth, currentUser);
  // console.log("currentUser at top:", currentUser);
  // console.log("eventData at top:", eventData);

  useEffect(() => {
    dispatch(auth());
    console.log("DISPATCHED AUTH");
  }, []);

  useEffect(() => {
    const userId = currentUser.id;
    if (userId) {
      dispatch(fetchNotifications(userId));
    }
  }, [isAuth]);

  // useEffect(() => {
  //   sseInitializer(isAuth);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await eventData;
  //     console.log("data in useeffect: ", data);
  //     setmessage(data);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   let eventSource;
  //   if ("EventSource" in window) {
  //     eventSource = new EventSource(`http://127.0.0.1:3090/stream`);
  //   }
  //   return () => eventSource.close();
  // }, []);
  // useEffect(() => {
  //   let eventSource;
  //   if ("EventSource" in window) {
  //     sseInitializer(eventSource, name);
  //   }
  //   return () => {
  //     // eventSource.removeEventListener("message", handleReceiveMessage);
  //     eventSource.close();
  //   };
  // }, [isAuth]);

  return (
    <Layout>
      <Routes>
        {/* {!isAuth && <Route path="login" element={<Login />} />} */}
        {!isAuth && <Route path="login" element={<LoginForm />} />}
        {!isAuth && (
          <Route path="registration" element={<RegistrationForm />} />
        )}
        {/* <Route path="search" element={<Registration />} /> */}
        {isAuth && <Route path="myrides" element={<UserRidesContainer />} />}
        {isAuth && <Route path="myasks" element={<UserAsksContainer />} />}
        {isAuth && <Route path="messages" element={<MessageBox />} />}
        {isAuth && <Route path="notifications" element={<Notifications />} />}
        {!isAuth && (
          <Route path="myrides" element={<Navigate to="/" replace />} />
        )}
        {isAuth && (
          <Route path="login" element={<Navigate to="/ask-ride" replace />} />
        )}
        {isAuth && (
          <Route path="/" element={<Navigate to="/ask-ride" replace />} />
        )}
        {!isAuth && (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {isAuth && <Route path="create-ride" element={<RideCreateForm />} />}
        {isAuth && <Route path="ask-ride" element={<AskForm />} />}
        {!isAuth && <Route path="ask-ride" element={<AskForm />} />}
        {isAuth && <Route path="rides-search" element={<RidesSearchList />} />}
        {!isAuth && <Route path="rides-search" element={<RidesSearchList />} />}
        {isAuth && <Route path="offers-list" element={<OffersList />} />}
        {isAuth && <Route path="asks-list" element={<AsksList />} />}
        {isAuth && (
          <Route path="confirmed-asks" element={<ConfirmedAsksList />} />
        )}
        {!isAuth && (
          <Route
            path="confirmed-asks"
            element={<Navigate to="/login" replace />}
          />
        )}
        {isAuth && <Route path="ride-details" element={<RideDetails />} />}
        {isAuth && <Route path="ask-details" element={<AskDetails />} />}
        {isAuth && (
          <Route path="confirmed-offer" element={<ConfirmedOffer />} />
        )}
        {/* {isAuth && <Route path="subscribe" element={<SubscribePage />} />} */}
      </Routes>
    </Layout>
  );
}

export default App;
