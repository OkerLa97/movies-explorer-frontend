import React from "react";

class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery: props.searchQuery,
      searchQuerySaved: props.searchQuery,
      isShortFilms: props.isShortFilms,
      isShortFilmsSaved: props.isShortFilms,
    }
  }

  handleSearchInput = (e) => {
    if(this.props.route === "movies"){
      this.setState({
        searchQuery: e.target.value,
      });
    } else {
      this.setState({
        searchQuerySaved: e.target.value,
      })
    }
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    let searchQuery = this.state.searchQuery;
    if(this.props.route !== "movies"){
      searchQuery = this.state.searchQuerySaved;
    }

    this.props.onSearchSubmit(searchQuery, this.state.isShortFilms, this.props.route);
  }

  handleFilmsSwitch = (e) => {

    this.setState({
      isShortFilms: e.target.checked,
    });

    let searchQuery = this.state.searchQuery;
    if(this.props.route !== "movies"){
      searchQuery = this.state.searchQuerySaved;
    }

    this.props.onSearchSubmit(searchQuery, e.target.checked, this.props.route);
  }

  render(){

    let searchQuery = this.state.searchQuery;
    if(this.props.route !== "movies"){
      searchQuery = this.state.searchQuerySaved;
    }

    return (
      <section className="search-form" onSubmit={this.handleSearchSubmit}>
        <form className="search-form__form">
          <div className="search-form__input-container">
            <input className="search-form__input" type="text" placeholder="Фильм" value={searchQuery} onInput={this.handleSearchInput}/>
            <button className="search-form__button" type="submit"></button>
          </div>
          <div className="search-form__switch-block">
            <label className="search-form__label">Короткометражки</label>
            <label className="search-form__switch">
              <input type="checkbox" checked={this.props.isShortFilms} onChange={this.handleFilmsSwitch}/>
              <span className="search-form__slider"></span>
            </label>
          </div>
        </form>
      </section>
    )
  }
}

export default SearchForm;
