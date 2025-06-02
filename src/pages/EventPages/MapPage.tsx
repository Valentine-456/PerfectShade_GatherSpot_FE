// src/pages/EventPages/MapPage.tsx
import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Header from "../../components/header/Header";
import MenuDrawer from "../../components/MenuDrawer/MenuDrawer";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import { fetchEvents, EventSummary } from "../../api";
import "./MapPage.css";

export default function MapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Store a ref to hold whether we have already loaded <LoadScript>
  const hasLoadedScript = useRef<boolean>(false);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Failed to fetch events for map:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Compute center (average or fallback)
  const defaultCenter = events.length
    ? {
        lat: events.reduce((sum, e) => sum + e.latitude, 0) / events.length,
        lng: events.reduce((sum, e) => sum + e.longitude, 0) / events.length,
      }
    : { lat: 0, lng: 0 };

  // before rendering, detect if `window.google` is already present
  // so we don’t load the script twice
  const shouldLoadScript =
    typeof window !== "undefined" && !window.google && !hasLoadedScript.current;

  if (shouldLoadScript) {
    hasLoadedScript.current = true;
  }

  // This function is called when the map is first initialized
  const onMapLoad = (mapInstance: google.maps.Map) => {
    // If you decide to migrate to AdvancedMarkerElement, you could set them here:
    //   events.forEach(e => {
    //     new google.maps.marker.AdvancedMarkerElement({ map: mapInstance, position: { lat: e.latitude, lng: e.longitude }, title: e.title });
    //   });
    //
    // For now, we’re still using <Marker> below, so nothing special required here.
  };

  return (
    <div className="map-page-container">
      {/* ========== HEADER ========== */}
      <Header toggleDrawer={() => setIsOpen((o) => !o)} />
      <MenuDrawer isOpen={isOpen} toggleDrawer={() => setIsOpen((o) => !o)} />

      {/* ========== MAIN: map-content ========== */}
      <div className="map-content">
        {loading ? (
          <p className="map-loading">Loading map…</p>
        ) : shouldLoadScript ? (
          // If `window.google` is _not_ present, we load the script
          <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            onLoad={() => {
              console.log("Google Maps script loaded.");
            }}
          >
            <GoogleMap
              mapContainerClassName="map-container"
              center={defaultCenter}
              zoom={events.length ? 10 : 2}
              onLoad={onMapLoad}
            >
              {events.map((e) => (
                <Marker
                  key={e.id}
                  position={{ lat: e.latitude, lng: e.longitude }}
                  title={e.title}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        ) : (
          // If `window.google` already exists, just render <GoogleMap> directly
          <GoogleMap
            mapContainerClassName="map-container"
            center={defaultCenter}
            zoom={events.length ? 10 : 2}
            onLoad={onMapLoad}
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

      {/* ========== FOOTER ========== */}
      <FooterNavigation />
    </div>
  );
}
