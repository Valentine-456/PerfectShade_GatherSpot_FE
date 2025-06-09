import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById as getEvent, EventSummary, deleteEvent } from "../../api";
import EventIcon from "@/assets/images/party.png";
import PromotedEventIcon from "@/assets/images/star.png";
import LocationIcon from "@/assets/images/map.png";
import CalendarIcon from "@/assets/images/calendar.png";
import "./ViewEvent.css";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import ShareModal from "@/components/ShareModal/ShareModal";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
export default function ViewEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventSummary | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [showShare, setShowShare] = useState(false);

  const IMAGES = [
    "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_1280.jpg",
    "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
    "https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-a4983f2/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg",
    "https://thumbs.dreamstime.com/b/outdoor-festival-market-community-event-illustration-generative-ai-representing-celebration-363912224.jpg",
    "https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/08/NEW-USEditorsPicks_Inspiring-Event-Themes.png",
    "https://tounka02.wordpress.com/wp-content/uploads/2014/09/boston-comunity-showcase.jpg",
  ] as const;

  function getRandomImageUrl(): string {
    const idx = Math.floor(Math.random() * IMAGES.length);
    return IMAGES[idx];
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!id) return;
    getEvent(+id).then((e) => {
      setEvent(e);
      setBannerUrl(getRandomImageUrl());
    });
  }, [id]);

  if (!event) {
    return (
      <div className="phone-container">
        <p>Loading…</p>
      </div>
    );
  }

  const when = new Date(event.date);
  const dateStr = when.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = when.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleBuyTicket = async () => {
    const stripe = await stripePromise;
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/events/${id}/create-checkout-session/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("Bad response:", res.status, text);
      return alert("Payment failed. Please try again.");
    }

    const data = await res.json();
    console.log("Stripe session data:", data);

    if (!data.id) {
      alert("Stripe session ID missing. Please try again.");
      return;
    }
    const result = await stripe?.redirectToCheckout({ sessionId: data.id });

    if (result?.error) {
      console.error("Stripe redirect error:", result.error.message);
      alert("Stripe redirect failed: " + result.error.message);
    }
  };

  const handleCancelAttendance = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/events/${id}/rsvp/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok) {
      alert("You are no longer attending.");
      navigate(0); // Reload the page
    } else {
      alert("Failed to cancel attendance.");
    }
  };

  const defaultLat = 52.2297;
  const defaultLng = 21.0122;
  const latitude = event?.latitude ?? defaultLat;
  const longitude = event?.longitude ?? defaultLng;

  return (
    <div className="phone-container">
      <div className="profile-topshape" />

      <div className="profile-card view-event-card">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-arrow"
        >
          ←
        </button>

        <div className="event-banner">
          <img src={bannerUrl} alt={event.title} />
        </div>

        <h2 className="event-title">{event.title}</h2>
        <span className="event-going">Going {event.attendees_count}</span>

        <div className="event-meta">
          <div className="meta-item">
            <img src={CalendarIcon} className="meta-icon" />
            <div>
              <div className="meta-label">{dateStr}</div>
              <div className="meta-sub">{timeStr}</div>
            </div>
          </div>
          <div className="meta-item">
            <img src={LocationIcon} className="meta-icon location-icon" />
            <div className="meta-label">{event.location}</div>
          </div>
          <div className="meta-item">
            <img
              src={event.is_promoted ? PromotedEventIcon : EventIcon}
              alt="icon"
              className="meta-icon"
            />
            {event.is_promoted && <div className="promo-badge">Promoted</div>}
          </div>
        </div>

        <h3 className="section-title">About Event</h3>
        <p className="about-text">{event.description}</p>

        <div className="map-container">
          {!isLoaded && <p>Loading Map…</p>}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "250px",
                borderRadius: 8,
              }}
              center={{ lat: latitude, lng: longitude }}
              zoom={15}
              options={{
                disableDefaultUI: false,
                gestureHandling: "none",
                zoomControl: true,
                draggable: true,
                clickableIcons: false,
              }}
            >
              <Marker
                position={{ lat: latitude, lng: longitude }}
                clickable={false}
              />
            </GoogleMap>
          )}
        </div>

        <div className="view-action-buttons">
          <button className="outline-btn">Invite</button>
          <button className="outline-btn" onClick={() => setShowShare(true)}>
            Share
          </button>
        </div>

        {event.is_attending ? (
          <button
            onClick={handleCancelAttendance}
            className="primary-btn danger"
          >
            Cancel Attendance
          </button>
        ) : (
          <button onClick={handleBuyTicket} className="primary-btn buy-btn">
            Buy Ticket <span className="arrow">➔</span>
          </button>
        )}

        {event.is_owner && (
          <button
            className="primary-btn delete-btn"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this event?")) {
                await deleteEvent(`${event.id}`);
                navigate("/");
              }
            }}
          >
            Delete
          </button>
        )}
      </div>

      {showShare && (
        <ShareModal
          url={window.location.href}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
