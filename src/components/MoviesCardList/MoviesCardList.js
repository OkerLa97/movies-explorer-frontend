import React from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  DESKTOP_RESOLUTION,
  DESKTOP_CARDS_CNT,
  DESKTOP_LOAD_MORE_CARDS_CNT,

  TAB_CARDS_CNT,
  TAB_LOAD_MORE_CARDS_CNT,

  MOBILE_RESOLUTION,
  MOBILE_CARDS_CNT,
  MOBILE_LOAD_MORE_CARDS_CNT
} from "../../utils/constants";

class MoviesCardList extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      showedFilms: [],
      currentIdx: 0,
    }

    this.calculateLoadMoreCardsCnt();
    window.addEventListener('resize', this.calculateLoadMoreCardsCnt);
  }

  maxCardsCnt = 0;
  loadMoreCardsCnt = 0;

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
      currentIdx: this.state.currentIdx + this.loadMoreCardsCnt,
    })
  }

  calculateLoadMoreCardsCnt = () => {
    // ОПРЕДЕЛЯЕМ МАКСИМАЛЬНОЕ КОЛИЧЕСТВО КАРТОЧЕК В ЗАВИСИМОСТИ ОТ РАЗМЕРА ЭКРАНА
    this.maxCardsCnt = DESKTOP_CARDS_CNT;
    this.loadMoreCardsCnt = DESKTOP_LOAD_MORE_CARDS_CNT;
    if(window.innerWidth <= DESKTOP_RESOLUTION && window.innerWidth > MOBILE_RESOLUTION){
      this.maxCardsCnt = TAB_CARDS_CNT;
      this.loadMoreCardsCnt = TAB_LOAD_MORE_CARDS_CNT;
    }

    else if(window.innerWidth <= MOBILE_RESOLUTION){
      this.maxCardsCnt = MOBILE_CARDS_CNT;
      this.loadMoreCardsCnt = MOBILE_LOAD_MORE_CARDS_CNT;
    }
  }

  render(){

    let dataPull = this.props.films;

    // ОПРЕДЕЛЯЕМ КОЛИЧЕСТВО КАРТОЧЕК ДЛЯ ОТОБРАЖЕНИЯ
    let endIdx = this.state.currentIdx + this.maxCardsCnt
    if(endIdx > dataPull.length) endIdx = dataPull.length;

    let showedFilms = dataPull.slice(0, endIdx);

    // ОТОБРАЖЕНИЕ ВСЕХ СОХРАНЕННЫХ ФИЛЬМОВ
    if(this.props.isSavedMovies){
      showedFilms = dataPull;
      endIdx = dataPull.length;
    }

    return (
      <section className="movie-card-list">
        {!this.props.moviesLoaded && this.props.searchQuery !== "" && this.props.wasSearchRequest && <Preloader />}
        {this.props.moviesLoadingError && <p className="movie-card-list__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
        {showedFilms.length === 0 && this.props.moviesLoaded && this.props.searchQuery !== "" && !this.props.moviesLoadingError && <p className="movie-card-list__error">Ничего не найдено</p>}
        {showedFilms.map((film, index) => {
          return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies} onLikeClick={this.props.onLikeClick}/>
        })}
        {endIdx !== dataPull.length && <button className="movie-card-list__more-button" onClick={this.handleMoreClick}>Ещё</button>}
      </section>
    )
  }
}

export default MoviesCardList;
