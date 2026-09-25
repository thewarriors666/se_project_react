import { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} />
      </NavLink>
      <p className="head__date-and-loaction">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{userName}</p>
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={`${userName}'s avatar`}
              className="header__avatar"
            />
          ) : (
            <div
              className="header__avatar header__avatar_placeholder"
              aria-label={`${userName}'s avatar`}
            >
              {userInitial}
            </div>
          )}
        </div>
      </NavLink>
    </header>
  );
}
export default Header;
