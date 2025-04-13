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
  return (
    <div className="event-card">
      <div
        className="event-img"
        style={{ backgroundImage: `url(${image})` }}
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
