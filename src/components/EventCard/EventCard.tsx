import { useState } from "react";
import "./EventCard.css";

interface EventCardProps {
  date: string;
  title: string;
  goingCount: number;
  location: string;
  icon?: string;
  image: string;
}

const EventCard = ({
  date,
  title,
  goingCount,
  location,
  icon,
  image,
}: EventCardProps) => {
  const IMAGES = [
    "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_1280.jpg",
    "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
    "https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-a4983f2/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg",
    "https://thumbs.dreamstime.com/b/outdoor-festival-market-community-event-illustration-generative-ai-representing-celebration-363912224.jpg",
    "https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/08/NEW-USEditorsPicks_Inspiring-Event-Themes.png",
    "https://tounka02.wordpress.com/wp-content/uploads/2014/09/boston-comunity-showcase.jpg",
  ] as const;

  // 2) Utility to pick one at random
  function getRandomImageUrl(): string {
    const idx = Math.floor(Math.random() * IMAGES.length);
    return IMAGES[idx];
  }

  const [bannerUrl] = useState(getRandomImageUrl);

  return (
    <div className="event-card">
      <div
        className="event-img"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      ></div>
      <div className="event-date">{date}</div>
      <div className="event-info">
        <h3>{title}</h3>
        <p className="going">{goingCount} Going</p>
        <p className="location">{location}</p>
        {icon && <img src={icon} alt="icon" className="event-icon" />}
      </div>
    </div>
  );
};

export default EventCard;
