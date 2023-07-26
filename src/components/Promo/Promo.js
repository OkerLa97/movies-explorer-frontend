import React from "react";
import projectLogo from '../../images/project-logo.svg';
import NavTab from "../NavTab/NavTab";

class Promo extends React.Component {

  render(){
    return (
      <header className="promo">
        <NavTab />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__project-logo" src={projectLogo} alt="Логотип Diploma" />
      </header>
    )
  }
}

export default Promo;
