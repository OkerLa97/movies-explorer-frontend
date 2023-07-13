import React from "react";

class Footer extends React.Component {

  render(){
    return (
      <footer className="footer">
        <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__year">&copy; 2021</p>
          <ul className="footer__links">
            <li className="footer__link-item">
              <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a className="footer__link" href="#!">Github</a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer;
