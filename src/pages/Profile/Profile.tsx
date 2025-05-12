import { Link } from "react-router-dom";
import "./Profile.css";
import userAvatar from "@/assets/images/user-avatar.png";

const Profile = () => {
  const interests = ["Board Games", "Concert", "Music", "Movie", "Art"];

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
            <span className="number">3</span>
            <span className="label">Friends</span>
          </div>
          <div className="stat">
            <span className="number">0</span>
            <span className="label">Events</span>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>

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
      </div>
    </div>
  );
};

export default Profile;
