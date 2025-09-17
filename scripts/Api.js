class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

addLike(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this._headers,
  }).then(this._handleServerResponse);
}

updateUserInfo(data) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  }).then(this._handleServerResponse);
}
removeLike(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this._headers,
  }).then(this._handleServerResponse);
}

  // criar card

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleServerResponse);
  }

  // remover card

  removeCard(cardid) {
    return fetch(`${this._baseUrl}/cards/${cardid}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

export default Api;
