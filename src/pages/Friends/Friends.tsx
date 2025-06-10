import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyFriends,
  getFriendData,
  respondToRequest,
  searchUsers,
  sendFriendRequest,
} from "@/api";
import "./Friends.css";
import type { UserSummary, FriendRequest } from "@/api";

type SearchResultUser = UserSummary & {
  status: "none" | "sent" | "received" | "friends";
};

export default function Friends() {
  const [friends, setFriends] = useState<UserSummary[]>([]);
  const [incoming, setIncoming] = useState<FriendRequest[]>([]);
  const [outgoing, setOutgoing] = useState<FriendRequest[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResultUser[]>([]);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const userId = Number(localStorage.getItem("userID"));

  const refreshFriendData = () => {
    getFriendData(userId).then((res) => {
      setIncoming(res.incoming || []);
      setOutgoing(res.outgoing || []);
    });
  };

  useEffect(() => {
    getMyFriends().then((res) => setFriends(res.data));
    refreshFriendData();
  }, [userId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 2) {
        searchUsers(search).then((res) => setResults(res.results));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleAccept = (id: number) => {
    respondToRequest(id, "accept").then(() => {
      setIncoming((prev) => prev.filter((r) => r.id !== id));
      getMyFriends().then((res) => setFriends(res.data));
    });
  };

  const handleDecline = (id: number) => {
    respondToRequest(id, "decline").then(() =>
      setIncoming((prev) => prev.filter((r) => r.id !== id))
    );
  };

  const handleCancelOutgoing = (targetUserId: number) => {
    const request = outgoing.find((r) => r.to_user.id === targetUserId);
    if (!request) {
      console.warn("Cancel failed: request not found for", targetUserId);
      return;
    }

    respondToRequest(request.id, "cancel").then(() => {
      setOutgoing((prev) => prev.filter((r) => r.id !== request.id));
      setResults((prev) =>
        prev.map((user) =>
          user.id === targetUserId ? { ...user, status: "none" } : user
        )
      );
    });
  };

  const handleSendRequest = (targetId: number) => {
    setPendingId(targetId);
    sendFriendRequest(targetId)
      .then((res) => {
        // 🛠 Add to `outgoing` immediately
        setOutgoing((prev) => [
          ...prev,
          {
            id: res.id,
            from_user: { id: userId, username: "You" },
            to_user: { id: targetId, username: "" },
            created_at: new Date().toISOString(),
          },
        ]);
        setResults((prev) =>
          prev.map((user) =>
            user.id === targetId ? { ...user, status: "sent" } : user
          )
        );
      })
      .finally(() => setPendingId(null));
  };

  return (
    <div className="phone-container">
      <div className="profile-topshape" />
      <div className="profile-card">
        <div className="header-spacer-layout">
          <div style={{ width: 30 }} />
          <h2 className="page-title">Friends</h2>
          <Link to=".." className="back-arrow">
            ←
          </Link>
        </div>

        <input
          className="search-input"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Pending Requests */}
        <div className="section-title">Pending Requests</div>
        {incoming.length === 0 && outgoing.length === 0 ? (
          <p className="meta-sub">No pending requests</p>
        ) : (
          <ul className="friend-list">
            {incoming.map((req) => (
              <li key={`in-${req.id}`} className="friend-item">
                <Link to={`/users/${req.from_user.id}`}>
                  {req.from_user.username}
                </Link>
                <div className="friend-actions">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="primary-btn small"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(req.id)}
                    className="outline-btn small"
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
            {outgoing.map((req) => (
              <li key={`out-${req.id}`} className="friend-item">
                <Link to={`/users/${req.to_user.id}`}>
                  {req.to_user.username}
                </Link>
                <div className="friend-actions">
                  <button
                    onClick={() => handleCancelOutgoing(req.to_user.id)}
                    className="outline-btn small"
                  >
                    Cancel Request
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Confirmed Friends */}
        <div className="section-title">Confirmed Friends</div>
        {friends.length === 0 ? (
          <p className="meta-sub">You haven't added anyone yet.</p>
        ) : (
          <ul className="friend-list">
            {friends.map((friend) => (
              <li key={friend.id} className="friend-item">
                <Link to={`/users/${friend.id}`}>{friend.username}</Link>
              </li>
            ))}
          </ul>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <>
            <div className="section-title">Search Results</div>
            <ul className="friend-list">
              {results.map((user) => (
                <li key={user.id} className="friend-item">
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                  {user.status === "friends" ? (
                    <button className="success-btn" disabled>
                      ✅ Friends
                    </button>
                  ) : user.status === "sent" ? (
                    <button
                      className="outline-btn small"
                      onClick={() => handleCancelOutgoing(user.id)}
                    >
                      Cancel Request
                    </button>
                  ) : (
                    <button
                      className="primary-btn small"
                      disabled={pendingId === user.id}
                      onClick={() => handleSendRequest(user.id)}
                    >
                      {pendingId === user.id ? "Sending..." : "Add Friend"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
