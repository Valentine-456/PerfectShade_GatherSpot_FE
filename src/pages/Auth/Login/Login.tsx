import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../../api";
import "../auth.css";
import { AppRoutes } from "../../../types/AppRoutes";
import { useAuth } from "../../../security/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token } = await loginUser({ username, password });
      login(token);
      navigate(AppRoutes.HOME);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="phone-container">
      <header className="auth-header">
        <div className="header-logo"></div>
      </header>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign in</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">
          SIGN IN <span className="arrow">➜</span>
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="divider">OR</div>

        <button type="button" className="social-btn google">
          <div className="icon"></div> Login with Google
        </button>
        <button type="button" className="social-btn facebook">
          <div className="icon"></div> Login with Facebook
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to={AppRoutes.REGISTER}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
