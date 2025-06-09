import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function EventSuccess() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndRsvp = async () => {
      const sessionId = params.get("session_id");
      if (!sessionId || !id) return;

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

        // ✅ Redirect back to event view to reflect updated RSVP state
        navigate(`/events/${id}/view`);
      } catch (err) {
        console.error("Payment confirmation failed", err);
      }
    };

    confirmAndRsvp();
  }, [id, params, navigate]);

  return null; // ⬅️ no need to show anything since we redirect immediately
}
