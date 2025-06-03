import "./Home.css";
import EventCard from "../../components/EventCard/EventCard";
import Header from "../../components/header/Header";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { useEffect, useState } from "react";
import MenuDrawer from "../../components/MenuDrawer/MenuDrawer";
import { EventSummary, fetchEvents } from "../../api";
import EventIcon from "@/assets/images/party.png";
import PromotedEventIcon from "@/assets/images/star.png";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchEvents()
      .then((events) => {
        setEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load events");
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <Header toggleDrawer={() => setIsOpen((o) => !o)} />
      <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />

      <section className="event-list">
        {loading && <p>Loading events…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && events.length === 0 && <p>No events found.</p>}
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            date={new Date(ev.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            title={ev.title}
            goingCount={ev.attendees_count}
            location={ev.location}
            icon={ev.is_promoted ? PromotedEventIcon : EventIcon}
            id={ev.id}
            image="https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-a4983f2/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg"
          />
        ))}
      </section>

      <FooterNavigation />
    </div>
  );
}
