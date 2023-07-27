class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authUrl = options.authUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  editProfile(profile) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profile.userName,
        email: profile.email
      })
    });
  }

  getSavedMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers
    });
  }

  saveMovie(film) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: film.country,
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: `https://api.nomoreparties.co${film.image.url}`,
        trailerLink: film.trailerLink,
        thumbnail: `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
        movieId: film.id,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      })
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  registerUser(data){
    return this._request(`${this._authUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        password: data.password,
        email: data.email,
      })
    });
  }

  loginUser(data){
    return this._request(`${this._authUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      })
    })
  }

  checkAuth(data){
    return this._request(`${this._authUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${data.jwt}`
      }
    })
  }

  _request(url, options) {

    // Проверяем, есть ли у запроса заголовок авторизации, и если есть — добавляем в него токен если имеется
    if(options.headers && !options.headers.Authorization && localStorage.getItem("jwt")){
      options.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
    }

    return fetch(url, options)
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const MainApi = new Api({
  baseUrl: 'https://api.oker97.nomoredomains.rocks',
  authUrl: 'https://api.oker97.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  },
});
