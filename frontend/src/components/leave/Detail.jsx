import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setLeave(responnse.data.leave);
        }
      } catch (error) {
        console.log("Errrror: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const responnse = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (responnse.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  if (!leave) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900/95 text-purple-400">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        Leave Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
              className="w-64 h-64 rounded-xl border-4 border-purple-500/20 shadow-lg object-cover"
              alt="Profile"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-900/50 to-transparent"></div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
          <InfoRow label="Name" value={leave.employeeId.userId.name} />
          <InfoRow label="Employee ID" value={leave.employeeId.employeeId} />
          <InfoRow label="Leave Type" value={leave.leaveType} />
          <InfoRow label="Reason" value={leave.reason} />
          <InfoRow
            label="Department"
            value={leave.employeeId.department.dep_name}
          />
          <InfoRow
            label="Start Date"
            value={new Date(leave.startDate).toLocaleDateString()}
          />
          <InfoRow
            label="End Date"
            value={new Date(leave.endDate).toLocaleDateString()}
          />

          {/* Status/Action Section */}
          <div className="flex items-center space-x-3">
            <p className="text-lg font-bold text-purple-400">
              {leave.status === "Pending" ? "Action:" : "Status:"}
            </p>
            {leave.status === "Pending" ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => changeStatus(leave._id, "Approved")}
                  className="px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => changeStatus(leave._id, "Rejected")}
                  className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            ) : (
              <span
                className={`font-medium ${
                  leave.status === "Approved"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {leave.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
        <p className="text-sm text-gray-400">
          Current Date and Time (UTC): {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Helper Component for Info Rows
const InfoRow = ({ label, value }) => (
  <div className="flex items-center space-x-3">
    <p className="text-lg font-bold text-purple-400">{label}:</p>
    <p className="font-medium text-gray-300">{value}</p>
  </div>
);

export default Detail;
