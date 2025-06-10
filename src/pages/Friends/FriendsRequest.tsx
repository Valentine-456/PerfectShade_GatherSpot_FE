import { useEffect, useState } from "react";
import { FriendRequest, getFriendData, respondToRequest } from "@/api";
import "./Friends.css";

export default function FriendRequests() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userID"));
    getFriendData(userId).then((res) => {
      setRequests(res.incoming);
    });
  }, []);

  const handleAccept = (id: number) => {
    respondToRequest(id, "accept").then(() =>
      setRequests((prev) => prev.filter((r) => r.id !== id))
    );
  };

  const handleDecline = (id: number) => {
    respondToRequest(id, "decline").then(() =>
      setRequests((prev) => prev.filter((r) => r.id !== id))
    );
  };

  return (
    <div className="friends-page">
      <h2>Incoming Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="friend-requests">
          {requests.map((req) => (
            <li key={req.id}>
              {req.from_user.username}
              <button onClick={() => handleAccept(req.id)}>Accept</button>
              <button onClick={() => handleDecline(req.id)}>Decline</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
