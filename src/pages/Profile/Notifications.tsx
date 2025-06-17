import { useState, useEffect } from "react";

type Notification = {
  id: number;
  event: { id: number; title: string };
  link: string;
  created_at: string;
  is_read: boolean;
};

export default function Notifications() {
  const [notes, setNotes] = useState<Notification[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => res.json())
      .then(setNotes);
  }, []);

  return (
    <div className="phone-container">
      <h2>Notifications</h2>
      <ul>
        {notes.map(n => (
          <li key={n.id} onClick={() => window.location.href = n.link}>
            You’ve been invited to “{n.event.title}”
            <br />
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}