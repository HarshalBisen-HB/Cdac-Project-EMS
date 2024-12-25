import React, { useState } from "react";
import { Twitter, Github, Mail } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {login} = useAuth();
 const navigate = useNavigate();


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
     if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token);
        if(response.data.user.role === "admin"){
        navigate('/admin-dashboard')

     } else{
        navigate('/employee-dashboard')
     } 
    }
   } catch (error) {
      if(error.response && !error.response.data.success){
        setError(error.response.data.error);
    }else{
        setError("server error");
    }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>
         {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Email
            </label>
            <input
              type="Email"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-purple-400 text-sm font-medium hover:text-purple-300 transition duration-200"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transform hover:-translate-y-0.5 transition duration-200"
          >
            Sign in
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-400 bg-gray-800">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button className="p-2 bg-gray-900 rounded-xl hover:bg-purple-600 border border-gray-700 transition duration-200 hover:-translate-y-0.5">
              <Mail size={24} className="text-gray-400 hover:text-white" />
            </button>
            <button className="p-2 bg-gray-900 rounded-xl hover:bg-purple-600 border border-gray-700 transition duration-200 hover:-translate-y-0.5">
              <Twitter size={24} className="text-gray-400 hover:text-white" />
            </button>
            <button className="p-2 bg-gray-900 rounded-xl hover:bg-purple-600 border border-gray-700 transition duration-200 hover:-translate-y-0.5">
              <Github size={24} className="text-gray-400 hover:text-white" />
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-purple-400 font-semibold hover:text-purple-300 transition duration-200"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
