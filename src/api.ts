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
  data: {
    attendees_count: number;
    is_attending: boolean;
  };
}

export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  user_type: "individual" | "organization";
}) {
  return api.post<AuthResponse>("/signup/", payload).then((r) => r.data);
}

export function loginUser(payload: { username: string; password: string }) {
  return api.post<AuthResponse>("/signin/", payload).then((r) => {
    const { token, username, userID } = r.data.data;
    return { token, username, userID };
  });
}


export function loginWithGoogle(googleToken: string) {
  return api
    .post<AuthResponse>("/google-signin/", { token: googleToken })
    .then((r) => {
      const { token, userID } = r.data.data;
      localStorage.setItem("token", token);
      return { token, userID };
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
  is_attending?: boolean;
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
  return api.get<EventsResponse>("/events/").then((res) => {
    if (res.data.success) {
      return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
  });
}

export function getEventById(id: string | number): Promise<EventItem> {
  return api.get<EventResponse>(`/events/${id}/`).then((res) => {
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
  api.get<EventData>(`/events/${id}/`).then((r) => r.data);

export function createEvent(payload: FormData) {
  return api.post<EventData>("/events/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
}

export function updateEvent(id: string, payload: FormData) {
  return api.put<EventData>(`/events/${id}/`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
}


export const deleteEvent = (id: string) => api.delete(`/events/${id}/`);

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
  is_attending?: boolean;
  image: string | null;
}

export function fetchEvents(
  searchTerm: string = "",
  promotedOnly: boolean = false
): Promise<EventSummary[]> {
  const params = new URLSearchParams();
  if (searchTerm.trim()) {
    params.append("title", searchTerm.trim());
  }
  if (promotedOnly) {
    params.append("promoted", "true");
  }
  const query = params.toString();
  const url = query ? `/events/?${query}/` : "/events/";
  return api.get<{ data: EventSummary[] }>(url).then((res) => res.data.data);
}

export function getEvent(id: number): Promise<EventItem> {
  return api.get<EventResponse>(`/events/${id}/`).then((r) => r.data.data);
}

export function toggleRsvpEvent(id: number): Promise<RsvpResponse> {
  return api.post<RsvpResponse>(`/events/${id}/rsvp/`).then((r) => r.data);
}

export interface UserSummary {
  id: number;
  username: string;
}

export interface FriendRequest {
  id: number;
  from_user: UserSummary;
  to_user: UserSummary;
}

export interface FriendDataResponse {
  username: string; // ← add this
  login: string; // ← add this
  friends: UserSummary[];
  incoming: FriendRequest[];
  outgoing: FriendRequest[];
  interests: string[]; // ← also add if not present
  events_count: number; // ← also add if not present
  status: "none" | "sent" | "received" | "friends";
  request_id?: number;
}

export function getFriendData(
  viewedUserId: number
): Promise<FriendDataResponse> {
  return api
    // the view returns the object directly, not wrapped in { data: … }
    .get<FriendDataResponse>(`/users/${viewedUserId}/friendship/`)
    .then((res) => res.data);
}

export interface UserProfileData {
  id: number;
  username: string;
  login: string;
  interests: string[];
  friends: UserSummary[];
  events_count: number;
}

export function getUserProfile(
  userId: number
): Promise<UserProfileData> {
  return api
    .get<UserProfileData>(`/users/${userId}/profile/`)
    .then((res) => res.data);
}

export async function sendFriendRequest(toUserId: number) {
  return api
    .post<{ id: number }>(`/friend-requests/`, { to_user: toUserId })
    .then((res) => res.data);
}

export async function respondToRequest(
  id: number,
  action: "accept" | "decline" | "cancel"
) {
  return api.post(`/friend-requests/${id}/${action}/`);
}

export interface UserSummary {
  id: number;
  username: string;
}

export function getMyFriends(): Promise<{ data: UserSummary[] }> {
  return api
    .get<{ data: UserSummary[] }>("/me/friends/")
    .then((res) => res.data);
}

export type SearchResultUser = {
  id: number;
  username: string;
  status: "none" | "sent" | "received" | "friends";
};

export async function searchUsers(
  query: string
): Promise<{ results: SearchResultUser[] }> {
  return api
    .get(`/users/search?q=${encodeURIComponent(query)}/`)
    .then((res) => res.data);
}

export default api;
