import React from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js'
import { useEffect } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, renderLoading }) {

    const avatarInput = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarInput.current.value
        });
    }

    useEffect(() => {
        avatarInput.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoading={renderLoading}
            loadingButtonText="Сохранение..."
            buttonText="Сохранить">
            <input type="url" ref={avatarInput} name="avatar" id="avatar" className="popup__info" placeholder="Ссылка на картинку" required></input>
            <span className="popup__info-error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup