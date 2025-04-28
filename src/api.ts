// src/api.ts
import axios from 'axios';

const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
});

//  Automatically send JWT if we have one
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token && cfg.headers) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    userID: number;
    username: string;
  };
}

// Register
export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  user_type: 'individual' | 'organization';
}) {
  return api.post<AuthResponse>('/signup', payload).then(r => r.data);
}

// Login
export function loginUser(payload: {
  username: string;
  password: string;
}) {
  return api.post<AuthResponse>('/signin', payload).then(r => {
    const { token, username, userID } = r.data.data;
    localStorage.setItem('token', token);
    return { username, userID };
  });
}

export default api;
