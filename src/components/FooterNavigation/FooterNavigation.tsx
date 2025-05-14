import { useNavigate } from "react-router-dom";
import "./FooterNavigation.css";
import { AppRoutes } from "../../types/AppRoutes";

const FooterNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-nav">
      <div className="footer-btn button-active">
        <div className="footer-icon icon-explore" />
        <span>Explore</span>
      </div>
      <div
        className="footer-center-btn"
        onClick={() => navigate(AppRoutes.EVENT_CREATE)}
      >
        <div className="add-icon">+</div>
      </div>
      <div className="footer-btn">
        <div className="footer-icon icon-map" />
        <span>Map</span>
      </div>
    </div>
  );
};

export default FooterNavigation;
