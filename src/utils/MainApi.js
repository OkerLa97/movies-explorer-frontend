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

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
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

  addCard(card) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  addLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) return this.addLike(cardId);
    else return this.deleteLike(cardId);
  }

  editAvatar(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
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
