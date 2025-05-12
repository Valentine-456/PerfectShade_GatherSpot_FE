import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "../../components/EventForm/EventForm";
import { fetchEventById } from "../../api";

export default function UpdateEvent() {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchEventById(id).then(setEventData);
    }
  }, [id]);

  if (!eventData) {
    return <div className="phone-container">Loading…</div>;
  }

  return <EventForm mode="edit" initialData={eventData} />;
}