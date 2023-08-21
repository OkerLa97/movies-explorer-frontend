import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      errorInputTag: "",
      submitText: "Войти",
      valid: false,
    }
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

    const regExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if(this.state.email !== "" && tag !== "email") {
      if (!regExp.test(this.state.email)) {
        newState.errorMessage = "Некорректный email";
        newState.errorInputTag = "email";
        this.setState(newState);
        return;
      }
    } else if(tag === "email") {
      if (!regExp.test(element.value)) {
        newState.errorMessage = "Некорректный email";
        newState.errorInputTag = tag;
        this.setState(newState);
        return;
      }
    }

    if (!element.validity.valid) {
      newState.errorMessage = element.validationMessage;
      newState.errorInputTag = tag;
    } else {
      newState.errorMessage = "";
      newState.errorInputTag = "";
    }

    if (this.state.name !== "" && this.state.email !== "" && this.state.password !== "" && newState.errorMessage === "") newState.valid = true;
    else newState.valid = false;

    this.setState(newState);
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      submitText: "Отправка данных..."
    });

    this.props.onLogin(data);
  }

  render(){

    const errorMessage = this.props.authErrorMessage !== "" ? this.props.authErrorMessage : this.state.errorMessage;

    var submitText = this.state.submitText;
    if(this.props.authErrorMessage !== "") submitText = "Войти";

    return (
      <section className="login">
        <Link className="login__logo-link" to="/" replace >
          <img className="login__logo" src={logo} alt="Логотип Diploma" />
        </Link>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <h1 className="login__title">Рады видеть!</h1>

          <label className="login__label">E-mail</label>
          <input className={this.state.errorInputTag === "email" ? "login__field login__field-error" : "login__field"} type="email" minLength="2" maxLength="40" placeholder="E-Mail ..." required value={this.state.email} name="email" onChange={this.handleEmailChange} />
          {this.state.errorInputTag === "email" ? <label className="login__error-label">{errorMessage}</label> : ""}

          <label className="login__label">Пароль</label>
          <input className={this.state.errorInputTag === "password" ? "login__field login__field-error" : "login__field"} type="password" minLength="8" maxLength="200" placeholder="Пароль ..."  required value={this.state.password} name="password" onChange={this.handlePasswordChange} />
          {this.state.errorInputTag === "password" ? <label className="login__error-label">{errorMessage}</label> : ""}

          <button className="login__submit-btn" disabled={!this.state.valid} type="submit">{submitText}</button>
          <div className="login__login">
            <label className="login__login-is-login-label">Ещё не зарегистрированы?</label>
            <Link className="login__link" to="/signup" replace >Регистрация</Link>
          </div>
        </form>
      </section>
    )
  }
}

export default Login;
