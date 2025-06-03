import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
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

export interface RsvpResponse {
  success: boolean;
  message: string;
}

export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  user_type: "individual" | "organization";
}) {
  return api.post<AuthResponse>("/signup", payload).then((r) => r.data);
}

export function loginUser(payload: { username: string; password: string }) {
  return api.post<AuthResponse>("/signin", payload).then((r) => {
    const { token, username, userID } = r.data.data;
    localStorage.setItem("token", token);
    return { username, userID, token };
  });
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string; // ISO string
  is_promoted: boolean;
  attendees_count: number;
}

interface EventResponse {
  success: boolean;
  message: string;
  data: EventItem;
}

interface EventsResponse {
  success: boolean;
  message: string;
  data: EventItem[];
}

export function getEvents(): Promise<EventItem[]> {
  return api.get<EventsResponse>("/events").then((res) => {
    if (res.data.success) {
      return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
  });
}

export function getEventById(id: string | number): Promise<EventItem> {
  return api.get<EventResponse>(`/events/${id}`).then((res) => {
    if (!res.data.success) {
      return Promise.reject(new Error(res.data.message));
    }
    return res.data.data;
  });
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  location: string;
  date: string;
  is_promoted: boolean;
  latitude?: number;
  longitude?: number;
}

export const fetchEventById = (id: string) =>
  api.get<EventData>(`/events/${id}`).then((r) => r.data);

export const createEvent = (payload: EventData) =>
  api.post<EventData>(`/events`, payload).then((r) => r.data);

export const updateEvent = (id: string, payload: EventData) =>
  api.put<EventData>(`/events/${id}`, payload).then((r) => r.data);

export const deleteEvent = (id: string) =>
  api.delete(`/events/${id}`);

export interface EventSummary {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  is_promoted: boolean;
  attendees_count: number;
  latitude: number; // ← new
  longitude: number; // ← new
  is_owner: boolean;
}

export function fetchEvents(): Promise<EventSummary[]> {
  return api
    .get<{ data: EventSummary[] }>("/events")
    .then((res) => res.data.data);
}

export function getEvent(id: number): Promise<EventSummary> {
  return api.get<any>(`/events/${id}`).then((r) => r.data.data);
}

export function toggleRsvpEvent(id: number): Promise<RsvpResponse> {
  return api.post<RsvpResponse>(`/events/${id}/rsvp/`).then((r) => r.data);
}

export default api;
