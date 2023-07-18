import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./../api/actions";
import Layout from "../Layout/Layout.jsx";
import UserRides from "../UserPage/UserRides.jsx";
// import MainPage from '../MainPage/MainPage.jsx';
// import Login from "./Forms/Autorization/Login.jsx";
// import Registration from "./Forms/Autorization/Registration.jsx";
import RidesList from "../Rides/RidesList";
//import SubscribePage from '../UserPage/subcribePage';
import AskForm from "./../../modules/RideSearchForm/index";
import RideCreateForm from "./../../modules/RideCreateForm/index";
import UserAsks from "../UserPage/UserAsks";
import Messages from "../../modules/Messages/Messages";
import LoginForm from "./Forms/Autorization/LoginForm";
import RegistrationForm from "./Forms/Autorization/RegistrationForm";

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
        {isAuth && <Route path="myrides" element={<UserRides />} />}
        {isAuth && <Route path="myasks" element={<UserAsks />} />}
        {isAuth && <Route path="messages" element={<Messages />} />}
        {!isAuth && (
          <Route path="myrides" element={<Navigate to="/" replace />} />
        )}
        {isAuth && (
          <Route
            path="login"
            element={<Navigate to="/create-ride" replace />}
          />
        )}
        {isAuth && (
          <Route path="/" element={<Navigate to="/create-ride" replace />} />
        )}
        {!isAuth && (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {isAuth && <Route path="create-ride" element={<RideCreateForm />} />}
        {isAuth && <Route path="ask-ride" element={<AskForm />} />}
        {isAuth && <Route path="rides-list" element={<RidesList />} />}
        {/* {isAuth && <Route path="subscribe" element={<SubscribePage />} />} */}
      </Routes>
    </Layout>
  );
}

export default App;
