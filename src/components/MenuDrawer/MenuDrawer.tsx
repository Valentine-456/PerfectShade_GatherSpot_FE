// src/components/MenuDrawer/MenuDrawer.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
import "./MenuDrawer.css";
import { AppRoutes } from "../../types/AppRoutes";

type MenuDrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, toggleDrawer }) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate(AppRoutes.LOGIN, { replace: true });
  };

  return (
    <div className={`drawer ${isOpen ? "drawer-open" : ""}`}>
      <div className="drawer-header">
        <div className="profile-img" />
        <h3>{username ?? "Guest"}</h3>
      </div>
      <button className="menu-toggle" onClick={toggleDrawer}>
        &#9776;
      </button>
      <ul className="drawer-menu">
        <li onClick={() => navigate(AppRoutes.PROFILE)}>
          <span className="icon">👤</span> My Profile
        </li>
        <li onClick={() => navigate(AppRoutes.FRIENDS)}>
          <span className="icon">👥</span> Friends
        </li>
        <li onClick={() => navigate(AppRoutes.HOME)}>
          <span className="icon">📅</span> Events
        </li>
        <li onClick={handleSignOut}>
          <span className="icon">🚪</span> Sign Out
        </li>
      </ul>
    </div>
  );
};

export default MenuDrawer;
