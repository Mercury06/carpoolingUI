import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './../api/actions';
import Layout from '../Layout/Layout.jsx';
import UserRides from '../UserPage/UserRides.jsx';
//import MainPage from '../MainPage/MainPage.jsx';
import Login from './Forms/Autorization/Login.jsx';
import Registration from './Forms/Autorization/Registration.jsx';
import RideSearchForm1 from './Forms/Search/RideSearchForm1.jsx';
//import Navbar from '../Navbar/Navbar';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  //const store = useStore()
  //console.log("from store:", store.getState())
  // const success = (position) => {
  //   console.log(position);
  // };
  // const error = (err) => {
  //   console.log('error:', err);
  // };
  useEffect(() => {
    dispatch(auth());
  });
  useEffect(() => {
    sessionStorage.setItem('occupation', 'Software dev');
  });

  return (
    <Layout>
      <Routes>
        {!isAuth && <Route path="login" element={<Login />} />}
        {!isAuth && <Route path="registration" element={<Registration />} />}
        {/* <Route path="search" element={<Registration />} /> */}
        {isAuth && <Route path="myrides" element={<UserRides />} />}
        {!isAuth && <Route path="myrides" element={<Navigate to="/" replace />} />}
        {isAuth && <Route path="login" element={<Navigate to="/search" replace />} />}
        {isAuth && <Route path="/" element={<Navigate to="/search" replace />} />}
        {!isAuth && <Route path="/" element={<Navigate to="/login" replace />} />}
        {isAuth && <Route path="search" element={<RideSearchForm1 />} />}
      </Routes>
    </Layout>
  );
}

export default App;
