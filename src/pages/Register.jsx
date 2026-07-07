import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <AuthLayout
      title="Create Admin Account"
      subtitle="Premium Admin Dashboard"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-200 mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-yellow-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-yellow-400 transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-yellow-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition duration-300 shadow-lg"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
