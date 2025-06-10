// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import userAvatar from "@/assets/images/user-avatar.png";
import { useAuth } from "../../security/AuthContext";
import {
  getUserProfile,
  getFriendData,
  sendFriendRequest,
  respondToRequest,
  type UserProfileData,
  type FriendDataResponse,
} from "../../api";

export default function Profile() {
  const { userID } = useAuth();
  const [profile, setProfile]       = useState<UserProfileData | null>(null);
  const [friendInfo, setFriendInfo] = useState<FriendDataResponse | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    if (!userID) {
      setError("Not logged in");
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getUserProfile(userID),
      getFriendData(userID),
    ])
      .then(([prof, fri]) => {
        setProfile(prof);
        setFriendInfo(fri);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, [userID]);

  console.log("Auth userID:", userID, "token:", useAuth().token);

  const handleAction = async () => {
    if (!friendInfo || !userID) return;
    const { status, request_id } = friendInfo;
    try {
      if (status === "none") {
        const res = await sendFriendRequest(userID);
        setFriendInfo(f => f && ({ ...f, status: "sent", request_id: res.id }));
      } else if (status === "sent" && request_id) {
        await respondToRequest(request_id, "cancel");
        setFriendInfo(f => f && ({ ...f, status: "none", request_id: undefined }));
      } else if (status === "received" && request_id) {
        await respondToRequest(request_id, "accept");
        setFriendInfo(f => f && ({ ...f, status: "friends", request_id: undefined }));
      }
    } catch (e) {
      console.error("Action failed", e);
    }
  };

  if (loading) {
    return (
      <div className="phone-container">
        <div className="profile-topshape" />
        <div className="profile-card">
          <p>Loading profile…</p>
        </div>
      </div>
    );
  }
  if (error || !profile || !friendInfo) {
    return (
      <div className="phone-container">
        <div className="profile-topshape" />
        <div className="profile-card">
          <p>{error ?? "Could not load profile."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="phone-container">
      <div className="profile-topshape" />

      <div className="profile-card">
        <Link to=".." className="back-arrow">←</Link>
        <h2>{profile.username}’s Profile</h2>

        <div className="avatar">
          <img src={userAvatar} alt="Avatar" />
        </div>

        <h3>{profile.username}</h3>
        <p className="username">@{profile.login}</p>

        <div className="stats">
          <div className="stat">
            <span className="number">{profile.friends.length}</span>
            <span className="label">Friends</span>
          </div>
          <div className="stat">
            <span className="number">{profile.events_count}</span>
            <span className="label">Events</span>
          </div>
        </div>

        <button className="edit-btn" onClick={handleAction}>
          {{
            none:     "Add Friend",
            sent:     "Cancel Request",
            received: "Accept Request",
            friends:  "You’re Friends",
          }[friendInfo.status]}
        </button>

        <div className="interests-header">
          <span>Interests</span>
        </div>
        <div className="interests">
          {profile.interests.length > 0 ? (
            profile.interests.map((i) => (
              <span key={i} className="interest-tag">{i}</span>
            ))
          ) : (
            <p className="meta-sub">No interests listed</p>
          )}
        </div>

        {friendInfo.incoming.length > 0 && (
          <div className="friend-requests">
            <h3>Incoming Requests</h3>
            {friendInfo.incoming.map((req) => (
              <div key={req.id} className="request-item">
                <p>{req.from_user.username}</p>
                <button onClick={handleAction}>Accept</button>
                <button onClick={handleAction}>Decline</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
