import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type User = { id: number; username: string; };

export default function InviteUsers() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [users, setUsers]       = useState<User[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/users/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const toggle = (uid: number) => {
    setSelected(s =>
      s.includes(uid) ? s.filter(x => x !== uid) : [...s, uid]
    );
  };

  const sendInvites = async () => {
    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/events/${id}/invite/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_ids: selected }),
      }
    );
    navigate(-1); // back to event view
  };

  return (
    <div className="phone-container">
      <h2>Invite Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(u.id)}
                onChange={() => toggle(u.id)}
              />
              {u.username}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={sendInvites} disabled={!selected.length}>
        Send Invites
      </button>
    </div>
  );
}