import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-indigo-600 font-semibold mb-3">
            Plan. Invite. Celebrate.
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900">
            Manage every event in one beautiful place.
          </h1>

          <p className="mt-5 text-lg text-slate-600">
            Momentio helps users create social gatherings, meetings, parties,
            community events, and more.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-6 py-3 rounded-xl font-medium hover:bg-slate-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
          <div className="bg-indigo-50 rounded-2xl p-5 mb-4">
            <p className="text-sm text-indigo-600 font-semibold">Upcoming</p>
            <h3 className="text-2xl font-bold mt-2">Birthday Hangout</h3>
            <p className="text-slate-600 mt-2">July 12, 2026 · 7:00 PM</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
              <span>Guests</span>
              <strong>18 Going</strong>
            </div>

            <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
              <span>Location</span>
              <strong>Downtown Cafe</strong>
            </div>

            <div className="flex justify-between bg-slate-50 p-4 rounded-xl">
              <span>Status</span>
              <strong className="text-green-600">Active</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;