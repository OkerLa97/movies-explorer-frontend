import React from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DESKTOP_MAX_CARDS_CNT, MOBILE_MAX_CARDS_CNT } from "../../utils/constants";

class MoviesCardList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showedFilms: [],
      currentIdx: 0,
    }
  }

  maxCardsCnt = 0;

  componentDidUpdate(prevProps){

    // СБРОС ИНДЕКСА ПРИ ПЕРЕКЛЮЧЕНИИ МЕЖДУ СТРАНИЦАМИ
    if(prevProps.isSavedMovies !== this.props.isSavedMovies){
      this.setState({
        currentIdx: 0,
      })
    }
  }

  // HANDLE функции
  handleMoreClick = () => {
    this.setState({
      currentIdx: this.state.currentIdx + this.maxCardsCnt,
    })
  }

  render(){

    // ОПРЕДЕЛЯЕМ МАКСИМАЛЬНОЕ КОЛИЧЕСТВО КАРТОЧЕК В ЗАВИСИМОСТИ ОТ РАЗМЕРА ЭКРАНА
    this.maxCardsCnt = window.innerWidth >= 768 ? DESKTOP_MAX_CARDS_CNT : MOBILE_MAX_CARDS_CNT;

    let dataPull = this.props.films;
    if(this.props.isSavedMovies) dataPull = this.props.films.filter(film => film.liked);

    // ОПРЕДЕЛЯЕМ КОЛИЧЕСТВО КАРТОЧЕК ДЛЯ ОТОБРАЖЕНИЯ
    let endIdx = this.state.currentIdx + this.maxCardsCnt
    if(endIdx > dataPull.length) endIdx = dataPull.length;

    const showedFilms = dataPull.slice(0, endIdx);

    return (
      <section className="movie-card-list">
        {!this.props.moviesLoaded && <Preloader />}
        {this.props.moviesLoadingError && <p className="movie-card-list__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
        {showedFilms.length === 0 && this.props.moviesLoaded && !this.props.moviesLoadingError && <p className="movie-card-list__error">Ничего не найдено</p>}
        {showedFilms.map((film, index) => {
          if(this.props.isSavedMovies){

            if(film.liked) return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies} onLikeClick={this.props.onLikeClick}/>
            else return false;

          } else return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies} onLikeClick={this.props.onLikeClick}/>
          //return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies} onLikeClick={this.props.onLikeClick}/>
        })}
        {endIdx !== dataPull.length && <button className="movie-card-list__more-button" onClick={this.handleMoreClick}>Ещё</button>}
      </section>
    )
  }
}

export default MoviesCardList;
