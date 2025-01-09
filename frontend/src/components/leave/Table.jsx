import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";
import { Search, Loader, Clock, User } from "lucide-react";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  // Custom DataTable styles
  const customStyles = {
    header: {
      style: {
        backgroundColor: 'rgb(31 41 55 / 0.9)',
        color: 'rgb(209 213 219)',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'rgb(31 41 55 / 0.9)',
        color: 'rgb(168 85 247)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: '600',
      },
    },
    headCells: {
      style: {
        padding: '16px',
        borderBottom: '1px solid rgb(75 85 99 / 0.4)',
      },
    },
    rows: {
      style: {
        backgroundColor: 'rgb(17 24 39 / 0.8)',
        '&:hover': {
          backgroundColor: 'rgb(31 41 55 / 0.8)',
          cursor: 'pointer',
        },
        color: 'rgb(229 231 235)',
        fontSize: '0.875rem',
      },
    },
    cells: {
      style: {
        padding: '16px',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'rgb(31 41 55 / 0.9)',
        color: 'rgb(209 213 219)',
        borderTopWidth: '1px',
        borderColor: 'rgb(75 85 99 / 0.4)',
      },
      pageButtonsStyle: {
        color: 'rgb(168 85 247)',
        fill: 'rgb(168 85 247)',
        '&:disabled': {
          color: 'rgb(156 163 175)',
          fill: 'rgb(156 163 175)',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: 'rgb(168 85 247 / 0.2)',
        },
      },
    },
  };

  if (!filteredLeaves) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="w-10 h-10 animate-spin text-purple-500" />
          <p className="text-gray-300">Loading leaves data...</p>
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
              placeholder="Search by Employee ID..."
              onChange={filterByInput}
              className="w-full md:w-96 pl-12 pr-4 py-3 bg-gray-900 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {['Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => filterByButton(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                  ${status === 'Pending'
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20'
                    : status === 'Approved'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DataTable Card */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          customStyles={customStyles}
        />
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
              <p className="text-white font-medium text-lg">HarshalBisen-HB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;