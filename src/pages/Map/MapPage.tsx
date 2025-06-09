import { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Header from "../../components/header/Header";
import MenuDrawer from "../../components/MenuDrawer/MenuDrawer";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { fetchEvents, EventSummary } from "../../api";
import "./MapPage.css";
import { useNavigate } from "react-router-dom";

export default function MapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [promotedOnly, setPromotedOnly] = useState<boolean>(false);
  const navigate = useNavigate();

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  const { isLoaded: mapsLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
  });

  useEffect(() => {
    fetchEvents(searchTerm, promotedOnly)
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Failed to fetch events for map:", err);
      })
      .finally(() => setLoadingEvents(false));
  }, [searchTerm, promotedOnly]);

  const defaultCenter = events.length
    ? {
        lat: events.reduce((sum, e) => sum + e.latitude, 0) / events.length,
        lng: events.reduce((sum, e) => sum + e.longitude, 0) / events.length,
      }
    : { lat: 52.2297, lng: 21.0122 };

  if (loadError) {
    return (
      <div className="map-page-container">
        <Header toggleDrawer={() => setIsOpen((o) => !o)} />
        <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />
        <div className="map-content">
          <p className="map-loading">
            Error loading Google Maps. Please try again later.
          </p>
        </div>
        <FooterNavigation />
      </div>
    );
  }

  return (
    <div className="map-page-container">
      <Header
        toggleDrawer={() => setIsOpen((o) => !o)}
        searchTerm={searchTerm}
        promotedOnly={promotedOnly}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setPromotedOnly((p) => !p)}
      />
      <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />

      <div className="map-content">
        {!mapsLoaded || loadingEvents ? (
          <p className="map-loading">Loading map…</p>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={defaultCenter}
            zoom={events.length ? 10 : 2}
          >
            {events.map((e) => (
              <Marker
                key={e.id}
                position={{ lat: e.latitude, lng: e.longitude }}
                title={e.title}
                onClick={() => navigate(`/events/${e.id}/view`)}
              />
            ))}
          </GoogleMap>
        )}
      </div>
      <FooterNavigation />
    </div>
  );
}
