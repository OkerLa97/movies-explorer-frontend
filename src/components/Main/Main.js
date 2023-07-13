import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";

class Main extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    return (
      <>
        <Header />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </>
    );
  }
}

export default Main;
