import "./Header.css";
import notificationIcon from "@/assets/images/notification.png";
import menuIcon from "@/assets/images/menu.png";
import filterIcon from "@/assets/images/filter.png";

type HeaderProps = {
  toggleDrawer: () => void;
};

const Header = (props: HeaderProps) => {
  return (
    <div className="header-container">
      <div className="header-top">
        <img
          src={menuIcon}
          alt="Menu"
          className="icon menu-icon"
          onClick={props.toggleDrawer}
        />

        <div className="location-info">
          <span className="label">Current Location</span>
          <br />
          <span className="value">Warsaw, Poland</span>
        </div>

        <img
          src={notificationIcon}
          alt="Notifications"
          className="icon notification-icon"
        />
      </div>

      <div className="header-bottom">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        <button className="filter-btn">
          <img src={filterIcon} alt="Filters" className="filter-icon" />
          Filters
        </button>
      </div>
    </div>
  );
};

export default Header;
