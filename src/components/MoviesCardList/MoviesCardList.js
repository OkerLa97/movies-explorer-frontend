import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

class MoviesCardList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      films: this.props.films
    }
  }

  render(){

    return (
      <section className="movie-card-list">
        {this.state.films.map((film, index) => {
          if(this.props.isSavedMovies){

            if(film.liked) return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies}/>
            else return false;

          } else return <MoviesCard key={index} film={film} isSavedMovies={this.props.isSavedMovies}/>
        })}
        <button className="movie-card-list__more-button">Ещё</button>
      </section>
    )
  }
}

export default MoviesCardList;
