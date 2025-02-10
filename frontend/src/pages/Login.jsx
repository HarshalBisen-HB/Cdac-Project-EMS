import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from "../assets/login.json";
import slide1Animation from "../assets/management.json";
import slide2Animation from "../assets/salary.json";
import slide3Animation from "../assets/leave.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const slides = [
    {
      title: "Empower Your Team with Our Employee Portal",
      description: "Efficiently manage employee profiles, track performance, and maintain up-to-date records. Our intuitive interface ensures your HR team stays organized and productive.",
      animation: slide1Animation
    },
    {
      title: "Accurate Salary Management",
      description: "Manage payroll, deductions, and salary disbursements with precision. Our system ensures timely and accurate salary processing.",
      animation: slide2Animation
    },
    {
      title: "Efficient Leave Management",
      description: "Easily manage employee leave requests, approvals, and balances. Ensure smooth operations with real-time leave tracking.",
      animation: slide3Animation
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex bg-[#111827]">
      {/* Left Side - Sliding Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-600/90 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out flex flex-col justify-center px-12 ${
                  index === currentSlide 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentSlide 
                    ? '-translate-x-full opacity-0' 
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-1/2 pr-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-200 mb-8">
                      {slide.description}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <Player
                      autoplay
                      loop
                      src={slide.animation}
                      style={{ height: '300px', width: '300px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Player
                autoplay
                loop
                src={animationData}
                style={{ height: '150px', width: '150px' }}
              />
            </div>
            <h2 className="text-3xl font-bold text-white">LogIn</h2>
            <p className="mt-2 text-gray-400">Welcome Back! Please enter your details.</p>
          </div>

          {/* Rest of the login form remains the same */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Form inputs remain the same as in previous version */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                placeholder="Enter your email"
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Rest of the form remains the same */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-purple-500 focus:ring-purple-500/20"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me for 30 days</span>
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
              Don't have an account?{' '}
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