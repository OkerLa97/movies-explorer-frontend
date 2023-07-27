import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {MainApi} from '../../utils/MainApi';
import {MoviesApi} from '../../utils/MoviesApi';

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
      },

      movies: [],
      filteredMovies: [],

      savedMovies: [],

      moviesLoaded: false,
      moviesLoadingError: false,
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
    Promise.all([MainApi.getUserInfo(), MoviesApi.getMovies(), MainApi.getSavedMovies()])
    .then(([userDataResponse, moviesDataResponse, savedMoviesDataResponse]) => {

      const userData = userDataResponse.data;
      const moviesData = moviesDataResponse;
      const savedMoviesData = savedMoviesDataResponse.data;

      moviesData.forEach((movie) => {
        savedMoviesData.forEach((savedMovie) => {
          if(movie.id === savedMovie.movieId){
            movie.liked = true;
            movie._id = savedMovie._id; // ДЛЯ УДОБСТВА
          }
        })
      });

      console.log(moviesData, savedMoviesData);

      this.setState({
        currentUser: {
          userName: userData.name,
          _id: userData._id,
          email: userData.email,
        },

        movies: moviesData,
        filteredMovies: moviesData,

        savedMovies: savedMoviesData,

        moviesLoaded: true,
        moviesLoadingError: false,
      });
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        moviesLoaded: true,
        moviesLoadingError: true,
      });
    });
  }

  // ОБНОВЛЕНИЕ
  componentDidUpdate() {
    //
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
                    movies={this.state.filteredMovies}
                    route='movies'
                    loggedIn={this.state.isLoggedIn}
                    moviesLoaded={this.state.moviesLoaded}
                    moviesLoadingError={this.state.moviesLoadingError}
                    onSearchSubmit={this.handleSearchSubmit}
                    onLikeClick={this.handleLikeClick}
                  />
                }/>

                <Route path="/saved-movies" element={
                  <ProtectedRouteElement
                    element={Movies}
                    isSavedMovies={true}
                    movies={this.state.filteredMovies}
                    route='saved-movies'
                    loggedIn={this.state.isLoggedIn}
                    moviesLoaded={this.state.moviesLoaded}
                    moviesLoadingError={this.state.moviesLoadingError}
                    onSearchSubmit={this.handleSearchSubmit}
                    onLikeClick={this.handleLikeClick}
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

  handleSearchSubmit = (searchQuery, isShortFilms) => {
    console.log(searchQuery, isShortFilms);
    console.log(this.state.movies);
    const foundMovies = this.state.movies.filter((movie) => {

      const searchBlock = [movie.nameRU, movie.nameEN].join(" ").toLowerCase();

      if(isShortFilms) return searchBlock.includes(searchQuery.toLowerCase()) && movie.duration <= 40;
      else return searchBlock.includes(searchQuery.toLowerCase());

    });

    console.log(foundMovies);

    this.setState({
      filteredMovies: foundMovies,
    });
  }

  handleLikeClick = (film) => {

    if(!film.liked){
      MainApi.saveMovie(film)
      .then((savedMovieData) => {
        const savedMovie = savedMovieData.data;
        film.liked = true;
        film._id = savedMovie._id; // ДЛЯ УДОБСТВА
        this.setState({
          savedMovies: [...this.state.savedMovies, savedMovie],
          toastOpened: true,
          toastText: "Фильм успешно сохранён!",
        });

        // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
        setTimeout(() => {
          this.setState({
            toastOpened: false,
            toastText: "",
          });
        }, 3000);

        console.log(savedMovie);
      })
      .catch((err) => {

        this.setState({
          toastOpened: true,
          toastText: "Что-то пошло не так! Попробуйте ещё раз.",
        });

        // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
        setTimeout(() => {
          this.setState({
            toastOpened: false,
            toastText: "",
          });
        }, 3000);

        console.log(err);
      });

    } else {
      MainApi.deleteMovie(film._id)
      .then((deletedMovie) => {
        film.liked = false;
        const savedMovies = this.state.savedMovies.filter((movie) => {
          return movie._id !== film._id;
        });

        this.setState({
          savedMovies: savedMovies,
          toastOpened: true,
          toastText: "Фильм успешно удалён!",
        });

        // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
        setTimeout(() => {
          this.setState({
            toastOpened: false,
            toastText: "",
          });
        }, 3000);

      })
      .catch((err) => {

        this.setState({
          toastOpened: true,
          toastText: "Что-то пошло не так! Попробуйте ещё раз.",
        });

        // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
        setTimeout(() => {
          this.setState({
            toastOpened: false,
            toastText: "",
          });
        }, 3000);

        console.log(err);
      });
    }
  }
}

export default App;
