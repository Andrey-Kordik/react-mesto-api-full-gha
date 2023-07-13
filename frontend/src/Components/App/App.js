import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import { useState, useEffect } from 'react';
import { api } from '../../utils/Api.js'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import { CurrentCardsContext } from '../../contexts/CurrentCardsContext.js'
import EditProfilePopup from '../../Components/EditProfilePopup/EditProfilePopup.js'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js'
import PopupWithConfirm from '../PopupWithConfirm/PopupWithConfirm.js'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import auth from '../../utils/MestoAuth.js'
import { useNavigate } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [currentCards, setCurrentCards] = useState([])
  const [isPopupWithConfirmOpen, setPopupWithConfirmOpen] = useState(false);
  const [cardForDelete, setCardForDelete] = useState({})

  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingAddPlace, setIsLoadingAddPlace] = useState(false);
  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = useState(false);
  const [isLoadingCardDelete, setIsLoadingCardDelete] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  const [isSuccessfullSign, setIsSuccessfullSign] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);


  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserData(currentUser)
        .then((data) => {
          setCurrentUser(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      api.getCards(currentCards)
        .then((data) => {
          setCurrentCards(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [isLoggedIn])

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  function handleCardDelete(evt, card) {
    evt.preventDefault()
    setIsLoadingCardDelete(true)
    api.deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = currentCards.filter((element) => element !== cardForDelete);
        setCurrentCards(newCards);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        setIsLoadingCardDelete(false);
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false)
    setEditProfileOpen(false)
    setAddPlaceOpen(false)
    setSelectedCard({})
    setImagePopupOpen(false)
    setPopupWithConfirmOpen(false)
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser(data) {
    setIsLoadingSetUserInfo(true)
    api.editUserData(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        setIsLoadingSetUserInfo(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api.editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        setIsLoadingAvatar(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlace(true)
    api.addCard(data)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        setIsLoadingAddPlace(false);
      })
  }

  function handleCardDeleteConfirmation(card) {
    setCardForDelete(card);
    setPopupWithConfirmOpen(true)
  }


  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setLoggedIn(true)
        setUserData(email)
        navigate('/')
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((user) => {
        setIsSuccessfullSign(true)
        navigate("/sign-in")
        handleInfoTooltipOpen()
      })
      .catch(err => {
        console.log(err.message)
        setIsSuccessfullSign(false)
        handleInfoTooltipOpen()
      })
  }

  function verifyToken() {
    auth.checkToken()
      .then((data) => {
        if (data) {
          setUserData(data.email)
          setLoggedIn(true)
          navigate('/')
        }
        else {
          setLoggedIn(false)
        }
      })
      .catch(err => {
        setLoggedIn(false)
        console.log(err.message)
      })
  }

  useEffect(() => {
    verifyToken()
    setUserData()
  }, [])


  function handleSignOut() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={currentCards}>
        <div className="project">
          <div className="page">

            <Header
              isLoggedIn={isLoggedIn}
              userData={userData}

              onSignOut={handleSignOut}
            />

            <Routes>
              <Route path="/" element={<ProtectedRoute element={<Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                user={currentUser}
                cards={currentCards}
                onCardLike={handleCardLike}
                onCardDeleteRequest={handleCardDeleteConfirmation} />} isLoggedIn={isLoggedIn} />} />


              <Route path="/sign-in" element={
                <Login
                  handleLogin={handleLogin}
                />
              } />

              <Route path="/sign-up" element={
                <Register
                  handleRegister={handleRegister}

                />
              } />
              <Route path="/" element={isLoggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />} />
              <Route path='*' element={<Navigate to={"/sign-in"} />} />
            </Routes>
            <Footer />
          </div>
          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            renderLoading={isLoadingSetUserInfo} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            renderLoading={isLoadingAddPlace}
          />

          <PopupWithConfirm
            isOpen={isPopupWithConfirmOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            renderLoading={isLoadingCardDelete}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            renderLoading={isLoadingAvatar} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccessfull={isSuccessfullSign}
            onClose={closeAllPopups}

          />

        </div>

      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
