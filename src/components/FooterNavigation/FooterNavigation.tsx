import "./FooterNavigation.css";

const FooterNavigation = () => {
  return (
    <div className="footer-nav">
      <div className="footer-btn button-active">
        <div className="footer-icon icon-explore" />
        <span>Explore</span>
      </div>
      <div className="footer-center-btn">
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
