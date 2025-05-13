import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import MenuDrawer from "../../components/MenuDrawer/MenuDrawer";
import EventCard from "../../components/EventCard/EventCard";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { getEvents, EventItem } from "../../api";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((err) => {
        console.error("Could not load events:", err);
      });
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="home-container">
      <Header toggleDrawer={() => setIsOpen((o) => !o)} />
      <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />

      <section className="event-list">
        {events.map((e) => (
          <Link
            to={`/events/${e.id}`}
            key={e.id}
            className="event-link"
          >
            <EventCard
              date={formatDate(e.date)}
              title={e.title}
              goingCount={e.attendees_count}
              location={e.location}
              image={""}
              icon={e.is_promoted ? "/assets/images/promoted.svg" : undefined}
            />
          </Link>
        ))}
      </section>

      <FooterNavigation />
    </div>
  );
}
