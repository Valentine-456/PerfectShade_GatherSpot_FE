// src/pages/Auth/Login/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../../api';
import '../auth.css';

const Login = () => {
  const [username, setUsername] = useState('');      // DRF expects "username"
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser({ username, password });
      navigate('/');                                 // go to home on success
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="phone-container">
      <header className="auth-header">…</header>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign in</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">
          SIGN IN <span className="arrow">➜</span>
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="divider">OR</div>
        {/* …social buttons… */}
        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
