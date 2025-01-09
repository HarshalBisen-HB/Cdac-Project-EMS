import React from 'react';
import { useAuth } from '../../context/authContext';
import { UserCircle, LogOut, Bell, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 bg-gray-900/50 py-2 px-4 rounded-lg">
          <UserCircle className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Welcome back,</p>
            <p className="text-white font-semibold -mt-1">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-gray-700/50"></div>

        <button 
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;