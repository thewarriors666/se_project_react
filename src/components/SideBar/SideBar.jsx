import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrance Tegegne</p>
        <img src={avatar} alt="Terrance Tegegene" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
