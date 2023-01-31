import React from 'react';
// import Content from '../Content/Content';
// import Footer from '../Footer/Footer';
import Header from './../Header/Header';

import classes from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
      {/* <Content />
      <Footer /> */}
    </>
  );
};

export default Layout;
