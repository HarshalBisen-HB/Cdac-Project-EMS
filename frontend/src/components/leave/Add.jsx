import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
    const {user} = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLeave((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/leave/add`,
                leave,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Request for Leave
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-4">
                    {/* Leave Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Date Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="reason"
                            placeholder="Enter your reason here..."
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg hover:shadow-purple-500/10"
                >
                    Submit Leave Request
                </button>
            </form>

            {/* Current Time Display */}
            <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
                <p className="text-sm text-gray-400">
                    Current Date and Time (UTC): {new Date().toLocaleString()}
                </p>
                <p className="text-sm text-purple-400">
                    Logged in as: {user.name}
                </p>
            </div>
        </div>
    );
};

export default Add;