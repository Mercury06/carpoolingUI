import React, { useEffect, useState } from 'react';

import { BiMenuAltRight, BiArrowBack } from 'react-icons/bi';

import { FaSearch } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineDown } from 'react-icons/ai';
import { BsChevronCompactDown } from 'react-icons/bs';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import classes from './Header.module.scss';
import cn from 'classnames';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import avaPhoto from '../assets/img/icons8-customer-50.png';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subHeader, setSubHeader] = useState(false);
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
    <>
      <header className={classes.header}>
        <div className={classes.header__content}>
          {/* <Link to="/" className={classes.header__content__logo}>
          LOGOTYPE
        </Link> */}
          {isAuth && (
            <>
              {' '}
              <div className={classes.user_container}>
                <div className={classes.avatar_container}>
                  <img src={avaPhoto} alt="avatar" className={classes.mainPhoto} />
                </div>
                {!subHeader ? (
                  <BsChevronDown
                    onClick={() => setSubHeader(!subHeader)}
                    // onClick={() => alert('touched!')}
                    size={24}
                    color={'grey'}
                    style={{
                      'margin-left': '4px',
                      'margin-top': '12px',
                    }}
                  />
                ) : (
                  <BsChevronUp
                    onClick={() => setSubHeader(!subHeader)}
                    // onClick={() => alert('touched!')}
                    size={24}
                    color={'grey'}
                    style={{
                      'margin-left': '4px',
                      'margin-top': '12px',
                    }}
                  />
                )}

                {/* <div
                className={classes.header__user}
                title="logout"
                onClick={() => dispatch(logout())}
              > */}
                {/* <NavLink to="/login" className={classes.header__user_link}>
                  {login} <BiLogOut />
                </NavLink> */}
                {/* </div> */}
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
                    <Link to="/login" onClick={menuToggleHandler}>
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link to="/registration" onClick={menuToggleHandler}>
                      Sign up
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
              {isAuth && (
                <>
                  <li>
                    <Link to="/create-ride" onClick={menuToggleHandler}>
                      Create Ride
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/myrides" onClick={menuToggleHandler}>
                      My rides
                    </Link>
                  </li>
                  <li>
                    <Link to="/myhistory" onClick={menuToggleHandler}>
                      History
                    </Link>
                  </li> */}

                  <li>
                    <NavLink
                      to="/login"
                      className={classes.header__user_link}
                      title="logout"
                      onClick={() => dispatch(logout())}
                    >
                      <BiLogOut size={36} color={'grey'} />
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
      <header
        className={cn(classes.subHeader, {
          [classes.subHeader__showed]: subHeader === true,
        })}
      >
        {' '}
        <div className={classes.subHeader__content}>
          <nav className={classes.subHeader__content__nav}>
            <ul>
              <>
                <li>
                  <Link to="/myrides" onClick={menuToggleHandler}>
                    My rides
                  </Link>
                </li>
                <li>
                  <Link to="/myhistory" onClick={menuToggleHandler}>
                    Messages
                  </Link>
                </li>
                <li>
                  <Link to="/myhistory" onClick={menuToggleHandler}>
                    History
                  </Link>
                </li>

                <li>
                  <Link to="/myhistory" onClick={menuToggleHandler}>
                    Profile
                  </Link>
                </li>
              </>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
