import React from "react";
import { Link } from "react-router-dom";

import logo from '../../images/logo.svg';
import IconBurger from "../../images/icon_burger.svg";
import IconAccount from "../../images/icon_account.svg";
import IconMenuClose from "../../images/icon_menu_close.svg";

class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isMenuOpen: false
    }
  }

  handleMenuBurgerClick = () => {
    this.setState({
      isMenuOpen: true
    });
  }

  handleMenuCloseClick = () => {
    this.setState({
      isMenuOpen: false
    });
  }

  render(){
    return (
      <header className="header">
        <div className="header__mobile">
          <Link className="header__link" to="/">
            <img className="header__logo" src={logo} alt="Логотип Diploma" />
          </Link>
          <img className="header__menu-burger" src={IconBurger} onClick={this.handleMenuBurgerClick} alt="Открыть Меню" />
        </div>
        <nav className={this.state.isMenuOpen ? "header__nav header__nav-open" : "header__nav"}>
          <div className="header__nav-mobile-cover" />
          <div className="header__nav-container">
            <img className="header__menu-close" src={IconMenuClose} onClick={this.handleMenuCloseClick} alt="Закрыть Меню" />
            <ul className="header__links">
              <li className="header__link-item">
                <a className="header__link" href="#!">Главная</a>
              </li>
              <li className="header__link-item">
                <Link className={this.props.route === "movies" ? "header__link header__link-active" : "header__link"} to="/movies">Фильмы</Link>
              </li>
              <li className="header__link-item">
                <Link className={this.props.route === "saved-movies" ? "header__link header__link-active" : "header__link"} to="/saved-movies" onClick={this.props.onSavedMoviesOpened}>Сохранённые фильмы</Link>
              </li>
            </ul>
            <div className="header__account">
              <Link className="header__account-link" to="/profile">Аккаунт</Link>
              <img className="header__account-icon" src={IconAccount} alt="Иконка аккаунта" />
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
