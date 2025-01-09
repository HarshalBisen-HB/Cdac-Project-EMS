import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Wallet,
  Settings,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm text-gray-300 h-screen fixed left-0 top-0 bottom-0 w-64 border-r border-gray-700/50 shadow-xl">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 h-16 flex items-center justify-center">
        <h3 className="text-3xl text-white bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          EMS
        </h3>
      </div>

      {/* Navigation Links */}
      <div className="px-3 py-4 space-y-1">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
          end
        >
          <LayoutDashboard size={20} strokeWidth={1.5} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <User size={20} strokeWidth={1.5} />
          <span className="font-medium">My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <CalendarDays size={20} strokeWidth={1.5} />
          <span className="font-medium">Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <Wallet size={20} strokeWidth={1.5} />
          <span className="font-medium">Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <Settings size={20} strokeWidth={1.5} />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>

      {/* User Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/50">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/50 flex items-center justify-center">
            <User size={20} className="text-purple-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-200">{user.name || "User"}</p>
            <p className="text-xs text-purple-400">Employee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;