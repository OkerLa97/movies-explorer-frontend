import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import {initialFilms} from "../../utils/constants";

class Movies extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    return (
      <>
        <Header route={this.props.route}/>
        <SearchForm />
        <MoviesCardList films={initialFilms} isSavedMovies={this.props.isSavedMovies} />
        <Footer />
      </>
    );
  }
}

export default Movies;
