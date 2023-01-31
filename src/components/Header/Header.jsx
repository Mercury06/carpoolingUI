import React, { useEffect, useState } from 'react';

import { BiMenuAltRight, BiArrowBack } from 'react-icons/bi';

import { FaSearch } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import classes from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

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

  // const searchHandler = (id) => {
  //   setMenuOpen(() => !menuOpen);
  //   findMyRides(id);
  // };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          LOGOTYPE
        </Link>
        {isAuth && (
          <>
            {' '}
            <div
              className={classes.header__content__nav}
              title="logout"
              onClick={() => dispatch(logout())}
            >
              <NavLink to="/login">
                <b>{login}</b>
              </NavLink>
              <BiLogOut />
            </div>
          </>
        )}
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ''
          }`}
        >
          <ul>
            {!isAuth && (
              <>
                <li>
                  <Link to="/registration" onClick={menuToggleHandler}>
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={menuToggleHandler}>
                    Sign in
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <Link to="/myrides" onClick={menuToggleHandler}>
                    My rides
                  </Link>
                </li>
                <li>
                  <Link to="/myhistory" onClick={menuToggleHandler}>
                    History
                  </Link>
                </li>
                <li>
                  <Link to="/create-ride" onClick={menuToggleHandler}>
                    Create Ride
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/ask-ride" onClick={menuToggleHandler}>
                <FaSearch /> <bn></bn>
                Find Ride
              </Link>
            </li>
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
  );
};

export default Header;
