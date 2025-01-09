import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setEmployee(responnse.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gray-900 py-6">
          <h2 className="text-3xl font-bold text-center text-purple-400">
            Employee Details
          </h2>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={`http://localhost:5000/${employee.userId.profileImage}`}
                  className="w-72 h-72 rounded-full border-4 border-purple-500 shadow-lg object-cover"
                  alt={employee.userId.name}
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-purple-500/20"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                <div className="flex flex-col space-y-4">
                  <InfoItem label="Name" value={employee.userId.name} />
                  <InfoItem label="Employee ID" value={employee.employeeId} />
                  <InfoItem 
                    label="Date of Birth" 
                    value={new Date(employee.dob).toLocaleDateString()} 
                  />
                  <InfoItem label="Gender" value={employee.gender} />
                  <InfoItem 
                    label="Department" 
                    value={employee.department.dep_name} 
                  />
                  <InfoItem 
                    label="Marital Status" 
                    value={employee.maritalStatus} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const InfoItem = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-lg font-bold text-purple-400">{label}</p>
    <p className="text-gray-300 font-medium pl-2">{value}</p>
  </div>
);

export default View;