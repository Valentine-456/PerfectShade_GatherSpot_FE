import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
import "./MenuDrawer.css";
import { AppRoutes } from "../../types/AppRoutes";

type MenuDrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const MenuDrawer = (props: MenuDrawerProps) => {
  const { logout } = useAuth();
  const nav = useNavigate();

  const handleSignOut = () => {
    logout();
    nav("/login", { replace: true });
  };

  return (
    <div>
      <div className={`drawer ${props.isOpen ? "drawer-open" : ""}`}>
        <div className="drawer-header">
          <div className="profile-img" />
          <h3>Arkadiusz Krajewski</h3>
        </div>
        <button className="menu-toggle" onClick={props.toggleDrawer}>
          &#9776;
        </button>
        <ul className="drawer-menu">
          <li onClick={() => nav(AppRoutes.PROFILE)}>
            <span className="icon">👤</span> My Profile
          </li>
          <li>
            <span className="icon">📅</span> Events
          </li>
          <li onClick={() => nav(AppRoutes.FRIENDS)}>
            <span className="icon">👥</span> Friends
          </li>
          <li>
            <span className="icon">✉️</span> Contact Us
          </li>
          <li>
            <span className="icon">⚙️</span> Settings
          </li>
          <li>
            <span className="icon">❓</span> Help & FAQs
          </li>
          <li onClick={handleSignOut}>
            <span className="icon">🚪</span> Sign Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDrawer;
