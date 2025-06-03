// src/pages/Auth/Register/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../../api";
import "../auth.css";

const Register = () => {
  const [userType, setUserType] = useState<"individual" | "organization">(
    "individual",
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser({ username, email, password, user_type: userType });
      navigate("/login"); // send them to login next
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="phone-container">
      <header className="header">
        <div className="header-logo"></div>
      </header>
      <form onSubmit={handleSubmit} className="auth-form register-form">
        <Link to="/login" className="back-arrow">
          ←
        </Link>
        <h2>Sign up</h2>
        {/* toggle buttons omitted for brevity */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">
          SIGN UP <span className="arrow">➜</span>
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
