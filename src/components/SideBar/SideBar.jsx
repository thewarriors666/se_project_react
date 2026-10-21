import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "User";
  const userAvatar = currentUser?.avatar || avatar;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{userName}</p>
        <img src={userAvatar} alt={`${userName}'s avatar`} className="sidebar__avatar" />
      </div>
      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
      <button
        type="button"
        className="sidebar__sign-out-button"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
}
