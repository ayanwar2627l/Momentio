import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function Dashboard() {
  const { events } = useEvents();

  const totalEvents = events.length;
  const upcomingEvents = events.filter(
    (event) => event.status === "Upcoming"
  ).length;
  const rsvpEvents = events.filter((event) => event.rsvp).length;

  const recentEvents = events.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Manage your upcoming events.
          </p>
        </div>

        <Link
          to="/create-event"
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-indigo-700 transition text-center"
        >
          Create Event
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500">Total Events</p>
          <h2 className="text-4xl font-bold mt-2">{totalEvents}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500">Upcoming</p>
          <h2 className="text-4xl font-bold mt-2">{upcomingEvents}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500">RSVP Selected</p>
          <h2 className="text-4xl font-bold mt-2">{rsvpEvents}</h2>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recent Events</h2>
          <p className="text-slate-600 mt-1">
            Your latest created events.
          </p>
        </div>

        <Link to="/events" className="text-indigo-600 font-medium">
          View all
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {recentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;