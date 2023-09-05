import React from "react";
import projectLogo from '../../images/project-logo.svg';
import NavTab from "../NavTab/NavTab";
import Header from "../Header/Header";

class Promo extends React.Component {

  render(){
    return (
      <header className="promo">
        {this.props.loggedIn ? <Header route={this.props.route}/> : <NavTab />}
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__project-logo" src={projectLogo} alt="Логотип Diploma" />
      </header>
    )
  }
}

export default Promo;
