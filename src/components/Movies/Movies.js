import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

class Movies extends React.Component {

  static contextType = CurrentUserContext;

  render() {

    let searchQuery = this.props.searchQuery;
    let isShortFilms = this.props.isShortFilms;

    if(this.props.route === "movies"){
      searchQuery = localStorage.getItem("searchQuery");
      if(!searchQuery) searchQuery = "";
      isShortFilms = localStorage.getItem("isShortFilms") === "true";
    }

    return (
      <>
        <Header route={this.props.route}/>
        <main>
          <SearchForm onSearchSubmit={this.props.onSearchSubmit} searchQuery={searchQuery} isShortFilms={isShortFilms} route={this.props.route}/>
          <MoviesCardList films={this.props.movies} searchQuery={this.props.searchQuery} moviesLoaded={this.props.moviesLoaded} moviesLoadingError={this.props.moviesLoadingError} onLikeClick={this.props.onLikeClick} isSavedMovies={this.props.isSavedMovies} />
        </main>
        <Footer />
      </>
    );
  }
}

export default Movies;
