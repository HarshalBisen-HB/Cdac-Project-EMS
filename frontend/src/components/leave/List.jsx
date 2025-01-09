import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Plus, Search, Loader, Clock, User } from "lucide-react";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="w-10 h-10 animate-spin text-purple-500" />
          <p className="text-gray-300">Loading leaves...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-6">
      {/* Header Card */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
        <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Manage Leaves
        </h3>
      </div>

      {/* Controls Card */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by Department..."
              className="w-full md:w-96 pl-12 pr-4 py-3 bg-gray-900 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Leave Button */}
          {user.role === "employee" && (
            <Link
              to="/employee-dashboard/add-leave"
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              <Plus size={20} />
              <span>Request Leave</span>
            </Link>
          )}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/90">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {sno++}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : leave.status === "Rejected"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DateTime Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-600/10 rounded-lg">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Current Date and Time (UTC)</p>
              <p className="text-white font-mono text-lg">
                {new Date().toLocaleString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                }).replace(',', '')}
              </p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 shadow-lg hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-600/10 rounded-lg">
              <User className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Current User's Login</p>
              <p className="text-white font-medium text-lg">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;