import React from "react";

class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){

    return (
      <section className="search-form">
        <form className="search-form__form">
          <div className="search-form__input-container">
            <input className="search-form__input" type="text" placeholder="Фильм" required />
            <button className="search-form__button" type="submit"></button>
          </div>
          <div className="search-form__switch-block">
            <label className="search-form__label">Короткометражки</label>
            <label className="search-form__switch">
              <input type="checkbox"/>
              <span className="search-form__slider"></span>
            </label>
          </div>
        </form>
      </section>
    )
  }
}

export default SearchForm;
