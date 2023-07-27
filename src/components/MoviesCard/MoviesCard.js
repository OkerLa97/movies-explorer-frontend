import React from "react";
import LikeActive from "../../images/like-active.svg";
import LikeUnactive from "../../images/like-unactive.svg";
import Remove from "../../images/remove.svg";

import { IMAGE_SERVER } from "../../utils/constants";

class MoviesCard extends React.Component {

  handleCardClick = e => {
    e.stopPropagation();
    const link = this.props.film.trailerLink;
    window.open(link, "_blank");
  }

  handleLikeClick = e => {
    e.stopPropagation();
    this.props.onLikeClick(this.props.film);
  }

  render(){

    const minutesTotal = this.props.film.duration;
    const hours = Math.floor(minutesTotal / 60);
    const minutes = minutesTotal % 60;
    const duration = `${hours}ч ${minutes}м`;

    const imageUrl = `${IMAGE_SERVER}${this.props.film.image.url}`;

    let icon = LikeActive;
    let likeTitle = "Сохранить фильм";
    if(!this.props.film.liked) icon = LikeUnactive;
    if(this.props.isSavedMovies){
      icon = Remove;
      likeTitle = "Удалить фильм";
    }

    return (
      <article className="movie-card" onClick={this.handleCardClick}>
        <div className="movie-card__description">
          <div className="movie-card__description-container">
            <h2 className="movie-card__title">{this.props.film.nameRU}</h2>
            <p className="movie-card__duration">{duration}</p>
          </div>
          <button className="movie-card__like-button" title={likeTitle} onClick={this.handleLikeClick}>
            <img className="movie-card__like-button-image" src={icon} alt="кнопка лайка" />
          </button>
        </div>
        <div className="movie-card__image-container">
          <img className="movie-card__image" src={imageUrl} alt={this.props.film.nameRU} />
        </div>
      </article>
    )
  }
}

export default MoviesCard;
