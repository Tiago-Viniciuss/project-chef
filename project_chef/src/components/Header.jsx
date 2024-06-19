import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';
import ChangeLanguage from '../components/ChangeLanguage';
import {Trans, useTranslation} from 'react-i18next'

const Header = () => {
  const {t} = useTranslation()
  const navigate = useNavigate();

  function openMenu() {
    const menuNav = document.getElementById('menuNavigation');
    const buttonOpenMenu = document.getElementById('openMenu');

    buttonOpenMenu.style.display = 'none';
    menuNav.classList.toggle('opened');
  }

  function closeMenu() {
    const menuNav = document.getElementById('menuNavigation');
    const buttonOpenMenu = document.getElementById('openMenu');

    buttonOpenMenu.style.display = 'block';
    menuNav.classList.toggle('opened');
  }

  function closeMenuNav() {
    const menuNav = document.getElementById('menuNavigation');
    const buttonOpenMenu = document.getElementById('openMenu');

    buttonOpenMenu.style.display = 'block';
    menuNav.classList.toggle('opened');
  }


  function goToTop() {
    window.scrollTo(0, 0)
  }

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hidden, setHidden] = useState(false);

  /*useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Rolar para baixo
        setHidden(true);
      } else {
        // Rolar para cima
        setHidden(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);*/


  return (
    <div>
      <div id='headerContainer' /*className={`header ${hidden ? 'hidden' : ''}`}*/>
        <header id='header'>
          <button id='openMenu' className='material-symbols-outlined item' onClick={openMenu}>menu</button>
          <h1 id='brandTitle' className='item tangerine-regular'>
            <Link to={'/'} onClick={goToTop}><div id='brandPicture'></div> {t("header.title")} </Link>
          </h1>
        </header>
        <nav id='menuNavigation'>
          <button id='closeMenu' className='material-symbols-outlined' onClick={closeMenu}>close</button>
          <ChangeLanguage/>
          <div id='navigationLinks'>
            <Link to={'/'} onClick={closeMenuNav}>{t("header.menuLink1")}</Link>
            <Link to={'/company-profile-login'}onClick={closeMenuNav}>{t("header.menuLink2")}</Link>
            <Link to={'/candidate-profile-login'} onClick={closeMenuNav}>{t("header.menuLink3")}</Link>
            <Link>{t("header.menuLink4")}</Link>
            <Link>{t("header.menuLink5")}</Link>
            <Link>{t("header.menuLink6")}</Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
