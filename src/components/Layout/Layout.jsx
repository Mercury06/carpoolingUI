import React from 'react';
// import Content from '../Content/Content';
// import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import DropDownMenu from '../Header/DropDownMenu';
import classes from './Layout.module.scss';
import { useSelector } from 'react-redux';


const Layout = ({ children }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log("openDropdown in layout:", openDropdown)
  return (
    <>
      <Header setOpenDropdown={setOpenDropdown} isAuth={isAuth} />
      {/* { openDropdown && isAuth && <DropDownMenu openDropdown={openDropdown} /> }   */}
      <DropDownMenu openDropdown={openDropdown} /> 
      <div className={classes.container}>{children}</div>
      {/* <Content />
      <Footer /> */}
    </>
  );
};

export default Layout;
