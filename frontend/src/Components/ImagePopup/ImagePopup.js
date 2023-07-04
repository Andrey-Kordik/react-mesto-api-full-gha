
function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__imagebox popup__commonclass">
        <img className="popup__image" src={`${card.link}`} alt={`${card.name}`}></img>
        <button className="popup__closing-icon" id="imageclose" onClick={onClose}></button>
        <p className="popup__image-name">{`${card.name}`}</p>
      </div>
    </div>
  )
}

export default ImagePopup