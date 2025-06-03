import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, EventSummary, toggleRsvpEvent } from '../../api';
import EventIcon from "@/assets/images/party.png";
import PromotedEventIcon from "@/assets/images/star.png";
import LocationIcon from "@/assets/images/map.png"
import CalendarIcon from "@/assets/images/calendar.png"
import './ViewEvent.css';

export default function ViewEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventSummary|null>(null);
  const [bannerUrl, setBannerUrl] = useState<string>('');

const IMAGES = [
    "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_1280.jpg",
    "https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format,compress",
    "https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-a4983f2/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg",
    "https://thumbs.dreamstime.com/b/outdoor-festival-market-community-event-illustration-generative-ai-representing-celebration-363912224.jpg",
    "https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/08/NEW-USEditorsPicks_Inspiring-Event-Themes.png",
    "https://tounka02.wordpress.com/wp-content/uploads/2014/09/boston-comunity-showcase.jpg",
  ] as const;

  function getRandomImageUrl(): string {
    const idx = Math.floor(Math.random() * IMAGES.length);
    return IMAGES[idx];
  }


  useEffect(() => {
    if (!id) return;
    getEvent(+id).then(e => {
      setEvent(e);
      console.log(e);
      setBannerUrl(getRandomImageUrl());
    });
  }, [id]);

  if (!event) {
    return (
      <div className="phone-container">
        <p>Loading…</p>
      </div>
    );
  }

  const when = new Date(event.date);
  const dateStr = when.toLocaleDateString(undefined, {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const timeStr = when.toLocaleTimeString(undefined, {
    hour: 'numeric', minute: '2-digit'
  });

  const rsvpHandler = async () => {
    const rsvp = await toggleRsvpEvent(+id!!);
    alert(rsvp.message);
    navigate(0);
  }

  return (
    <div className="phone-container">
      <div className="profile-topshape" />

      <div className="profile-card view-event-card">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-arrow"
        >
          ←
        </button>

        <div className="event-banner">
          <img src={bannerUrl} alt={event.title} />
        </div>

        <h2 className="event-title">{event.title}</h2>
        <span className="event-going">
          Going {event.attendees_count}
        </span>

        <div className="event-meta">
          <div className="meta-item">
            <img src={CalendarIcon} className="meta-icon" />
            <div>
              <div className="meta-label">{dateStr}</div>
              <div className="meta-sub">{timeStr}</div>
            </div>
          </div>
          <div className="meta-item">
            <img src={LocationIcon} className="meta-icon location-icon" />
            <div className="meta-label">{event.location}</div>
          </div>
            <div className='meta-item'>
              <img src={event.is_promoted ? PromotedEventIcon : EventIcon} alt="icon" className="meta-icon" />
              {event.is_promoted && (<div className="promo-badge">Promoted</div>)}
            </div>
          
        </div>

        <h3 className="section-title">About Event</h3>
        <p className="about-text">{event.description}</p>

        <div className="view-action-buttons">
          <button className="outline-btn">Invite</button>
          <button className="outline-btn">Share</button>
        </div>

        <button onClick={rsvpHandler} className="primary-btn buy-btn">
          Buy/Return Ticket <span className="arrow">➜</span>
        </button>
      </div>
    </div>
  );
}
