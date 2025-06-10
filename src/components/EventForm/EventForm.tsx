import { useState, FormEvent } from "react";
import { EventData, createEvent, updateEvent } from "../../api";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./EventForm.css";

interface EventFormProps {
  initialData?: EventData;
  mode: "create" | "edit";
}

export default function EventForm({ initialData, mode }: EventFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<EventData>(
    initialData ?? {
      title: "",
      description: "",
      location: "",
      date: "",
      latitude: 52.2297,
      longitude: 21.0122,
      is_promoted: false,
    },
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const center = { lat: form.latitude!!, lng: form.longitude!! };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onChange =
    <K extends keyof EventData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val =
        key === "is_promoted"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: val }) as EventData);
    };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // build form data
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      data.append(k, v as string);
    });
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (mode === "create") {
        await createEvent(data);
      } else if (initialData?.id) {
        await updateEvent(initialData.id, data);
      }
      // redirect…
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="phone-container">
      <div className="form-topshape" />

      <form className="form-card" onSubmit={onSubmit}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-arrow"
        >
          ←
        </button>

        <h2>{mode === "create" ? "Create Event" : "Edit Event"}</h2>

        <label className="field">
          <span>Title*</span>
          <input
            type="text"
            value={form.title}
            onChange={onChange("title")}
            minLength={1}
            maxLength={255}
            required
          />
        </label>

        <label className="field">
          <span>Date*</span>
          <input
            type="datetime-local"
            value={form.date}
            onChange={onChange("date")}
            required
          />
        </label>

        <label className="field">
          <span>Location*</span>
          <input
            type="text"
            value={form.location}
            onChange={onChange("location")}
            minLength={1}
            maxLength={255}
            required
          />
        </label>

        <label className="field">
          <span>Description*</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={onChange("description")}
            minLength={1}
            required
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.is_promoted}
            onChange={onChange("is_promoted")}
          />
          Promote this event
        </label>

         <label className="field">
          <span>Image</span>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </label>

        <button type="submit" className="primary-btn" disabled={saving}>
          {mode === "create" ? "Create" : "Save"}
        </button>

        <div className="map-wrapper">
          <h4>Pick Event Location</h4>
          <div className="map-frame-container">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "8px",
                }}
                center={center}
                zoom={14}
                onClick={(e) =>
                  setForm((f) => ({
                    ...f,
                    latitude: e.latLng?.lat() ?? f.latitude,
                    longitude: e.latLng?.lng() ?? f.longitude,
                  }))
                }
              >
                <Marker position={center} />
              </GoogleMap>
            )}
            <p className="location-coords">
              Lat: {form.latitude?.toFixed(4)}, Lng:{" "}
              {form.longitude?.toFixed(4)}
            </p>
          </div>
        </div>

        <button type="submit" className="primary-btn" disabled={saving}>
          {mode === "create" ? "Create" : "Save"}
        </button>
      </form>
    </div>
  );
}
