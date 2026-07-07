import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white shadow-lg rounded-2xl px-8 py-5 flex justify-between items-center mb-6">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800">
          E Commerce Admin Panel
        </h1>

        <div className="flex items-center gap-5 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            {currentDate}
          </span>

          <span className="flex items-center gap-2">
            <FaClock />
            {currentTime}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-5 py-3">
          <FaUserCircle className="text-4xl text-yellow-500" />

          <div>
            <h2 className="font-bold text-gray-800">
              {admin?.name || "Administrator"}
            </h2>

            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-semibold transition duration-300 shadow-md"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
