class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authUrl = options.authUrl;
    this._headers = options.headers;
  }

  getMovies() {
    return this._request(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers
    });
  }

  _request(url, options) {

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

export const MoviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  },
});
