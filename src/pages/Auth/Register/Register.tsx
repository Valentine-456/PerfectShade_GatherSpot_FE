import { Link } from "react-router-dom";
import { AppRoutes } from "../../../types/AppRoutes";
import "../auth.css";
import { useState } from "react";

const Register = () => {
  const [selectedType, setSelectedType] = useState<
    "individual" | "organization"
  >("individual");

  const handleToggle = (type: "individual" | "organization") => {
    setSelectedType(type);
  };

  return (
    <div className="phone-container">
      <header className="auth-header">
        <div className="header-logo"></div>
      </header>
      <form method="post" className="auth-form register-form">
        <Link to={AppRoutes.LOGIN} className="back-arrow">
          ←
        </Link>
        <h2>Sign up</h2>
        <p className="subtext" id="signup-text">
          {selectedType === "individual"
            ? "If you are an individual and don’t need any business or advertising features, select individual"
            : "If you are an organization and want to be verified to get access to advertising and business features, select organization"}
        </p>
        <div className="toggle-buttons">
          <button
            type="button"
            className={`toggle ${selectedType === "individual" ? "active" : ""}`}
            onClick={() => handleToggle("individual")}
          >
            Individual
          </button>
          <button
            type="button"
            className={`toggle ${selectedType === "organization" ? "active" : ""}`}
            onClick={() => handleToggle("organization")}
          >
            Organization
          </button>
        </div>
        <input type="text" name="username" placeholder="Username" required />
        {selectedType === "individual" ? (
          <input
            type="text"
            name="full_name"
            placeholder="Full name"
            id="full-name"
          />
        ) : (
          <input
            type="text"
            name="org_name"
            placeholder="Organization name"
            id="org-name"
          />
        )}
        <input type="email" name="email" placeholder="abc@email.com" required />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          required
        />
        <button type="submit" className="primary-btn">
          SIGN UP <span className="arrow">➜</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
