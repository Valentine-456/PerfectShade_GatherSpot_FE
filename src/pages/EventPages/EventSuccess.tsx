import { useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";

export default function EventSuccess() {
  const { id } = useParams();
  const [params] = useSearchParams();

  useEffect(() => {
    const confirmAndRsvp = async () => {
      const sessionId = params.get("session_id");
      if (!sessionId || !id) {
        return;
      }

      try {
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/events/${id}/confirm-checkout/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ session_id: sessionId }),
          }
        );
      } catch (err) {
        console.error("Payment confirmation failed", err);
      }
    };

    confirmAndRsvp();
  }, [id, params]);

  return (
    <div className="phone-container">
      <h2>🎉 Ticket Purchased</h2>
      <p>You are now attending this event!</p>
      <Link to="/" className="primary-btn">
        Back to Events
      </Link>
    </div>
  );
}
