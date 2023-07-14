import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

class Profile extends React.Component {

  static contextType = CurrentUserContext;

  render() {
    console.log(this.context);
    return (
      <>
        <Header route={this.props.route}/>
        <section className="profile">
          <h1 className="profile__title">Привет, {this.context.userName}!</h1>
          <form className="profile__form" name="profile" noValidate>
            <div className="profile__form-item">
              <label className="profile__form-label" htmlFor="name">Имя</label>
              <input className="profile__form-input" id="name" name="name" value={this.context.userName} type="text" minLength="2" maxLength="40" required disabled={true} />
            </div>
            <div className="profile__form-item">
              <label className="profile__form-label" htmlFor="email">E-mail</label>
              <input className="profile__form-input" id="email" name="email" type="email" value={this.context.email} minLength="2" maxLength="40" required disabled={true} />
            </div>
          </form>
          <div className="profile__footer">
            <button className="profile__edit-form-button" type="button">Редактировать</button>
            <button className="profile__logout-button" type="button">Выйти из аккаунта</button>
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
