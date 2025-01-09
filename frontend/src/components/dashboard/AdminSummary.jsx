import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  Users,
  Building2,
  Wallet,
  FileText,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(summary.data);
        setIsLoading(false);
      } catch(error) {
        if(error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a1f2b]">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-500/20"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-[#1a1f2b] to-[#2a3142] min-h-screen text-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h3>
          <div className="px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-purple-400">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <SummaryCard
            icon={<Users size={24} />}
            text="Total Employees"
            number={summary.totalEmployees}
            color="bg-gradient-to-r from-purple-600 to-purple-500"
            growth="+12% from last month"
          />
          <SummaryCard
            icon={<Building2 size={24} />}
            text="Total Departments"
            number={summary.totalDepartments}
            color="bg-gradient-to-r from-blue-600 to-blue-500"
            growth="No change"
          />
          <SummaryCard
            icon={<Wallet size={24} />}
            text="Monthly Salary"
            number={`₹${summary.totalSalary.toLocaleString()}`}
            color="bg-gradient-to-r from-indigo-600 to-indigo-500"
            growth="+5% from last month"
          />
        </div>

        <div className="bg-[#1e2530]/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
            Leave Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SummaryCard
              icon={<FileText size={24} />}
              text="Leave Applied"
              number={summary.leaveSummary.appliedFor}
              color="bg-gradient-to-r from-sky-600 to-sky-500"
              growth="2 new applications"
            />
            <SummaryCard
              icon={<CheckCircle size={24} />}
              text="Leave Approved"
              number={summary.leaveSummary.approved}
              color="bg-gradient-to-r from-green-600 to-green-500"
              growth="Approved today: 1"
            />
            <SummaryCard
              icon={<Clock size={24} />}
              text="Leave Pending"
              number={summary.leaveSummary.pending}
              color="bg-gradient-to-r from-amber-600 to-amber-500"
              growth="Requires attention"
            />
            <SummaryCard
              icon={<XCircle size={24} />}
              text="Leave Rejected"
              number={summary.leaveSummary.rejected}
              color="bg-gradient-to-r from-red-600 to-red-500"
              growth="No recent rejections"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;