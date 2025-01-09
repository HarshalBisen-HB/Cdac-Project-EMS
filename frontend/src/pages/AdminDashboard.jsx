import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <div className="flex flex-col h-full">
          <Navbar />
          
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="container mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6">
                <Outlet />
              </div>
            </div>
          </main>
          
          <footer className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/50 p-4">
            <div className="container mx-auto text-center text-gray-400 text-sm">
              © 2024 Employee Management System. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;