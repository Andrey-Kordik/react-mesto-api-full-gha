import React from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js'

function PopupWithConfirm({ isOpen, onClose, onCardDelete, renderLoading }) {

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCardDelete}
            renderLoading={renderLoading}
            loadingButtonText="Удаление..."
        >
        </PopupWithForm>
    )
}

export default PopupWithConfirm;