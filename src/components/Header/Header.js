import React from "react";
import logo from '../../images/logo.svg';
import projectLogo from '../../images/project-logo.svg';
import { Link } from "react-router-dom";

class Header extends React.Component {

  render(){
    return (
      <header className="header">
        <div className="header__top">
          <img className="header__logo" src={logo} alt="Логотип Diploma" />
          <div className="header__auth">
            <Link className="header__register-link" to="/signup">Регистрация</Link>
            <Link className="header__login-button" to="/signin">Войти</Link>
          </div>
        </div>
        <h1 className="header__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="header__project-logo" src={projectLogo} alt="Логотип Diploma" />
      </header>
    )
  }
}

export default Header;
