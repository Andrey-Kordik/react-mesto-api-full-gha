import React, { useState } from 'react'


function Login({ handleLogin }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleLoginSubmit(e) {
    const { email, password } = formValue
    e.preventDefault()
    handleLogin(email, password)

  }

  return (
    <div className='login__container'>
      <h1 className='login__welcome'>Войти</h1>
      <form className="login__form" onSubmit={handleLoginSubmit}>
        <input type="email" name="email" id="email" className="login__input" placeholder="Email"
          required onChange={handleChange} value={formValue.email}></input>
        <input type="password" name="password" id="password" className="login__input" placeholder="Пароль" minLength="6"
          maxLength="10" required onChange={handleChange} value={formValue.password}></input>

        <button className="login__button" id="login" type="submit">Вход</button>
      </form>
    </div>
  );
}

export default Login;
