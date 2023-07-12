class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers,
            credentials: 'include',
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

    addCard({ placename, link }) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name: placename, link: link }),
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }

    editUserData({ name, about }) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name: name, about: about }),
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }

    editAvatar({ avatar }) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            }),
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }

    putLike(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }


    removeLike(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.removeLike(id);
        } else {
            return this.putLike(id);
        }
    }


    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
            credentials: 'include',
        })
            .then(res => {
                return this._checkResult(res)
            })
    }
}

export const api = new Api({
    url: 'http://api.domain.kordik.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json'
    }
})


