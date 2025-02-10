import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Plus, Search, Loader, Clock, User, Calendar, AlertCircle } from "lucide-react";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  const [leaveCount, setLeaveCount] = useState(22);
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
        updateLeaveCount(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  const updateLeaveCount = (leavesList) => {
    const rejectedLeaves = leavesList.filter(leave => leave.status === "Rejected").length;
    setLeaveCount(22 - leavesList.length + rejectedLeaves);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex flex-col items-center space-y-4 bg-gray-800/50 p-8 rounded-2xl backdrop-blur-lg border border-gray-700/50">
          <Loader className="w-12 h-12 animate-spin text-purple-500" />
          <p className="text-gray-300 text-lg">Loading your leave data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 p-8 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-800/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-purple-500/10 rounded-full">
            <Calendar className="h-10 w-10 text-purple-400" />
          </div>
          <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Manage Leaves
          </h3>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-auto group">
            <input
              type="text"
              placeholder="Search by Department..."
              className="w-full md:w-96 pl-12 pr-4 py-4 bg-gray-900/80 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
            />
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-gray-900/80 px-6 py-3 rounded-xl border-2 border-red-500/30 shadow-lg shadow-red-500/5 hover:shadow-red-500/10 transition-all duration-300">
              <span className="text-gray-400">Count: </span>
              <span className="text-red-400 font-bold text-lg">{leaveCount}</span>
            </div>

            {user.role === "employee" && (
              <Link
                to="/employee-dashboard/add-leave"
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 border border-purple-500/20 hover:border-purple-500/40"
                onClick={() => setLeaveCount(prev => Math.max(0, prev - 1))}
              >
                <Plus size={20} />
                <span className="font-medium">Request Leave</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gradient-to-r from-gray-800/90 to-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/90">
              <tr>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  To
                </th>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-8 py-5 text-left text-sm font-medium text-purple-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="bg-gray-900/20 hover:bg-gray-800/40 transition-all duration-200"
                >
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-300">
                    {sno++}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-white">
                    {leave.leaveType}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-300">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-300">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-300">
                    {leave.reason}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium border-2 backdrop-blur-sm ${
                        leave.status === "Approved"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : leave.status === "Rejected"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-purple-500/10 rounded-xl">
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Current Date and Time (UTC)</p>
              <p className="text-white font-mono text-xl mt-1">
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

        <div className="bg-gradient-to-r from-gray-800/90 to-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-purple-500/10 rounded-xl">
              <User className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Current User's Login</p>
              <p className="text-white font-medium text-xl mt-1">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;