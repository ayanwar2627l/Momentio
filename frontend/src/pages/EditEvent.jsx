import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, updateEvent } = useEvents();

  const event = events.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    category: event?.category || "Social",
    visibility: event?.visibility || "Private",
  });

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

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    updateEvent(id, formData);

    navigate(`/events/${id}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to={`/events/${id}`} className="text-indigo-600 font-medium">
        ← Back to Event
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-6">
        <h1 className="text-3xl font-bold text-slate-900">Edit Event</h1>

        <p className="text-slate-600 mt-2">
          Update your event details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Birthday party"
              className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event"
              rows="4"
              className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Downtown Cafe"
              className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Social</option>
                <option>Business</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Visibility
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Private</option>
                <option>Public</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Update Event
            </button>

            <button
              type="button"
              onClick={() => navigate(`/events/${id}`)}
              className="flex-1 bg-slate-100 text-slate-800 py-3 rounded-xl font-medium hover:bg-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;