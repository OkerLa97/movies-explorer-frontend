import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

class Movies extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    return (
      <>
        <Header route={this.props.route} onSavedMoviesOpened={this.props.onSavedMoviesOpened}/>
        <main>
          <SearchForm onSearchSubmit={this.props.onSearchSubmit} searchQuery={this.props.searchQuery} isShortFilms={this.props.isShortFilms} route={this.props.route}/>
          <MoviesCardList films={this.props.movies} wasSearchRequest={this.props.wasSearchRequest} searchQuery={this.props.searchQuery} moviesLoaded={this.props.moviesLoaded} moviesLoadingError={this.props.moviesLoadingError} onLikeClick={this.props.onLikeClick} isSavedMovies={this.props.isSavedMovies} />
        </main>
        <Footer />
      </>
    );
  }
}

export default Movies;
