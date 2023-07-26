import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {MainApi} from '../../utils/MainApi';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";

import Toast from "../Toast/Toast";
import PageNotFound from "../PageNotFound/PageNotFound";

import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class App extends React.Component {

  static contextType = CurrentUserContext;

  // ИНИЦИАЛИЗАЦИЯ
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      authErrorMessage: "",
      toastOpened: false,
      toastText: "",
      currentUser: {
        userName: "",
        email: "",
      }
    };
  }

  // МОНТИРОВАНИЕ
  componentDidMount() {

    // ИМЕЕТСЯ ТОКЕН И НЕ АВТОРИЗОВАН
    const jwt = localStorage.getItem("jwt");
    if(jwt && !this.state.isLoggedIn){

      // ПРОХОДИМ АВТОРИЗАЦИЮ ЧЕРЕЗ ТОКЕН И ЗАПРАШИВАЕМ ДАННЫЕ ПОСЛЕ АВТОРИЗАЦИИ
      MainApi.checkAuth({jwt})
      .then( loginData => {
        this.setState({
          isLoggedIn: true,
        });
        this.startApp();
      })
      .catch((err) => {
        console.log(err);
      });

    }

    // ЗАПРАШИВАЕМ ДАННЫЕ ЕСЛИ УЖЕ АВТОРИЗОВАН
    if(this.state.isLoggedIn){
      this.startApp();
    }
  }

  startApp(){
    Promise.all([MainApi.getUserInfo()])
    .then(([userDataResponse]) => {
      const userData = userDataResponse.data;
      console.log(userData);
      this.setState({
        currentUser: {
          userName: userData.name,
          _id: userData._id,
          email: userData.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // ОБНОВЛЕНИЕ
  componentDidUpdate() {
    console.log('App: componentDidUpdate');
  }


  // РЕНДЕРИНГ
  render() {

    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page">
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Main />} />

                <Route path="/signin" element={ this.state.isLoggedIn ? <Navigate to="/movies"/> : <Login authErrorMessage={this.state.authErrorMessage} onLogin={this.handleLoginUser}/>} />
                <Route path="/signup" element={ this.state.isLoggedIn ? <Navigate to="/movies" /> : <Register authErrorMessage={this.state.authErrorMessage} onRegister={this.handleRegisterUser} />} />

                <Route path="/movies" element={
                  <ProtectedRouteElement
                    element={Movies}
                    isSavedMovies={false}
                    route='movies'
                    loggedIn={this.state.isLoggedIn}
                  />
                }/>

                <Route path="/saved-movies" element={
                  <ProtectedRouteElement
                    element={Movies}
                    isSavedMovies={true}
                    route='saved-movies'
                    loggedIn={this.state.isLoggedIn}
                  />
                }/>

                <Route path="/profile" element={
                  <ProtectedRouteElement
                    element={Profile}
                    loggedIn={this.state.isLoggedIn}
                    onLogout={this.handleLogout}
                    onUpdateUser={this.handleUpdateUser}
                  />
                }/>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>

            <Toast text={this.state.toastText} opened={this.state.toastOpened} />

          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }

  handleRegisterUser = (data) => {

    MainApi.registerUser(data)
    .then(userInfoResponse => {
      this.handleLoginUser(data);
    })
    .catch(err => {
      console.log(err);
      this.setState({
        authErrorMessage: "Что-то пошло не так! Попробуйте ещё раз.",
      })
    })
  }

  handleLoginUser = (data) => {
    MainApi.loginUser(data)
    .then(loginInfo => {
      // СОХРАНЯЕМ ТОКЕН И ЗАПРАШИВАЕМ ДАННЫЕ С СЕРВЕРА ЧЕРЕЗ startApp()
      console.log(loginInfo);
      if(loginInfo.token){
        const jwt = loginInfo.token;
        localStorage.setItem("jwt", jwt);
        this.setState({
          authErrorMessage: "",
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

  handleUpdateUser = (data) => {
    MainApi.editProfile(data)
    .then(userInfoResponse => {
      this.setState({
        currentUser: {
          userName: userInfoResponse.data.name,
          email: userInfoResponse.data.email,
        },
        toastOpened: true,
        toastText: "Данные успешно обновлены!",
      });

      // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
      setTimeout(() => {
        this.setState({
          toastOpened: false,
          toastText: "",
        });
      }, 3000);

    })
    .catch(err => {
      console.log(err);
    })
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      isLoggedIn: false,
      currentUser: {
        userName: "",
        email: "",
      }
    });
  }
}

export default App;
