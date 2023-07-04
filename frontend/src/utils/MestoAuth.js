class MestoAuth {
  constructor(params) {
    this._url = params.baseUrl;
    this._headers = params.headers;
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        return this._checkResult(res)
      })
  }


  _checkResult(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

}

const auth = new MestoAuth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth;
