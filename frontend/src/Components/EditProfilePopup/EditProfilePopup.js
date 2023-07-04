import React from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js'
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, renderLoading }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext)

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            loadingButtonText="Сохранение..."
            renderLoading={renderLoading}
        >
            <input type="text" name="name" id="Name" className="popup__info" placeholder="Ваше имя" minLength="2"
                maxLength="40" required onChange={handleChangeName} value={name || ""}></input>
            <span className="popup__info-error Name-error"></span>
            <input type="text" name="job" id="Job" className="popup__info" placeholder="О себе" minLength="2"
                maxLength="200" required onChange={handleChangeDescription} value={description || ""}></input>
            <span className="popup__info-error Job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup

