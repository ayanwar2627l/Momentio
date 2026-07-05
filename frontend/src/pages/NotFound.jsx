import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
      <div className="max-w-lg text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-indigo-600 font-semibold">404</p>

        <h1 className="text-4xl font-bold text-slate-900 mt-3">
          Page not found
        </h1>

        <p className="text-slate-600 mt-4">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="bg-slate-100 text-slate-800 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFound;