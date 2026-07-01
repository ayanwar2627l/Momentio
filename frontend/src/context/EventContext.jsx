import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

const starterEvents = [
  {
    id: "1",
    title: "Birthday Hangout",
    description:
      "A fun birthday celebration with friends, music, food, and games.",
    category: "Social",
    date: "2026-07-12",
    time: "19:00",
    location: "Downtown Cafe",
    visibility: "Private",
    attendees: 18,
    status: "Upcoming",
    rsvp: "",
  },
  {
    id: "2",
    title: "College Meetup",
    description:
      "A casual meetup for college students to connect and share ideas.",
    category: "Education",
    date: "2026-07-18",
    time: "16:30",
    location: "City Library Hall",
    visibility: "Public",
    attendees: 42,
    status: "Upcoming",
    rsvp: "",
  },
  {
    id: "3",
    title: "Startup Networking Night",
    description:
      "Meet founders, developers, designers, and investors in your area.",
    category: "Business",
    date: "2026-07-25",
    time: "18:00",
    location: "Innovation Hub",
    visibility: "Public",
    attendees: 96,
    status: "Upcoming",
    rsvp: "",
  },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("momentio-events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return starterEvents;
  });

  useEffect(() => {
    localStorage.setItem("momentio-events", JSON.stringify(events));
  }, [events]);

  function addEvent(eventData) {
    const newEvent = {
      id: crypto.randomUUID(),
      ...eventData,
      attendees: 0,
      status: "Upcoming",
      rsvp: "",
    };

    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  }

  function deleteEvent(id) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }
  function updateEvent(id,updatedData){
    setEvents((prevEvents)=>{
      prevEvents.map((event)=>event.id===id?{...event,...updatedData}:event)//ternay will update the event with updatedData else event data
    });
  }

  function updateRsvp(id, rsvpStatus) {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              rsvp: rsvpStatus,
            }
          : event
      )
    );
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
        updateEvent,
        updateRsvp,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}