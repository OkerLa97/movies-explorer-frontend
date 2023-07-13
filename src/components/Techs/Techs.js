import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";

class Techs extends React.Component {

  render(){
    return (
      <section className="techs">
        <SectionHeader title="Технологии" />
        <div className="techs__description">
          <h3 className="techs__description-title">7 технологий</h3>
          <p className="techs__description-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <div className="techs__stack">
          <div className="techs__stack-column">
            <p className="techs__stack-text">HTML</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">CSS</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">JS</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">React</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">Git</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">Express.js</p>
          </div>
          <div className="techs__stack-column">
            <p className="techs__stack-text">mongoDB</p>
          </div>
        </div>
      </section>
    )
  }
}

export default Techs;
