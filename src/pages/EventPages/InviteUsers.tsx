import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./InviteUsers.css";

type User = { id: number; username: string };

export default function InviteUsers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelected] = useState<number[]>([]);
  const apiBase = import.meta.env.VITE_API_BASE_URL || "";

  // 1) Fetch all users on mount
  useEffect(() => {
    fetch(`${apiBase}/users/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  // 2) Toggle selection
  const toggle = (uid: number) =>
    setSelected((cur) =>
      cur.includes(uid) ? cur.filter((x) => x !== uid) : [...cur, uid]
    );

  // 3) Send invites
  const sendInvites = () => {
    fetch(`${apiBase}/events/${id}/invite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user_ids: selectedIds }),
    })
      .then(() => navigate(-1))
      .catch(console.error);
  };

  return (
    <div className="phone-container">
      
      <h2>Invite Users</h2>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(u.id)}
                onChange={() => toggle(u.id)}
              />
              {u.username}
            </label>
          </li>
        ))}
      </ul>
      <button
        className="primary-btn"
        disabled={selectedIds.length === 0}
        onClick={sendInvites}
      >
        Send Invites
      </button>
    </div>
  );
}
