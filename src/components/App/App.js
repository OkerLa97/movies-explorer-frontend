import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { api } from '../../utils/Api';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class App extends React.Component {

  static contextType = CurrentUserContext;

  // ИНИЦИАЛИЗАЦИЯ
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isRegistrationSuccess: false,
      authErrorMessage: "",
      currentUser: {
        userName: "Виталий",
        email: "pochta@yandex.ru",
      }
    };
  }

  // МОНТИРОВАНИЕ
  componentDidMount() {
    console.log('App: componentDidMount');
  }

  // ОБНОВЛЕНИЕ
  componentDidUpdate() {
    console.log('App: componentDidUpdate');
  }


  // РЕНДЕРИНГ
  render() {
    console.log('App: render');
    console.log('App: this.context', this.context);
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page">
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Main />} />

                <Route path="/signin" element={ this.state.isLoggedIn ? <Navigate to="/movies"/> : <Login authErrorMessage={this.state.authErrorMessage} onLogin={this.handleLoginUser}/>} />
                <Route path="/signup" element={ this.state.isRegistrationSuccess ? <Navigate to="/signin" /> : <Register authErrorMessage={this.state.authErrorMessage} onRegister={this.handleRegisterUser} />} />

                <Route path="/movies" element={ <Movies isSavedMovies={false} route='movies'/> } />
                <Route path="/saved-movies" element={ <Movies isSavedMovies={true} route='saved-movies' /> } />
                <Route path="/profile" element={<Profile />} />

              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }

  handleRegisterUser = (data) => {

    api.registerUser(data)
    .then(userInfoResponse => {
      this.setState({
        authErrorMessage: "",
        isRegistrationSuccess: true,
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        authErrorMessage: "Что-то пошло не так! Попробуйте ещё раз.",
        isRegistrationSuccess: false,
      })
    })
  }

  handleLoginUser = (data) => {
    api.loginUser(data)
    .then(loginInfo => {
      // СОХРАНЯЕМ ТОКЕН И ЗАПРАШИВАЕМ ДАННЫЕ С СЕРВЕРА ЧЕРЕЗ startApp()
      console.log(loginInfo);
      if(loginInfo.token){
        const jwt = loginInfo.token;
        localStorage.setItem("jwt", jwt);
        this.setState({
          currentUser: {
            email:data.email,
            userName: "Виталий",
          },
          isLoggedIn:true
        });
      } else this.handleLoginError();
    })
    .catch(err => {
      console.log(err);
      this.handleLoginError();
    })
  }

  handleLoginError = () => {
    this.setState({
      authErrorMessage: "Что-то пошло не так! Попробуйте ещё раз.",
      isLoggedIn: false,
    })
  }
}

export default App;
