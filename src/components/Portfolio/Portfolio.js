import React from "react";

class Portfolio extends React.Component {

  render(){
    return (
      <section className="portfolio">
          <h3 className="portfolio__title">Портфолио</h3>
          <ul className="portfolio__links">
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="#!">Статичный сайт <span className="portfolio__span">↗</span></a>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="#!">Адаптивный сайт <span className="portfolio__span">↗</span></a>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="#!">Одностраничное приложение <span className="portfolio__span">↗</span></a>
            </li>
          </ul>
      </section>
    )
  }
}

export default Portfolio;
