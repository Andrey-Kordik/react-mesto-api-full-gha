
import headerLogo from '../../images/logo.svg'
import { NavLink, useLocation } from 'react-router-dom';


function Header({ userData, onSignOut, isLoggedIn }) {

    const location = useLocation();

    function handleSignOut() {
        onSignOut()
    }

    return (

        <header className="header">
            <img className="header__logo"
                src={headerLogo}
                alt="логотип сайта"></img>
            {isLoggedIn &&
                (
                    <div className='header__container'>
                        <p className='header__user-email'>{userData}</p>
                        <NavLink className='header__button' onClick={handleSignOut}>Выйти</NavLink>
                    </div>
                )
            }

            {!isLoggedIn &&
                (
                    <div className='header__container'>
                        {location.pathname === '/sign-in' &&
                            (
                                <NavLink className='header__button' to="/sign-up" >Регистрация</NavLink>
                            )
                        }
                        {location.pathname === '/sign-up' &&
                            (
                                <NavLink className='header__button' to="/sign-in">Войти</NavLink>
                            )
                        }
                    </div>
                )
            }
        </header>
    )
}

export default Header