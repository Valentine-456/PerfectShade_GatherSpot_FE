import { useEffect, useState } from "react";
import { getMyFriends } from "@/api";
import type { UserSummary } from "@/api";
import { Link } from "react-router-dom";
import "./Friends.css";

export default function FriendsList() {
  const [friends, setFriends] = useState<UserSummary[]>([]);

  useEffect(() => {
    getMyFriends().then((res) => setFriends(res.data));
  }, []);

  return (
    <div className="friends-page">
      <h2>My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends yet.</p>
      ) : (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link to={`/users/${friend.id}`}>{friend.username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
