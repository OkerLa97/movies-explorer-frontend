import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

class Main extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    return (
      <>
        <Promo loggedIn={this.props.loggedIn}/>
        <main>
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </main>
        <Footer />
      </>
    );
  }
}

export default Main;
