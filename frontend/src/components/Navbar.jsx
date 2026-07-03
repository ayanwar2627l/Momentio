import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-medium"
      : "text-slate-700 hover:text-indigo-600";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block text-indigo-600 font-medium py-2"
      : "block text-slate-700 hover:text-indigo-600 py-2";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-indigo-600">
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

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-slate-600">
                Hi, <span className="font-semibold">{user.name}</span>
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

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-slate-100 px-3 py-2 rounded-lg text-slate-700"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4">
          <div className="space-y-1">
            <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClass}>
              Home
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/events"
                  onClick={closeMenu}
                  className={mobileNavLinkClass}
                >
                  Events
                </NavLink>

                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={mobileNavLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/create-event"
                  onClick={closeMenu}
                  className={mobileNavLinkClass}
                >
                  Create Event
                </NavLink>
              </>
            )}
          </div>

          <div className="border-t border-slate-200 mt-4 pt-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Hi, <span className="font-semibold">{user.name}</span>
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full bg-slate-100 text-slate-800 px-4 py-2 rounded-xl font-medium hover:bg-slate-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-center text-slate-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-center bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;