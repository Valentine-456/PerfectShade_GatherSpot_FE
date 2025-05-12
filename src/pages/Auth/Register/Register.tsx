import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppRoutes } from "../../../types/AppRoutes";
import { registerUser } from '../../../api';
import '../auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState<string|null>(null);
  const [selectedType, setSelectedType] = useState<
    "individual" | "organization"
  >("individual");
  const navigate = useNavigate();
  

  const handleToggle = (type: "individual" | "organization") => {
    setSelectedType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser({ username, email, password, user_type: selectedType });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="phone-container">
      <header className="auth-header">
        <div className="header-logo"></div>
      </header>
      <form onSubmit={handleSubmit} className="auth-form register-form">
        <Link to={AppRoutes.LOGIN} className="back-arrow">←</Link>
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
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">
          SIGN UP <span className="arrow">➜</span>
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
