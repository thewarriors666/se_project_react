import { useContext } from "react";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentUserItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {currentUserItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
