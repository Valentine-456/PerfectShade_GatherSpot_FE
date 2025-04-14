
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="phone-container notfound-container">
      <header className="header">
        <div className="header-logo"></div>
      </header>
      <h1>404</h1>
      <p>Our New AI-powered skin tone analysis app is out soon! </p>
      <Link to="/" className="notfound-link">Stay tuned!</Link>
      <div className="mascot-image"></div>
      </div>
  );
};

export default NotFound;
