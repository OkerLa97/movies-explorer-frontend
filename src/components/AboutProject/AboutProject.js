import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";

class AboutProject extends React.Component {

  render(){
    return (
      <section className="about-project">
        <SectionHeader title="О проекте" />
        <div className="about-project__description">
          <div className="about-project__description-column">
            <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__description-column">
            <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__timeline">
          <div className="about-project__timeline-backend">
            <p className="about-project__timeline-backend-block">1 неделя</p>
            <p className="about-project__timeline-backend-text">Back-end</p>
          </div>
          <div className="about-project__timeline-frontend">
            <p className="about-project__timeline-frontend-block">4 недели</p>
            <p className="about-project__timeline-frontend-text">Front-end</p>
          </div>
        </div>
      </section>
    )
  }
}

export default AboutProject;
