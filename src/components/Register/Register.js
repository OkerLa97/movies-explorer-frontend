import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      errorInputTag: "",
      submitText: "Зарегистрироваться",
    }
  }

  handleNameChange = event => {
    this.validateAndSet("name", event.target);
    //this.setState({name: event.target.value, errorMessage: event.target.validationMessage});
  }

  handleEmailChange = event => {
    this.validateAndSet("email", event.target);
  }

  handlePasswordChange = event => {
    this.validateAndSet("password", event.target);
  }

  validateAndSet = (tag, element) => {

    var newState = {};
    newState[tag] = element.value;

    if (!element.validity.valid) {
      newState.errorMessage = element.validationMessage;
      newState.errorInputTag = tag;
    } else {
      newState.errorMessage = "";
      newState.errorInputTag = "";
    }

    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      submitText: "Отправка данных..."
    });

    this.props.onRegister(data);
  }

  render(){

    const errorMessage = this.props.authErrorMessage !== "" ? this.props.authErrorMessage : this.state.errorMessage;

    return (
      <main>
        <section className="register">

          <Link className="register__logo-link" to="/" replace >
            <img className="register__logo" src={logo} alt="Логотип Diploma" />
          </Link>
          <form className="register__form" onSubmit={this.handleSubmit}>
            <h1 className="register__title">Добро пожаловать!</h1>

            <label className="register__label">Имя</label>
            <input className={this.state.errorInputTag === "name" ? "register__field register__field-error" : "register__field"} type="text" minLength="2" maxLength="40" placeholder="..." required value={this.state.name} name="name" onChange={this.handleNameChange} />

            <label className="register__label">E-mail</label>
            <input className={this.state.errorInputTag === "email" ? "register__field register__field-error" : "register__field"} type="email" minLength="2" maxLength="40" placeholder="..." required value={this.state.email} name="email" onChange={this.handleEmailChange} />

            <label className="register__label">Пароль</label>
            <input className={this.state.errorInputTag === "password" ? "register__field register__field-error" : "register__field"} type="password" minLength="8" maxLength="200" placeholder="..."  required value={this.state.password} name="password" onChange={this.handlePasswordChange} />

            <label className="register__error-label">{errorMessage}</label>

            <button className="register__submit-btn" type="submit">{this.state.submitText}</button>
            <div className="register__login">
              <label className="register__login-is-register-label">Уже зарегистрированы?</label>
              <Link className="register__link" to="/signin" replace >Войти</Link>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

export default Register;
