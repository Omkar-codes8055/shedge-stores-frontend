import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Premium Admin Dashboard"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-gray-200 mb-2 block">Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/30 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
        </div>

        <div className="mt-5">
          <label className="text-gray-200 mb-2 block">Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black/30 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-yellow-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl duration-300"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
