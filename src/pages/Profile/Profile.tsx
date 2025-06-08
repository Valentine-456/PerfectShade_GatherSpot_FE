import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import userAvatar from "@/assets/images/user-avatar.png";
import { getFriendData, sendFriendRequest, respondToRequest } from "@/api"; // You must implement these in api.ts

type UserSummary = {
  id: number;
  username: string;
};

type FriendRequest = {
  id: number;
  from_user: UserSummary;
  to_user: UserSummary;
};

const Profile = () => {
  const interests = ["Board Games", "Concert", "Music", "Movie", "Art"];
  const [friends, setFriends] = useState<UserSummary[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
  const [requestStatus, setRequestStatus] = useState<
    "none" | "sent" | "received" | "friends"
  >("none");
  const [requestId, setRequestId] = useState<number | null>(null);
  const viewedUserId = 2; // Replace with actual ID of the profile being viewed

  useEffect(() => {
    getFriendData(viewedUserId).then((data) => {
      setFriends(data.friends);
      setIncomingRequests(data.incoming);
      setRequestStatus(data.status);
      setRequestId(data.request_id ?? null);
    });
  }, []);

  const handleSend = async () => {
    const res = await sendFriendRequest(viewedUserId);
    setRequestStatus("sent");
    setRequestId(res.id);
  };

  const handleCancel = async () => {
    if (!requestId) {
      return;
    }
    await respondToRequest(requestId, "cancel");
    setRequestStatus("none");
    setRequestId(null);
  };

  const handleAccept = async (id: number) => {
    await respondToRequest(id, "accept");
    setIncomingRequests((prev) => prev.filter((r) => r.id !== id));
    setRequestStatus("friends");
  };

  const handleDecline = async (id: number) => {
    await respondToRequest(id, "decline");
    setIncomingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="phone-container">
      <div className="profile-topshape" />

      <div className="profile-card">
        <Link to=".." className="back-arrow">
          ←
        </Link>
        <h2>Profile</h2>

        <div className="avatar">
          <img src={userAvatar} alt="User avatar" />
        </div>

        <h3>Arkadiusz Krajewski</h3>
        <p className="username">@arkaki</p>

        <div className="stats">
          <div className="stat">
            <span className="number">{friends.length}</span>
            <span className="label">Friends</span>
          </div>
          <div className="stat">
            <span className="number">0</span>
            <span className="label">Events</span>
          </div>
        </div>

        {/* Friend request action */}
        {requestStatus === "none" && (
          <button className="edit-btn" onClick={handleSend}>
            Add Friend
          </button>
        )}
        {requestStatus === "sent" && (
          <button className="edit-btn" onClick={handleCancel}>
            Cancel Request
          </button>
        )}
        {requestStatus === "friends" && (
          <button className="edit-btn" disabled>
            You're Friends
          </button>
        )}

        <div className="interests-header">
          <span>Interests</span>
          <button className="change-btn">CHANGE</button>
        </div>
        <div className="interests">
          {interests.map((i) => (
            <span key={i} className="interest-tag">
              {i}
            </span>
          ))}
        </div>

        {/* Incoming friend requests */}
        {incomingRequests.length > 0 && (
          <div className="friend-requests">
            <h3>Incoming Requests</h3>
            {incomingRequests.map((req) => (
              <div key={req.id} className="request-item">
                <p>{req.from_user.username}</p>
                <button onClick={() => handleAccept(req.id)}>Accept</button>
                <button onClick={() => handleDecline(req.id)}>Decline</button>
              </div>
            ))}
          </div>
        )}

        {/* Friend list */}
        {friends.length > 0 && (
          <div className="friend-list">
            <h3>Friends</h3>
            <ul>
              {friends.map((f) => (
                <li key={f.id}>{f.username}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
