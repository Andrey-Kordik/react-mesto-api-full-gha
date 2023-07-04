import React from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js'
import { useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {

    const addPlaceName = React.useRef()
    const addPlaceLink = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            placename: addPlaceName.current.value,
            link: addPlaceLink.current.value
        });
    }

    useEffect(() => {
        addPlaceName.current.value = '';
        addPlaceLink.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loadingButtonText="Создание..."
            renderLoading={renderLoading}
            buttonText="Создать">
            <>
                <input type="text" ref={addPlaceName} name="placename" id="placename" className="popup__info" placeholder="Название"
                    minLength="2" maxLength="30" required></input>
                <span className="popup__info-error placename-error"></span>
                <input type="url" ref={addPlaceLink} name="link" id="link" className="popup__info" placeholder="Ссылка на картинку"
                    required></input>
                <span className="popup__info-error link-error"></span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup