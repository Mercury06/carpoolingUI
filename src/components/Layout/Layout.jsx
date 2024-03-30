import React, { useEffect, useRef, useState } from 'react';

import Header from './../Header/Header';
import DropDownMenu from '../Header/DropDownMenu';
import classes from './Layout.module.scss';
import { useSelector } from 'react-redux';
import NotificationMenu from '../Header/NotificationMenu';
import Footer from '../../temporary/Footer/Footer';
import Content from '../../temporary/Content/Content';


const Layout = ({ children, renderFlag }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);  
  
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser); 
    
  const userIconRef = useRef();
  const dropDownMenuRef = useRef();
  const notificationIconRef = useRef();
  const notificationMenuRef = useRef();  
 

  const menuOnClickHandler = (e) => {    
        
    if(!dropDownMenuRef.current?.contains(e.target) && !userIconRef.current?.contains(e.target)){   
      setOpenDropdown(false)
    } else return
  }  
  const notificationMenuHandler = (e) => {    
        
    if(!notificationIconRef.current?.contains(e.target) && !notificationMenuRef.current?.contains(e.target)){            
      setOpenNotifications(false)      
    } else return   
  } 
  const handleClick = (e) => {  
    menuOnClickHandler(e);
    notificationMenuHandler(e);
  }
  useEffect(() => {          
    document.addEventListener("click", handleClick)    
    return () => {
      document.removeEventListener("click", menuOnClickHandler);
      console.log("UNMOUNT2")    
    }
  }, [])
 

  // const dropDownMenuHandler = (e) => {
  //   console.log("HANDLEr1")     
  //   if(!dropDownMenuRef.current?.contains(e.target) && !userIconRef.current?.contains(e.target)){        
  //     setOpenDropdown(false)
  //   }    
  // }  
  // const notificationMenuHandler = (e) => {    
  //   console.log("HANDLEr2")     
  //   if(!notificationIconRef.current?.contains(e.target) && !notificationMenuRef.current?.contains(e.target)){        
  //     setOpenNotifications(false)
  //   }    
  // }  
  // useEffect(() => {      
  //   document.addEventListener("click", dropDownMenuHandler)    
  //   return () => {
  //     document.removeEventListener("click", dropDownMenuHandler);
  //     console.log("UNMOUNT1")    
  //   }
  // }, [])

  // useEffect(() => {          
  //   document.addEventListener("click", notificationMenuHandler)    
  //   return () => {
  //     document.removeEventListener("click", notificationMenuHandler);
  //     console.log("UNMOUNT2")    
  //   }
  // }, [])

  return (
    <>
      <Header setOpenNotifications={setOpenNotifications} setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} isAuth={isAuth} userIconRef={userIconRef} notificationIconRef={notificationIconRef}/>      
      { isAuth && <DropDownMenu openDropdown={openDropdown} user={user} 
                                dropDownMenuRef={dropDownMenuRef}/> } 
      { isAuth && <NotificationMenu openNotifications={openNotifications} notificationMenuRef={notificationMenuRef}/>}                         
      <div className={classes.container}>{children}</div>
      {renderFlag && <Content />}
      {renderFlag && <Footer />}
      {/* <Content />
      <Footer /> */}
    </>
  );
};

export default Layout;
