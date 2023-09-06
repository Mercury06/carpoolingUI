import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./../api/actions";
import Layout from "../Layout/Layout.jsx";
// import Login from "./Forms/Autorization/Login.jsx";
// import Registration from "./Forms/Autorization/Registration.jsx";
//import SubscribePage from '../UserPage/subcribePage';
import AskForm from "./../../modules/RideSearchForm/index";
import RideCreateForm from "./../../modules/RideCreateForm/index";

import MessageBox from "../../modules/Messages/MessageBox";
import LoginForm from "./Forms/Autorization/LoginForm";
import RegistrationForm from "./Forms/Autorization/RegistrationForm";
import Dialogs from "../../modules/Messages/Dialogs";
import UserAsksContainer from "../UserPage/UserAsksContainer";
import OffersList from "../Rides/OffersList";
import RideDetails from "../Rides/RideDetails";
import RidesSearchList from "../Rides/RidesSearchList";
import UserRidesContainer from "../UserPage/UserRidesContainer";
import AsksList from "../Rides/AsksList";
import AskDetails from "../Rides/AskDetails";
import ConfirmedAsksList from "../Rides/ConfirmedAsksList";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  });

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
        {isAuth && <Route path="dialogs" element={<Dialogs />} />}
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
        {isAuth && <Route path="rides-search" element={<RidesSearchList />} />}
        {isAuth && <Route path="offers-list" element={<OffersList />} />}
        {isAuth && <Route path="asks-list" element={<AsksList />} />}
        {isAuth && (
          <Route path="confirmed-asks" element={<ConfirmedAsksList />} />
        )}
        {isAuth && <Route path="ride-details" element={<RideDetails />} />}
        {isAuth && <Route path="ask-details" element={<AskDetails />} />}
        {/* {isAuth && <Route path="subscribe" element={<SubscribePage />} />} */}
      </Routes>
    </Layout>
  );
}

export default App;
