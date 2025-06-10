// src/security/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  userID: number | null;
  isAuthenticated: boolean;
  login: (token: string, username: string, userID: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  userID: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem("username"));
  const [userID, setUserID] = useState<number | null>(() => {
    const stored = localStorage.getItem("userID");
    return stored ? Number(stored) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (username) localStorage.setItem("username", username);
    else localStorage.removeItem("username");

    if (userID !== null) localStorage.setItem("userID", String(userID));
    else localStorage.removeItem("userID");
  }, [token, username, userID]);

  const login = (newToken: string, newUsername: string, newUserID: number) => {
    setToken(newToken);
    setUsername(newUsername);
    setUserID(newUserID);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserID(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, username, userID, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
