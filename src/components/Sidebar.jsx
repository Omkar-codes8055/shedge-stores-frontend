import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaPlusCircle } from "react-icons/fa";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-black text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
    }`;

  return (
    <div className="w-72 min-h-screen bg-white border-r shadow-xl p-6">
      <div className="flex items-center gap-3 mb-8 border-b pb-5">
        <img
          src="/logo.png"
          alt="Shedge Stores"
          className="w-14 h-14 rounded-xl object-cover shadow-md"
        />

        <div>
          <h2 className="text-2xl font-extrabold text-black">Shedge Stores</h2>

          <p className="text-sm text-gray-500">Premium Admin</p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          <FaTachometerAlt className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink to="/add-product" className={linkClass}>
          <FaPlusCircle />
          Add Product
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
