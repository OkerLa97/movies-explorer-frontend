import React from "react";
import Me from "../../images/me.jpg";
import SectionHeader from "../SectionHeader/SectionHeader";

class AboutMe extends React.Component {

  render(){
    return (
      <section className="about-me">
        <SectionHeader title="Студент" />
        <div className="about-me__description">
          <div className="about-me__description-column">
            <div className="about-me__description-top">
              <h3 className="about-me__name">Владислав</h3>
              <p className="about-me__description-title">Фронтенд-разработчик, 25 лет</p>
              <p className="about-me__description-text">
              Я родился в Самаре, окончил жигулевский государственный колледж. Холост увлечения связанны с активным образом жизни изучения чего то нового. Обучение в it доя меня что то новое. Работал пожарным после окончания курсов планирую найти работу в it.
              </p>
            </div>
            <div className="about-me__links">
              <a className="about-me__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
            </div>
          </div>
          <img className="about-me__photo" src={Me} alt="Фото студента" />
        </div>

        <div className="about-me__portfolio">
          <h3 className="about-me__portfolio-title">Портфолио</h3>
          <ul className="about-me__portfolio-links">
            <li className="about-me__portfolio-link-item">
              <a className="about-me__portfolio-link" href="#!">Статичный сайт <span className="about-me__portfolio-span">↗</span></a>
            </li>
            <li className="about-me__portfolio-link-item">
              <a className="about-me__portfolio-link" href="#!">Адаптивный сайт <span className="about-me__portfolio-span">↗</span></a>
            </li>
            <li className="about-me__portfolio-link-item">
              <a className="about-me__portfolio-link" href="#!">Одностраничное приложение <span className="about-me__portfolio-span">↗</span></a>
            </li>
          </ul>
        </div>

      </section>
    )
  }
}

export default AboutMe;
