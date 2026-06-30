import { Link } from "react-router";

function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Momentio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-700 hover:text-indigo-600">
            Home
          </Link>

          <Link to="/dashboard" className="text-slate-700 hover:text-indigo-600">
            Dashboard
          </Link>

          <Link
            to="/create-event"
            className="text-slate-700 hover:text-indigo-600"
          >
            Create Event
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-slate-700 hover:text-indigo-600 font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;