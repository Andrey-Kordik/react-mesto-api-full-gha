import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Register({handleRegister}) {
 
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

  function handleRegisterSubmit(e) {
    const { email, password } = formValue
    e.preventDefault()
    handleRegister(email, password )
  }


  return (
    <div className='login__container'>
      <h1 className='login__welcome'>Регистрация</h1>
      <form className="login__form" onSubmit={handleRegisterSubmit}>
        <input type="email" name="email" id="email" className="login__input" placeholder="Email"
          required onChange={handleChange} value={formValue.email}></input>
        <input type="password" name="password" id="password" className="login__input" placeholder="Пароль" minLength="6"
          maxLength="10" required onChange={handleChange} value={formValue.password}></input>

        <button className="login__button" id="login" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__proposal">Уже зарегистрированы? <Link className='login__link' to='/sign-in'>Войти</Link></p>
    </div>
  );
}

export default Register;