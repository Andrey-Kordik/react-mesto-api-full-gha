

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit, loadingButtonText, renderLoading }) {

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__content popup__commonclass">
        <h3 className='popup__heading'>{`${title}`}</h3>
        <form className="popup__container" name={`${name}`} onSubmit={onSubmit}>
          <fieldset className="popup__set">
            {children}
            <button className="popup__savebutton" type="submit">{renderLoading ?
              loadingButtonText
              :
              buttonText}</button>
          </fieldset>
        </form>
        <button className="popup__closing-icon" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm