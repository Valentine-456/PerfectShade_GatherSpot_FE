import { Link } from "react-router-dom";
import { AppRoutes } from "../../../types/AppRoutes";
import "../auth.css";

const Login = () => {
  return (
    <div className="phone-container">
      <header className="auth-header">
        <div className="header-logo"></div>
      </header>
      <form method="post" className="auth-form">
        <h2>Sign in</h2>
        <input type="email" name="email" placeholder="abc@email.com" required />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <button type="submit" className="primary-btn">
          SIGN IN <span className="arrow">➜</span>
        </button>
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
