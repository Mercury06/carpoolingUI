import React, { useEffect, useState } from 'react';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import classes from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

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

  const ctaClickHandler = () => {
    menuToggleHandler();
    navigate('/page-cta');
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          navbar
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ''
          }`}>
          <ul>
            <li>
              <Link to="/page-one" onClick={menuToggleHandler}>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/page-two" onClick={menuToggleHandler}>
                Войти
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                Запросить поездку
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                + Найти попутчиков
              </Link>
            </li>
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
