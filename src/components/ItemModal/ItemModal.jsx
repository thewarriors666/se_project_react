import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src="src\assets\closebutton.svg" alt="close button" />
        </button>
        <img src={card.imageUrl} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={() => onDeleteItem(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
