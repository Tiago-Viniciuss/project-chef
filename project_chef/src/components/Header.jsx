import React from 'react';
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

  return (
    <div>
      <header id='header'>
        <button id='openMenu' className='material-symbols-outlined item' onClick={openMenu}>menu</button>
        <h1 id='brandTitle' className='item'>
          <Link to={'/'} onClick={goToTop}> {t("header.title")} </Link>
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
        <div id='loginButtons'>
          <Link to={'/company-profile-login'}>
            <span className="material-symbols-outlined">login</span>{t("header.companyButton")}
          </Link>
          <Link to={'/candidate-profile-login'}>
            <span className="material-symbols-outlined">login</span>{t("header.candidateButton")}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
