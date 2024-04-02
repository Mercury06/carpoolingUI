import React, { useEffect, useState } from 'react';

import { BiMenuAltRight, BiArrowBack } from 'react-icons/bi';

import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { IoNotificationsOutline } from "react-icons/io5";
import classes from './Header.module.scss';
import logo from "./../assets/img/m_logo.jpg"
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { LogoIcon } from '../assets/svg/BoxIcons';



const Header = ({setOpenDropdown, setOpenNotifications, isAuth, userIconRef, notificationIconRef}) => {
  const notifications = useSelector((state) => state.user.notifications);
  const navigate = useNavigate();  
  const [menuOpen, setMenuOpen] = useState(false);  
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });  
  const user = useSelector((state) => state.user.currentUser);
  const login = user.username;  
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen(() => !menuOpen);
  }; 

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__content}>
          {/* <div className={classes.header__content_logo}>
            <LogoIcon />
          </div> */}
          <div className={classes.header__content_logo}>
            <h1>FOXY</h1>            
          </div>
          <nav
            className={`${classes.header__content__nav} ${
              menuOpen && size.width < 768 ? classes.isMenu : ''
            }`}
          >
            <ul>
              {!isAuth && (
                <>
                  <li>
                    <Link to="/ask-ride" onClick={menuToggleHandler}>
                      <FaSearch size={14} /> 
                      Find
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={menuToggleHandler}>                    
                        <span className={classes.header__content_signin}>Sign in</span>
                    </Link>
                  </li>                  
                </>
              )}
              
              {isAuth && (
                <>
                  <li>
                    <Link to="/ask-ride" onClick={menuToggleHandler}>
                      <FaSearch size={14} />
                      Find
                    </Link>
                  </li>
                  <li>
                    <Link to="/create-ride" onClick={menuToggleHandler}>
                      Create Ride
                    </Link>
                  </li>
                  <li>
                    <Link to="/myrides" onClick={menuToggleHandler}>                    
                      My rides
                    </Link>
                  </li>
                  <li>
                    <Link to="/myasks" onClick={menuToggleHandler} title="ask ride to find driver">
                      My asks
                    </Link>
                  </li>
                  <div className={classes.header__content_manage}>
                    {/* <div className={classes.header__content_manage_icons} onClick={() => navigate("notifications")}> */}
                    <div ref={notificationIconRef} className={classes.header__content_manage_icons} onClick={() => setOpenNotifications(((prev) => !prev))}>
                        <div><IoNotificationsOutline size="24"/></div>
                        <div className={classes.header__content_manage_icons_counter}>{notifications.length}</div>
                    </div>                      
                    
                      <div ref={userIconRef} className={classes.header__content_manage_usericon} onClick={() => setOpenDropdown(((prev) => !prev))}>
                      {/* <div ref={userIconRef} className={classes.header__content_manage_usericon} onClick={(e) => onIconClickHandler(e)}> */}
                        <FaUserCircle size="24"/>
                      </div>                                          
                      {/* <div className={classes.header__content_manage_usericon}  */}
                            {/* // onMouseEnter={() => setOpenDropdown(true)}
                            // onMouseLeave={() => setOpenDropdown(false)} 
                            // onMouseLeave={(e)=>console.log("e", e)} 
                            // onMouseEnter={(e)=>console.log("e.current", e.target, "dropDownMenuRef", dropDownMenuRef.current)}  
                            // onMouseEnter={(e)=>{if(e.target === userIconRef.current) console.log("TRUE")}}                          */}
                            
                            {/* ref={userIconRef} onClick={(e)=>console.log(userIconRef)}> */}
                              {/* <FaUserCircle size="24"/>
                      </div>    */}
                  </div>
                </>
              )}
            </ul>
          </nav>
          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <BiArrowBack onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>     
    </>
  );
};

export default Header;
