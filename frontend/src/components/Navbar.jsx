import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-medium"
      : "text-slate-700 hover:text-indigo-600";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Momentio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/events" className={navLinkClass}>
                Events
              </NavLink>

              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/create-event" className={navLinkClass}>
                Create Event
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600">
                Hi, <span className="font-semibold">{user?.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl font-medium hover:bg-slate-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;