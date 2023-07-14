import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

class NavTab extends React.Component {

  render(){
    return (
      <nav className="navtab">
          <Link className="navtab__link" to="/">
            <img className="navtab__logo" src={logo} alt="Логотип Diploma" />
          </Link>
          <div className="navtab__auth">
            <Link className="navtab__register-link" to="/signup">Регистрация</Link>
            <Link className="navtab__login-button" to="/signin">Войти</Link>
          </div>
      </nav>
    )
  }
}

export default NavTab;
