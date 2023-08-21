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

    // ПРОВЕРЯЕМ ЛОКАЛЬНОЕ ХРАНИЛИЩЕ НА НАЛИЧИЕ ПОИСКА
    let searchQuery = localStorage.getItem("searchQuery");
    if(!searchQuery) searchQuery = "";

    let isShortFilms = localStorage.getItem("isShortFilms");
    if(!isShortFilms) isShortFilms = false;
    else isShortFilms = isShortFilms === "true" ? true : false;

    // СОСТОЯНИЕ
    this.state = {

      isLoggedIn: false,
      authErrorMessage: "",
      registerErrorMessage: "",

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

      searchQuery: searchQuery,
      isShortFilms: isShortFilms,
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
    Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
    .then(([userDataResponse, savedMoviesDataResponse]) => {

      const userData = userDataResponse.data;
      const savedMoviesData = savedMoviesDataResponse.data;

      // ПРОВЕРЯЕМ НА НАЛИЧИЕ ПОИСКА
      let searchQuery = localStorage.getItem("searchQuery");
      if(!searchQuery) searchQuery = "";

      let isShortFilms = localStorage.getItem("isShortFilms")
      if(!isShortFilms) isShortFilms = false;
      else isShortFilms = isShortFilms === "true" ? true : false;

      this.setState({
        currentUser: {
          userName: userData.name,
          _id: userData._id,
          email: userData.email,
        },

        savedMovies: savedMoviesData,

        moviesLoaded: true,
        moviesLoadingError: false,

        searchQuery: searchQuery,
        isShortFilms: isShortFilms,
      });

      if(searchQuery !== ""){
        this.handleSearchSubmit(searchQuery, isShortFilms);
      }

    })
    .catch((err) => {
      console.log(err);
      this.setState({
        moviesLoaded: true,
        moviesLoadingError: true,
      });
    });
  }

  // РЕНДЕРИНГ
  render() {

    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page">
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Main loggedIn={this.state.isLoggedIn} />} />

                <Route path="/signin" element={ this.state.isLoggedIn ? <Navigate to="/movies"/> : <Login authErrorMessage={this.state.authErrorMessage} onLogin={this.handleLoginUser}/>} />
                <Route path="/signup" element={ this.state.isLoggedIn ? <Navigate to="/movies" /> : <Register authErrorMessage={this.state.registerErrorMessage} onRegister={this.handleRegisterUser} />} />

                <Route path="/movies" element={
                  <ProtectedRouteElement
                    element={Movies}
                    isSavedMovies={false}
                    movies={this.state.filteredMovies}
                    route='movies'
                    loggedIn={this.state.isLoggedIn}
                    moviesLoaded={this.state.moviesLoaded}
                    moviesLoadingError={this.state.moviesLoadingError}
                    searchQuery={this.state.searchQuery}
                    isShortFilms={this.state.isShortFilms}
                    onSearchSubmit={this.handleSearchSubmit}
                    onLikeClick={this.handleLikeClick}
                  />
                }/>

                <Route path="/saved-movies" element={
                  <ProtectedRouteElement
                    element={Movies}
                    isSavedMovies={true}
                    movies={this.state.savedMovies}
                    route='saved-movies'
                    loggedIn={this.state.isLoggedIn}
                    moviesLoaded={this.state.moviesLoaded}
                    moviesLoadingError={this.state.moviesLoadingError}
                    searchQuery={this.state.searchQuery}
                    isShortFilms={this.state.isShortFilms}
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
        registerErrorMessage: "Что-то пошло не так! Попробуйте ещё раз.",
      })
    })
  }

  handleLoginUser = (data) => {
    MainApi.loginUser(data)
    .then(loginInfo => {
      // СОХРАНЯЕМ ТОКЕН И ЗАПРАШИВАЕМ ДАННЫЕ С СЕРВЕРА ЧЕРЕЗ startApp()
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
        this.startApp();
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
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("isShortFilms");
    this.setState({
      isLoggedIn: false,
      currentUser: {
        userName: "",
        email: "",
      }
    });
  }

  searchMovies = (searchQuery, isShortFilms, listForSearch) => {

    const foundMovies = listForSearch.filter((movie) => {

      const searchBlock = [movie.nameRU, movie.nameEN].join(" ").toLowerCase();

      if(isShortFilms) return searchBlock.includes(searchQuery.toLowerCase()) && movie.duration <= 40;
      else return searchBlock.includes(searchQuery.toLowerCase());

    });

    return foundMovies;
  }

  handleSearchSubmit = (searchQuery, isShortFilms) => {

    // СОХРАНЯЕМ ПОИСК В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("isShortFilms", isShortFilms);

    // ПРОВЕРЯЕМ НА ПУСТОЙ ПОИСК, ВЫВОДИМ ВСЕ ФИЛЬМЫ И ВЫВОДИМ СООБЩЕНИЕ
    if(searchQuery === ""){

      this.setState({
        searchQuery: searchQuery,
        isShortFilms: isShortFilms,
        //filteredMovies: this.state.movies,
        toastOpened: true,
        toastText: "Нужно ввести ключевое слово",
      });

      // ЗАКРЫВАЕМ ТОАСТ ЧЕРЕЗ 3 СЕКУНДЫ
      setTimeout(() => {
        this.setState({
          toastOpened: false,
          toastText: "",
        });
      }, 3000);

      return;
    }

    this.setState({
      searchQuery: searchQuery,
      isShortFilms: isShortFilms,
      moviesLoaded: false,
    });

    MoviesApi.getMovies()
    .then((moviesData) => {
      moviesData.forEach((movie) => {
        this.state.savedMovies.forEach((savedMovie) => {
          if(movie.id === savedMovie.movieId){
            movie.liked = true;
            savedMovie.liked = true;
            movie._id = savedMovie._id; // ДЛЯ УДОБСТВА
          }
        })
      });

      const filteredMovies = this.searchMovies(this.state.searchQuery, this.state.isShortFilms, moviesData);

      this.setState({
        movies: moviesData,
        filteredMovies: filteredMovies,
        moviesLoaded: true,
      });

    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLikeClick = (film) => {

    if(!film.liked){
      MainApi.saveMovie(film)
      .then((savedMovieData) => {
        const savedMovie = savedMovieData.data;
        savedMovie.liked = true;
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
        //Найдем фильм в массиве и поменяем ему статус
        const movie = this.state.movies.find((movie) => {
          return movie.id === deletedMovie.data.movieId;
        });
        if(movie) movie.liked = false;

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
