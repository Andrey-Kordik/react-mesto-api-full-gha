
function Card(props) {

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }
    const isOwn = props.card.owner._id === props.user._id;
    const isLiked = props.card.likes.some(i => i._id === props.user._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    return (
        <article className="element__item" key={props.card.id}>
            <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick}></img>
            <div className="element__data">
                <h3 className="element__name" type="text">{props.card.name}</h3>
                <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
            </div>
            <p className="element__likecounter">{[props.card.likes.length]}</p>
            {isOwn && <button className="element__delete-button" onClick={handleCardDelete} />}
        </article>
    )
}

export default Card
