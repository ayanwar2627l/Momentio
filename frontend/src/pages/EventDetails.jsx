import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, deleteEvent, updateRsvp } = useEvents();

  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">Event not found</h1>

        <Link
          to="/events"
          className="inline-block mt-5 text-indigo-600 font-medium"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) return;

    deleteEvent(event.id);
    navigate("/events");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link to="/events" className="text-indigo-600 font-medium">
        ← Back to Events
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div>
            <span className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
              {event.category}
            </span>

            <h1 className="text-4xl font-bold text-slate-900 mt-5">
              {event.title}
            </h1>

            <p className="text-slate-600 mt-4 text-lg">
              {event.description}
            </p>
          </div>

          <span className="text-green-600 bg-green-50 px-4 py-2 rounded-xl font-medium">
            {event.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Date</p>
            <h3 className="font-bold text-slate-900 mt-1">{event.date}</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Time</p>
            <h3 className="font-bold text-slate-900 mt-1">{event.time}</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Location</p>
            <h3 className="font-bold text-slate-900 mt-1">
              {event.location}
            </h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Visibility</p>
            <h3 className="font-bold text-slate-900 mt-1">
              {event.visibility}
            </h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Attendees</p>
            <h3 className="font-bold text-slate-900 mt-1">
              {event.attendees} people
            </h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500">Your RSVP</p>
            <h3 className="font-bold text-slate-900 mt-1">
              {event.rsvp || "Not selected"}
            </h3>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">RSVP</h2>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={() => updateRsvp(event.id, "Going")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                event.rsvp === "Going"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              Going
            </button>

            <button
              onClick={() => updateRsvp(event.id, "Maybe")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                event.rsvp === "Maybe"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              Maybe
            </button>

            <button
              onClick={() => updateRsvp(event.id, "Not Going")}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                event.rsvp === "Not Going"
                  ? "bg-red-600 text-white"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
            >
              Not Going
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;