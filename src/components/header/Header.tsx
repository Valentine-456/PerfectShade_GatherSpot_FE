import "./Header.css";
import notificationIcon from "@/assets/images/notification.png";
import menuIcon from "@/assets/images/menu.png";
import filterIcon from "@/assets/images/filter.png";

type HeaderProps = {
  toggleDrawer: () => void;
  searchTerm: string;
  promotedOnly: boolean;
  onSearchChange: (term: string) => void;
  onFilterToggle: () => void;
};

const Header = ({
  toggleDrawer,
  searchTerm,
  promotedOnly,
  onSearchChange,
  onFilterToggle,
}: HeaderProps) => {
  return (
    <div className="header-container">
      <div className="header-top">
        <img
          src={menuIcon}
          alt="Menu"
          className="icon menu-icon"
          onClick={toggleDrawer}
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
          <input
            type="text"
            placeholder="Search events…"
            className="search-input-events"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button
          className={`filter-btn${promotedOnly ? " active" : ""}`}
          onClick={onFilterToggle}
        >
          <img src={filterIcon} alt="Filters" className="filter-icon" />
          {promotedOnly ? "Show promoted" : "Clear filter"}
        </button>
      </div>
    </div>
  );
};

export default Header;
