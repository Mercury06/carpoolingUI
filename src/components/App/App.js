import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Layout from '../Layout/Layout.jsx';
//import MainPage from '../MainPage/MainPage.jsx';
import Login from './Forms/Autorization/Login.jsx';
import Registration from './Forms/Autorization/Registration.jsx';
import RideSearchForm1 from './Forms/Search/RideSearchForm1.jsx';
//import Navbar from '../Navbar/Navbar';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Layout>
      <Routes>
        {/* <Route path="/" exact></Route> */}
        {!isAuth && <Route path="login" element={<Login />} />}
        {!isAuth && <Route path="registration" element={<Registration />} />}
        {/* <Route path="search" element={<Registration />} /> */}
      </Routes>
      {isAuth && <RideSearchForm1 />}
    </Layout>
  );
}

export default App;
