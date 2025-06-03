// src/components/FooterNavigation/FooterNavigation.tsx
import { useNavigate, useLocation } from "react-router-dom";
import "./FooterNavigation.css";
import { AppRoutes } from "../../types/AppRoutes";

const FooterNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Determine which route is active:
  const isExplore = pathname === AppRoutes.HOME;
  const isMap = pathname === AppRoutes.MAP;

  return (
    <div className="footer-nav">
      {/* Explore button: highlighted when on HOME */}
      <div
        className={`footer-btn${isExplore ? " button-active" : ""}`}
        onClick={() => navigate(AppRoutes.HOME)}
      >
        <div className="footer-icon icon-explore" />
        <span>Explore</span>
      </div>

      {/* Create (“+”) button: always goes to event creation */}
      <div
        className="footer-center-btn"
        onClick={() => navigate(AppRoutes.EVENT_CREATE)}
      >
        <div className="add-icon">+</div>
      </div>

      {/* Map button: highlighted when on /map */}
      <div
        className={`footer-btn${isMap ? " button-active" : ""}`}
        onClick={() => navigate(AppRoutes.MAP)}
      >
        <div className="footer-icon icon-map" />
        <span>Map</span>
      </div>
    </div>
  );
};

export default FooterNavigation;
