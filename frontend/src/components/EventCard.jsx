import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
            {event.category}
          </span>

          <span className="text-sm text-green-600 font-medium">
            {event.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mt-5">
          {event.title}
        </h3>

        <p className="text-slate-600 mt-3 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-800">Date:</span>{" "}
            {event.date}
          </p>

          <p>
            <span className="font-medium text-slate-800">Time:</span>{" "}
            {event.time}
          </p>

          <p>
            <span className="font-medium text-slate-800">Location:</span>{" "}
            {event.location}
          </p>

          <p>
            <span className="font-medium text-slate-800">Guests:</span>{" "}
            {event.attendees} attending
          </p>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="block mt-6 text-center bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;