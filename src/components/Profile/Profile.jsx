import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
  onSignOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}
