import React, { useEffect, useState } from 'react';

import { BiMenuAltRight, BiArrowBack } from 'react-icons/bi';

import { FaSearch } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineDown } from 'react-icons/ai';

import classes from './Header.module.scss';
import cn from 'classnames';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import avaPhoto from '../assets/img/icons8-customer-50.png';
import { LogoIcon } from '../assets/svg/BoxIcons';


const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);  
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const login = user.username;
  // const currentDir = useSelector( state => state.files.currentDir)
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
          <div className={classes.header__content_logo}>
            <LogoIcon />
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
                      <FaSearch size={14} /> <bn></bn>
                      Find Ride
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={menuToggleHandler}>                    
                        <span >Sign in</span>
                    </Link>
                  </li>                  
                </>
              )}
              
              {isAuth && (
                <>
                  <li>
                    <Link to="/ask-ride" onClick={menuToggleHandler}>
                      <FaSearch size={14} /> <bn></bn>
                      Find Ride
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
                  

                  <li>
                    <NavLink
                      to="/login"
                      className={classes.header__user_link}
                      title="logout"
                      onClick={() => dispatch(logout())}
                    >
                      <BiLogOut size={30} color={'grey'} />
                    </NavLink>
                  </li>
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
