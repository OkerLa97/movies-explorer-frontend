import React from "react";

class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery: props.searchQuery,
      isShortFilms: props.isShortFilms,
    }
  }

  handleSearchInput = (e) => {
    this.setState({
      searchQuery: e.target.value,
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.searchQuery, this.state.isShortFilms);
  }

  handleFilmsSwitch = (e) => {
    this.setState({
      isShortFilms: e.target.checked,
    });
    this.props.onSearchSubmit(this.state.searchQuery, e.target.checked);
  }

  render(){

    return (
      <section className="search-form" onSubmit={this.handleSearchSubmit}>
        <form className="search-form__form">
          <div className="search-form__input-container">
            <input className="search-form__input" type="text" placeholder="Фильм" value={this.state.searchQuery} onInput={this.handleSearchInput}/>
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
