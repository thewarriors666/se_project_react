import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar({ onEditProfile, onSignOut }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrance Tegegne</p>
        <img src={avatar} alt="Terrance Tegegene" className="sidebar__avatar" />
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
