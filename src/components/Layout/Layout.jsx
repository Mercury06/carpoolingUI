import React, { useEffect, useRef, useState } from 'react';

import Header from './../Header/Header';
import DropDownMenu from '../Header/DropDownMenu';
import classes from './Layout.module.scss';
import { useSelector } from 'react-redux';
import NotificationMenu from '../Header/NotificationMenu';
import Footer from '../../temporary/Footer/Footer';
import Content from '../../temporary/Content/Content';
import Content2 from '../../temporary/Content2/Content2';


const Layout = ({ children, renderFlag }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);  
  
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser); 
  const notifications = useSelector((state) => state.user.notifications);
    
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
      { isAuth && notifications.length > 1 && <NotificationMenu openNotifications={openNotifications} notificationMenuRef={notificationMenuRef} notifications={notifications} />}                         
      <div className={classes.container}>{children}</div>
      {/* {renderFlag && <Content />} */}
      {renderFlag && <Content2 />}
      {renderFlag && <Footer />}     
    </>
  );
};

export default Layout;
