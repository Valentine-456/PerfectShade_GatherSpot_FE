import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

type Notification = {
  id: number;
  event: { id: number; title: string };
  link: string;
  created_at: string;
  is_read: boolean;
};

export default function Notifications() {
  const [notes, setNotes] = useState<Notification[]>([]);
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    fetch(`${apiBase}/notifications/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setNotes)
      .catch(console.error);
  }, []);

  return (
    <div className="phone-container">
      
      <h2>Notifications</h2>
      <ul className="notifications-list">
        {notes.map((n) => (
          <li
            key={n.id}
            onClick={() => navigate(`/events/${n.event.id}/view`)}
          >
            <div className="note-title">
              You’ve been invited to “{n.event.title}”
            </div>
            <div className="note-time">
              {new Date(n.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
