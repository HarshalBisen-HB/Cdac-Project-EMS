import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  Wallet,
  Settings,
  Gauge,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm text-gray-300 h-screen fixed left-0 top-0 bottom-0 w-64 border-r border-gray-700/50 shadow-xl">
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 h-16 flex items-center justify-center">
        <h3 className="text-3xl text-white bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          EMS
        </h3>
      </div>

      <div className="px-3 py-4 space-y-1">
        <NavLink
          to="/admin-dashboard"
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
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <Users size={20} strokeWidth={1.5} />
          <span className="font-medium">Employee</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <Building2 size={20} strokeWidth={1.5} />
          <span className="font-medium">Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-500"
                : "hover:bg-gray-800/60 hover:text-gray-200 border-l-4 border-transparent"
            } flex items-center space-x-4 py-3 px-4 rounded-lg transition-all duration-300`
          }
        >
          <CalendarDays size={20} strokeWidth={1.5} />
          <span className="font-medium">Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
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
          to="/admin-dashboard/setting"
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
    </div>
  );
};

export default AdminSidebar;
