import React from 'react';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';

const EmployeeDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar/>
      <div className="flex-1 ml-64">
        {/* Main Content Container */}
        <div className="min-h-screen bg-gray-900/95 backdrop-blur-sm">
          {/* Navbar Area */}
          <div className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
            <Navbar />
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Content Wrapper */}
            <div className="rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Footer Area - Optional */}
          <div className="mt-auto p-4 text-center text-gray-400 border-t border-gray-700/50">
            <p className="text-sm">
              Current Date and Time (UTC): {new Date().toLocaleString()}
            </p>
            <p className="text-sm text-purple-400">
              Current User's Login: HarshalBisen-HB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;