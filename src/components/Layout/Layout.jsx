import React, { useEffect, useRef, useState } from 'react';
// import Content from '../Content/Content';
// import Footer from '../Footer/Footer';
import Header from './../Header/Header';
import DropDownMenu from '../Header/DropDownMenu';
import classes from './Layout.module.scss';
import { useSelector } from 'react-redux';


const Layout = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser); 
  const userIconRef = useRef();
  const dropDownMenuRef = useRef();

  const dropDownMenuHandler = (e) => {        
    // if(openDropdown && dropDownMenuRef.current && !dropDownMenuRef.current.contains(e.target)){
    //   // console.log("userIconRef.current", userIconRef.current)
    //   // console.log("e.target", e.target)
    //   console.log("CONDITIONS WORKS")      
    //   setOpenDropdown(false)
    // }
    if(!dropDownMenuRef.current.contains(e.target) && !userIconRef.current.contains(e.target)){
      // console.log("userIconRef.current", userIconRef.current)
      // console.log("e.target", e.target)
      console.log("CONDITIONS WORKS")      
      setOpenDropdown(false)
    }
    // if(openDropdown && e.target !== dropDownMenuRef.current){
    //   // console.log("userIconRef.current", userIconRef.current)
    //   // console.log("e.target", e.target)
    //   console.log("dropDownMenuRef.current", dropDownMenuRef.current)       
    //   dropDownMenuRef.current.contains(e.target) ? console.log("CONTAINS") : console.log("NOT CONTAINS")
      
    //   // console.log("HANDLER", e.target)
    //   setOpenDropdown(false) 
    // }
  }
  
  useEffect(() => {    
   
    document.addEventListener("click", dropDownMenuHandler)      
   
    return () => document.removeEventListener("click", dropDownMenuHandler);     
      
  }, [])

  return (
    <>
      <Header setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} isAuth={isAuth} userIconRef={userIconRef} dropDownMenuRef={dropDownMenuRef}/>      
      { isAuth && <DropDownMenu openDropdown={openDropdown} user={user} 
                                dropDownMenuRef={dropDownMenuRef}/> } 
      <div className={classes.container}>{children}</div>
      {/* <Content />
      <Footer /> */}
    </>
  );
};

export default Layout;
