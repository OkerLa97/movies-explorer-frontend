import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

class Profile extends React.Component {

  static contextType = CurrentUserContext;

  loadingStarted = false;

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      editMode: false,
      loading: false,
    };

    this.dataReceived = false;
  }

  componentDidMount() {

    if((this.context.userName !== this.state.userName || this.context.email !== this.state.email) && !this.dataReceived){
      this.dataReceived = true;
      this.setState({
        userName: this.context.userName,
        email: this.context.email,
      });
    }
  }

  componentDidUpdate() {

    if(this.loadingStarted) {
      this.loadingStarted = false;
      return;
    }

    if(this.state.loading){
      this.setState({
        loading: false,
      });
    }
  }

  // HANDLE-ФУНКЦИИ
  handleEditClick = () => {
    this.setState({
      editMode: true,
    });
  }

  handleNameChange = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleSaveClick = () => {
    this.setState({
      editMode: false,
    });
  }

  handleLogoutClick = () => {
    this.props.onLogout();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    if(!this.state.editMode) {

      this.setState({
        editMode: true,
      });

      return;
    }

    this.props.onUpdateUser({
      userName: this.state.userName,
      email: this.state.email,
    });

    this.loadingStarted = true;

    this.setState({
      editMode: false,
      loading: true,
    });
  }

  render() {

    let submitText = "Редактировать";
    if(this.state.editMode) submitText = "Сохранить";
    if(this.state.loading) submitText = "Сохранение...";

    const valid = this.state.userName !== this.context.userName || this.state.email !== this.context.email;

    return (
      <>
        <Header route={this.props.route}/>
        <section className="profile">
          <h1 className="profile__title">Привет, {this.context.userName}!</h1>
          <form className="profile__form" name="profile" onSubmit={this.handleFormSubmit}>
            <div className="profile__form-item">
              <label className="profile__form-label" htmlFor="name">Имя</label>
              <input className="profile__form-input" id="name" name="name" value={this.state.userName} onChange={this.handleNameChange} type="text" minLength="2" maxLength="40" placeholder="Имя ..." required disabled={!this.state.editMode} />
            </div>
            <div className="profile__form-item">
              <label className="profile__form-label" htmlFor="email">E-mail</label>
              <input className="profile__form-input" id="email" name="email" type="email" value={this.state.email} onChange={this.handleEmailChange} minLength="2" maxLength="40" placeholder="E-Mail ..." required disabled={!this.state.editMode} />
            </div>
            <div className="profile__footer">
              <button className="profile__edit-form-button" type="submit" disabled={this.state.editMode && !valid}> {submitText} </button>
              <button className="profile__logout-button" type="button" onClick={this.handleLogoutClick}>Выйти из аккаунта</button>
            </div>
          </form>
        </section>
      </>
    );
  }
}

export default Profile;
