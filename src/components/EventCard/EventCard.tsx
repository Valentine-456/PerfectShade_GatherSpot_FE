// src/components/EventCard/EventCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

interface EventCardProps {
  id: string;
  date: string;
  title: string;
  goingCount: number;
  location: string;
  icon?: string;
  image?: string;  // URL path from API, e.g. "/media/event_images/..."
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  date,
  title,
  goingCount,
  location,
  icon,
  image,
}) => {
  // Fallback images for events without uploads
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
  const [fallbackBanner] = useState(getRandomImageUrl);

  // Compute the final banner URL:
  // If API returned an uploaded image path, prefix with backend base URL;
  // otherwise use the random fallback.
  const backendBase = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");
  const bannerUrl =
    image && image.trim()
      ? image.startsWith("http")
        ? image
        : `${backendBase}${image}`
      : fallbackBanner;

  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/events/${id}/view`)}
    >
      <div
        className="event-img"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />
      <div className="event-date">{date}</div>
      <div className="event-info">
        <h3>{title}</h3>
        <p className="going">{goingCount} Going</p>
        <p className="location">{location}</p>
        {icon && <img src={icon} alt="" className="event-icon" />}
      </div>
    </div>
  );
};

export default EventCard;
