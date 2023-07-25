import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {

  render(){
    return (
      <section className="page-not-found">
        <div className="page-not-fount__container">
          <h1 className="page-not-found__title">404</h1>
          <p className="page-not-found__subtitle">Страница не найдена</p>
        </div>
        <Link className="page-not-found__link" to="/">Назад</Link>
      </section>
    )
  }
}

export default PageNotFound;
