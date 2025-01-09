import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#111827]">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-600/90 z-10"></div>
        <img 
          src="/api/placeholder/1000/1000" 
          alt="Interior Design" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Empower Your Team with Our Employee Portal
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Our Employee Portal streamlines task management, attendance tracking, and leave requests, ensuring your team stays organized and productive. Experience seamless communication and enhance performance with our user-friendly platform.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">LogIn</h2>
            <p className="mt-2 text-gray-400">Welcome Back! Please enter your details.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-purple-500 focus:ring-purple-500/20"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me for 10 days</span>
              </label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              Log in
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#111827] text-gray-400">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full px-4 py-3 border border-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5" />
              <span className="text-gray-300">Sign In With Google</span>
            </button>

            <p className="text-center text-sm text-gray-400">
              Don't have a account?{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Sign up for free
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;