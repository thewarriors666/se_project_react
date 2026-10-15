import { useContext } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = (item.likes || []).some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Remove like" : "Like item"}
          aria-pressed={isLiked}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl ?? item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
