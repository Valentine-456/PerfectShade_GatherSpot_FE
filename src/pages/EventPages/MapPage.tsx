// src/pages/EventPages/MapPage.tsx

import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Header from "../../components/header/Header";
import MenuDrawer from "../../components/MenuDrawer/MenuDrawer";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { fetchEvents, EventSummary } from "../../api";
import "./MapPage.css";

export default function MapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Read your Maps API key from Vite env
  const googleMapsApiKey = import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY as string;

  // 1) Load the Google Maps JS API with the hook
  const { isLoaded: mapsLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
  });

  // 2) Fetch all events (with lat/lng) from your backend
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Failed to fetch events for map:", err);
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  // 3) Compute a center based on event coordinates (or fallback)
  const defaultCenter = events.length
    ? {
        lat: events.reduce((sum, e) => sum + e.latitude, 0) / events.length,
        lng: events.reduce((sum, e) => sum + e.longitude, 0) / events.length,
      }
    : { lat: 0, lng: 0 };

  // 4) Show errors or loading states as needed
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
      {/* HEADER (absolute, 35vh tall) */}
      <Header toggleDrawer={() => setIsOpen((o) => !o)} />
      <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />

      {/* MAIN CONTENT: absolutely fills from top:35vh to bottom:65px */}
      <div className="map-content">
        {(!mapsLoaded || loadingEvents) ? (
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
              />
            ))}
          </GoogleMap>
        )}
      </div>

      {/* FOOTER (fixed 65px tall) */}
      <FooterNavigation />
    </div>
  );
}
