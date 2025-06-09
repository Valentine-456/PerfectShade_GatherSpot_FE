import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getUserProfile,
  getFriendData,
  sendFriendRequest,
  respondToRequest,
  type FriendDataResponse,
  type UserProfileData,
} from "@/api";
import userAvatar from "@/assets/images/user-avatar.png";
import "./UserProfile.css";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [friendInfo, setFriendInfo] = useState<FriendDataResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    Promise.all([getUserProfile(Number(id)), getFriendData(Number(id))])
      .then(([profileData, friendData]) => {
        setProfile(profileData);
        setFriendInfo(friendData);
      })
      .catch((err) => console.error("Failed to load:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = () => {
    if (!friendInfo || !id) {
      return;
    }

    const targetId = Number(id);
    const reqId = friendInfo.request_id;

    if (friendInfo.status === "none") {
      sendFriendRequest(targetId).then(() =>
        setFriendInfo((prev) => prev && { ...prev, status: "sent" }),
      );
    } else if (friendInfo.status === "received" && reqId) {
      respondToRequest(reqId, "accept").then(() =>
        setFriendInfo((prev) => prev && { ...prev, status: "friends" }),
      );
    } else if (friendInfo.status === "sent" && reqId) {
      respondToRequest(reqId, "cancel").then(() =>
        setFriendInfo(
          (prev) => prev && { ...prev, status: "none", request_id: undefined },
        ),
      );
    }
  };

  const renderActionButton = () => {
    if (!friendInfo) {
      return null;
    }

    switch (friendInfo.status) {
      case "none":
        return (
          <button className="edit-btn" onClick={handleAction}>
            Add Friend
          </button>
        );
      case "sent":
        return (
          <button className="edit-btn" onClick={handleAction}>
            Cancel Request
          </button>
        );
      case "received":
        return (
          <button className="edit-btn" onClick={handleAction}>
            Accept Request
          </button>
        );
      case "friends":
        return (
          <button className="edit-btn" disabled>
            ✅ Friends
          </button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="phone-container">
        <div className="profile-topshape" />
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="phone-container">
        <div className="profile-topshape" />
        <div className="profile-card">
          <p>Could not load profile.</p>
        </div>
      </div>
    );
  }

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

        <h3>{profile.username}</h3>
        <p className="username">@{profile.login}</p>

        <div className="stats">
          <div className="stat">
            <span className="number">{profile.friends.length}</span>
            <span className="label">Friends</span>
          </div>
          <div className="stat">
            <span className="number">{profile.events_count || 0}</span>
            <span className="label">Events</span>
          </div>
        </div>

        {renderActionButton()}

        <div className="interests-header">
          <span>Interests</span>
        </div>
        <div className="interests">
          {profile.interests && profile.interests.length > 0 ? (
            profile.interests.map((i) => (
              <span key={i} className="interest-tag">
                {i}
              </span>
            ))
          ) : (
            <p className="meta-sub">No interests listed</p>
          )}
        </div>
      </div>
    </div>
  );
}
