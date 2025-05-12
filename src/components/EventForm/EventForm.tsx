import { useState, FormEvent } from "react";
import { EventData, createEvent, updateEvent } from "../../api";
import { useNavigate } from "react-router-dom";
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
      is_promoted: false,
    },
  );
  const [saving, setSaving] = useState(false);

  const onChange =
    <K extends keyof EventData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val =
        key === "is_promoted"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: val }) as EventData);
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === "create") {
        await createEvent(form);
      } else if (initialData?.id) {
        await updateEvent(initialData.id, form);
      }
      navigate("/");
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

        <button type="submit" className="primary-btn" disabled={saving}>
          {mode === "create" ? "Create" : "Save"}
        </button>
      </form>
    </div>
  );
}