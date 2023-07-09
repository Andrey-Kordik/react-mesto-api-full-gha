class MestoAuth {
  constructor(params) {
    this._url = params.baseUrl;
    this._headers = params.headers;
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(res => {
        return this._checkResult(res)
      })
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
      
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

  logout () {
    return fetch(`${this._url}/signout`, {
      credentials: 'include',
      method: 'GET'
    })
    .then(res => {
      return this._checkResult(res)
    })
  };
}

const auth = new MestoAuth({
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default auth;
