// src/pages/EventDetails/EventDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, EventItem } from "../../api";
import "./EventDetails.css";
import CalendarIcon from "../../assets/images/icon-calendar.svg";
import LocationIcon  from "../../assets/images/icon-location.svg";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then((evt) => {
        setEvent(evt);
      })
      .catch((err) => {
        console.error("Failed to load event:", err);
        setError(err.message || "Unknown error");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  if (loading) {
    return <div className="event-details">Loading…</div>;
  }
  if (error) {
    return (
      <div className="event-details">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <p className="error">Error: {error}</p>
      </div>
    );
  }
  if (!event) {
    return null;
  }

  return (
    <div className="event-details">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ←
      </button>

      {/* if your API supplies an image URL, replace the placeholder below
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-banner"
        />
      )} */}

      <div className="event-body">
        <h1 className="event-title">{event.title}</h1>
        <span className="going-count">
          Going {event.attendees_count}
        </span>

        <div className="event-meta">
          <div className="meta-item">
          <img src={CalendarIcon} className="meta-icon" alt="Calendar" />
            <div>
              <div className="meta-line1">
                {formatDate(event.date)}
              </div>
              {/* if your API returns start/end times separately, render here */}
            </div>
          </div>

          <div className="meta-item">
          <img src={LocationIcon} className="meta-icon" alt="Location" />
            <div>
              <div className="meta-line1">Location</div>
              <div className="meta-line2">{event.location}</div>
            </div>
          </div>
        </div>

        <h2 className="section-heading">About Event</h2>
        <p className="event-description">{event.description}</p>

        {/* if you have a ticket endpoint or price data, wire it up here */}
      </div>
    </div>
  );
}
