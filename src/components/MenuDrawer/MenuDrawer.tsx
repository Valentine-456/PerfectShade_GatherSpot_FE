import './MenuDrawer.css';

type MenuDrawerProps = {
    isOpen: boolean,
    toggleDrawer: () => void
}

const MenuDrawer = (props: MenuDrawerProps) => {

  return (
    <div>
      <div className={`drawer ${props.isOpen ? "drawer-open" : ""}`}>
        <div className="drawer-header">
          <div
            className="profile-img"
          />
          <h3>Arkadiusz Krajewski</h3>
        </div>
          <button className="menu-toggle" onClick={props.toggleDrawer}>
        &#9776;
      </button>
        <ul className="drawer-menu">
          <li><span className="icon">👤</span> My Profile</li>
          <li><span className="icon">📅</span> Events</li>
          <li><span className="icon">👥</span> Friends</li>
          <li><span className="icon">✉️</span> Contact Us</li>
          <li><span className="icon">⚙️</span> Settings</li>
          <li><span className="icon">❓</span> Help & FAQs</li>
          <li><span className="icon">🚪</span> Sign Out</li>
        </ul>
      </div>

    </div>
  );
};

export default MenuDrawer;
