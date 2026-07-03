import { useState } from "react";
import EventCard from "../components/EventCard";
import { useEvents } from "../context/EventContext";

function Events() {
  const { events } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-600 mt-2">
            Discover and manage events created in Momentio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>All</option>
            <option>Social</option>
            <option>Business</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 mt-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            No events found
          </h2>
          <p className="text-slate-600 mt-2">
            Try changing your search or category filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;