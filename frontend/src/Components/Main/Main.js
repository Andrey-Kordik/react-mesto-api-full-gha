
import Card from '../Card/Card.js'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, user, cards, onCardLike, onCardDeleteRequest }) {

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <button className="profile__avatar-editbutton" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={`${user.avatar}`} alt="фото исследователя"></img>
                        <div className="profile__edit-avatar"></div>
                    </button>
                    <div className="profile__data">
                        <h1 className="profile__heading">{user.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        <p className="profile__subheading">{user.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {cards.map((card) =>

                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        user={user}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDeleteRequest}
                    />
                )
                }
            </section>
        </main>
    )
}
export default Main