import React from 'react';
// import Content from '../Content/Content';
// import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import DropDownMenu from '../Header/DropDownMenu';
import classes from './Layout.module.scss';


const Layout = ({ children }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  return (
    <>
      <Header setOpenDropdown={setOpenDropdown} />
      { openDropdown && <DropDownMenu /> }  
      <div className={classes.container}>{children}</div>
      {/* <Content />
      <Footer /> */}
    </>
  );
};

export default Layout;
